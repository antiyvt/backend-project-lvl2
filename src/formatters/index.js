
import stylish from './stylish.js';
import plain from './plain.js';

const render = (ast, style) => {
  const formatter = {
    stylish,
    plain,
    json: JSON.stringify,
  };

  return formatter[style](ast);
};

export default render;
