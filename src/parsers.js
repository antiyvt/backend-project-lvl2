import path from 'path';
import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const parse = (filePath) => {
  const format = path.extname(filePath);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const parser = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return parser[format](rawData);
};

export default parse;
