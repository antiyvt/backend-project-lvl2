import buildAST from './buildAST.js';
import parse from './parsers.js';
import render from '../formatters/index.js';

const getDifference = (filepath1, filepath2, format = 'stylish') => {
  const before = parse(filepath1);
  const after = parse(filepath2);
  const difference = buildAST(before, after);
  return render(difference, format);
};

export default getDifference;
