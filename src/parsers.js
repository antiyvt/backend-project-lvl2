import fs from 'fs';
import process from 'process';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const parse = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const format = path.extname(fullPath);
  const rawdata = fs.readFileSync(fullPath, 'utf-8');
  let parser;

  if (format === '.json') {
    parser = JSON.parse;
  } if (format === '.yml') {
    parser = yaml.safeLoad;
  } if (format === '.ini') {
    parser = ini.parse;
  }

  return parser(rawdata);
};

export default parse;
