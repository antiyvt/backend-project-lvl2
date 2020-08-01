
import path from 'path';
import fs from 'fs';
import process from 'process';
import buildAST from './buildAST.js';
import parse from './parsers.js';
import render from './formatters/index.js';


const buildFullPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const getDifference = (config1, config2, format = 'stylish') => {
  const fullPathToConfig1 = buildFullPath(config1);
  const fullPathToConfig2 = buildFullPath(config2);
  const rawDataFromConfig1 = fs.readFileSync(fullPathToConfig1, 'utf-8');
  const formatOfConfig1 = path.extname(fullPathToConfig1);
  const rawDataFromConfig2 = fs.readFileSync(fullPathToConfig2, 'utf-8');
  const formatOfConfig2 = path.extname(fullPathToConfig2);
  const parsedConfig1 = parse(rawDataFromConfig1, formatOfConfig1);
  const parsedConfig2 = parse(rawDataFromConfig2, formatOfConfig2);
  const ast = buildAST(parsedConfig1, parsedConfig2);
  return render(ast, format);
};

export default getDifference;
