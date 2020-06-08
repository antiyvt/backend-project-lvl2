import fs from 'fs';
import process from 'process';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const format = path.extname(fullPath);
  const rawdata = fs.readFileSync(fullPath);
  let parser;

  if (format === '.json') {
    parser = JSON.parse;
  } if (format === '.yml') {
    parser = yaml.safeLoad;
  }

  return parser(rawdata);
};

export default parse;
