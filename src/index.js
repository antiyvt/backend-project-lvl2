import path from 'path';
import process from 'process';
import buildAST from './buildAST.js';
import parse from './parsers.js';
import render from './formatters/index.js';


const buildFullPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const getDifference = (config1, config2, format = 'stylish') => {
  const fullPathToConfig1 = buildFullPath(config1);
  const fullPathToConfig2 = buildFullPath(config2);
  const parsedConfig1 = parse(fullPathToConfig1);
  const parsedConfig2 = parse(fullPathToConfig2);
  const ast = buildAST(parsedConfig1, parsedConfig2);
  return render(ast, format);
};

export default getDifference;
