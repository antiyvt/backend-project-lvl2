import ini from 'ini';
import yaml from 'js-yaml';

const parse = (rawData, format) => {
  const parser = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return parser[format](rawData);
};

export default parse;
