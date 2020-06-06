import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDifference from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDifference', async () => {
  const jsonBeforChange = getFixturePath('before.json');
  const jsonAfterChange = getFixturePath('after.json');
  const result = readFile('result.txt');
  const differense = getDifference(jsonBeforChange, jsonAfterChange);
  expect(differense).toBe(result);
});
