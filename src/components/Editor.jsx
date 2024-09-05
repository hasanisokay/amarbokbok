/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import uploadImage from '@/utils/uploadImage.mjs';
import toast from 'react-hot-toast';


// Register CustomImageBlot
const BlockEmbed = Quill.import('blots/block/embed');

class CustomImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt || 'Bonjui_Blog');
    node.setAttribute('src', value.url);
    node.setAttribute('width', value.width || 'auto');
    node.setAttribute('height', value.height || 'auto');
    node.setAttribute('style', 'max-width: 100%; display: block; margin: 0 auto;'); // Center the image
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
      alt: node.getAttribute('alt'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height'),
    };
  }
}

CustomImageBlot.blotName = 'customImage';
CustomImageBlot.tagName = 'img';

Quill.register(CustomImageBlot);

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange, setUploadPercentage }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      if (defaultValue !== undefined) {
        defaultValueRef.current = defaultValue;
      }
    }, [defaultValue]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
              ['link', 'image'],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              ['blockquote', 'code-block'],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              ['clean']
            ],
            handlers: {
              image: () => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  if (!file) return;

                  let maxWidth, maxHeight;

                  // Determine dimensions based on orientation
                  const image = new Image();
                  image.src = URL.createObjectURL(file);
                  image.onload = async () => {
                    const aspectRatio = image.width / image.height;
                    if (aspectRatio > 1) {
                      // Landscape orientation
                      maxWidth = 300;
                      maxHeight = 240;
                    } else {
                      // Portrait or square orientation
                      maxWidth = 240;
                      maxHeight = 300;
                    }

                    const loading = toast.loading('Uploading...');
                    const imageUrl = await uploadImage(file, setUploadPercentage);
                    toast.dismiss(loading);

                    if (!imageUrl) {
                      toast.error('Upload failed. Try again.');
                      return;
                    }

                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'customImage', { url: imageUrl });
                  };
                };
              }
            }
          }
        }
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref, defaultValue]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;
