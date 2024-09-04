'use client'
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.core.css'; 

const QuillRenderer = ({ content }) => {
  const containerRef = useRef(null);
  const [quill, setQuill] = useState(null);
console.log(content)
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
