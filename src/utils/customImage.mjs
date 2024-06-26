import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomImage extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.setAttribute('src', value);
        node.setAttribute('alt', 'Image');
        return node;
    }

    static value(node) {
        return node.getAttribute('src');
    }
}

CustomImage.blotName = 'customImage';
CustomImage.tagName = 'img';

Quill.register(CustomImage);

export default CustomImage;
