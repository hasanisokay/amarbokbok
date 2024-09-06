const truncateText = (text, wordLimit, addDots =true) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + (addDots ? '...':'');
    }
    return text;
};
export default truncateText;