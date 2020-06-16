
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const render = (difference, style) => {
  let formatter;
  if (style === 'stylish') {
    formatter = stylish(difference);
  }
  if (style === 'plain') {
    formatter = plain(difference);
  }
  if (style === 'json') {
    formatter = json(difference);
  }
  return formatter;
};

export default render;
