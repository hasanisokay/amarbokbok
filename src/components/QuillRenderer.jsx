'use client'
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import CustomImageBlot from './CustomImageBlot';
import 'quill/dist/quill.core.css';
// import Image from 'next/image';

if (!Quill.imports['formats/customImage']) {
  Quill.register(CustomImageBlot);
}

const QuillRenderer = ({ content }) => {
  const containerRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (!content || !containerRef.current) return;

    // Initialize Quill
    const quillInstance = new Quill(containerRef.current, {
      readOnly: true,
      theme: null,
    });
    setQuill(quillInstance);
  }, [content]);

  useEffect(() => {
    if (!quill || !content) return;

    // Set Quill content
    quill.setContents(content);

    // Attach onClick to all images
    const images = containerRef.current.querySelectorAll('img');
    images.forEach((img) => {
      img.onclick = () => {
        window.open(img.src, '_blank');
      };
    });
  }, [quill, content]);

  return <div ref={containerRef}></div>;
};

export default QuillRenderer;
