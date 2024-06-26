const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    let text = '';
    content.ops.forEach(op => {
      if (typeof op.insert === 'string') {
        text += op.insert;
      }
    });
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);  
    return readingTimeInMinutes;
  };
export default calculateReadingTime;