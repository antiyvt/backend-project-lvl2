import _ from 'lodash';
import fs from 'fs';
import process from 'process';
import path from 'path';

const getJSON = (fileName) => {
  const pathToFile = path.resolve(process.cwd(), fileName);
  const rawdata = fs.readFileSync(pathToFile);
  return JSON.parse(rawdata);
};

export default (filepath1, filepath2) => {
  const before = getJSON(filepath1);
  const after = getJSON(filepath2);
  const keys = Object.keys({ ...before, ...after });
  const cb = (acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (before[key] === after[key]) {
        acc.push(`  ${key}: ${before[key]}`);
        return acc;
      }
      acc.push(`- ${key}: ${before[key]}`);
      acc.push(`+ ${key}: ${after[key]}`);
      return acc;
    }
    if (!_.has(before, key)) {
      acc.push(`+ ${key}: ${after[key]}`);
      return acc;
    }
    if (!_.has(after, key)) {
      acc.push(`- ${key}: ${before[key]}`);
      return acc;
    }
    return acc;
  };

  const result = keys.reduce(cb, []);
  result.unshift('{');
  result.push('}');
  return result.join('\n');
};
