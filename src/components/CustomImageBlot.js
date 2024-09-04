import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt || '');
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

if (!Quill.imports['formats/customImage']) {
  Quill.register(CustomImageBlot);
}

export default CustomImageBlot;