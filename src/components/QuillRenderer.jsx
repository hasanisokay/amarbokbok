'use client'
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import CustomImageBlot from './CustomImageBlot';
import Image from 'next/image';

const QuillRenderer = ({ content }) => {
  const containerRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (!content || !containerRef.current) return;
    const quillInstance = new Quill(containerRef.current, {
      readOnly: true,
      theme: null,
    });
    setQuill(quillInstance);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!quill || !content) return;

    quill.setContents(content);

    Array.from(containerRef.current.children).forEach((child) => {
      const blot = Quill.find(child);
      if (blot instanceof CustomImageBlot) {
        const imageElement = renderCustomImage(CustomImageBlot.value(child));
        child.replaceWith(imageElement);
      }
    });
  }, [quill, content]);

  const renderCustomImage = (value) => {
    const { url, alt, width, height } = value;
    return (
      <div style={{ textAlign: 'center', margin: '10px 10px', }}>
        <Image
          src={url}
          alt={alt || 'Blog_Image'}
          width={width || 100}
          height={height || 100}
          layout="responsive"
          style={{ maxWidth: '100%', height: 'auto', }}
        />
      </div>
    );
  };

  return <div ref={containerRef}></div>;
};

export default QuillRenderer;
