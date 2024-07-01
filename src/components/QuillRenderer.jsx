// QuillRenderer.js
'use client'
import React from 'react';
// import Image from 'next/image';
import Quill from 'quill';
import CustomImageBlot from './CustomImageBlot';
import Image from 'next/image';


const QuillRenderer = ({ content }) => {
  if (!content) return null;

  const renderCustomImage = (value) => {
    const { url, alt, width, height } = value;
    return (
      <div style={{ textAlign: 'center', margin: '10px 10px', }}>
        <Image
          src={url}
          alt={alt || 'Blog_Image'}
          width={100} // Default width if 'auto'
          height={100} // Default height if 'auto'
          layout="responsive"
          style={{ maxWidth: '100%', height: 'auto', }}
        />
      </div>
    );
  };

  const delta = content;
  const container = document.createElement('div');
  const quill = new Quill(container, {
    readOnly: true, 
    theme: null,
  });
  quill.setContents(delta);

  return (
    <div>
      {Array.from(container.children).map((child, index) => {
        const blot = Quill.find(child);
        if (blot instanceof CustomImageBlot) {
          return <div key={index}>{renderCustomImage(CustomImageBlot.value(child))}</div>;
        }
        return <div key={index} dangerouslySetInnerHTML={{ __html: child.outerHTML }} />;
      })}
    </div>
  );
};

export default QuillRenderer;
