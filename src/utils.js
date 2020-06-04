import fs from 'fs';
import process from 'process';
import path from 'path';

const getJSON = (fileName) => {
  const pathToFile = path.resolve(process.cwd(), fileName);
  const rawdata = fs.readFileSync(pathToFile);
  return JSON.parse(rawdata);
};

export default getJSON;
