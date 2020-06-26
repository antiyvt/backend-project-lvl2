
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const render = (ast, style) => {
  const formatter = {
    stylish,
    plain,
    json,
  };

  return formatter[style](ast);
};

export default render;
