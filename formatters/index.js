
import stylish from './stylish.js';
import plain from './plain.js';

const render = (difference, style) => {
  if (style === 'stylish') {
    return stylish(difference);
  }
  if (style === 'plain') {
    return plain(difference);
  }
  return true;
};

export default render;
