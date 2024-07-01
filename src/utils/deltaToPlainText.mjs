const deltaToPlainText = (delta) => {
    return delta.ops.map(op => {
        if (typeof op.insert === 'string') {
            return op.insert;
        }
        return '';
    }).join('');
};

export default deltaToPlainText;