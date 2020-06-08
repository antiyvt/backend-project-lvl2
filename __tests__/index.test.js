import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDifference from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let result;
let jsonBeforChange;
let jsonAfterChange;
let yamlBeforChange;
let yamlAfterChange;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  result = readFile('result.txt');
  jsonBeforChange = getFixturePath('before.json');
  jsonAfterChange = getFixturePath('after.json');
  yamlBeforChange = getFixturePath('before.yml');
  yamlAfterChange = getFixturePath('after.yml');
  
});

test('Test JSON difference', async () => {
  const differense = getDifference(jsonBeforChange, jsonAfterChange);
  expect(differense).toBe(result);
});

test('Test YAML difference', async () => {
  const differense = getDifference(yamlBeforChange, yamlAfterChange);
  expect(differense).toBe(result);
});
