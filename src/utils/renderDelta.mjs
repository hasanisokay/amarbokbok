import Image from 'next/image';
import React from 'react';

const renderDelta = (ops) => {
    if (!ops || !Array.isArray(ops)) {
        console.error('Invalid ops:', ops);
        return null;
    }

    return ops.map((op, index) => {
        if (op.insert.image) {
            return (
                <Image
                    key={index}
                    src={op.insert.image}
                    alt={`Image ${index}`}
                    width={600}
                    height={400}
                    layout="responsive"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            );
        } else if (op.insert && typeof op.insert === 'string') {
            return <span key={index}>{op.insert}</span>;
        } else if (op.attributes) {
            if (op.attributes.bold) {
                return <strong key={index}>{op.insert}</strong>;
            } else if (op.attributes.italic) {
                return <em key={index}>{op.insert}</em>;
            } else if (op.attributes.underline) {
                return <u key={index}>{op.insert}</u>;
            } else if (op.attributes.header) {
                const HeaderTag = `h${op.attributes.header}`;
                return <HeaderTag key={index}>{op.insert}</HeaderTag>;
            }
        }
        return null;
    });
};

export default renderDelta;
