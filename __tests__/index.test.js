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
const result = readFile('result.txt');
const recResult = readFile('recResult.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('jsonResult.txt');
const jsonBeforeChange = getFixturePath('before.json');
const jsonAfterChange = getFixturePath('after.json');
const yamlBeforeChange = getFixturePath('before.yml');
const yamlAfterChange = getFixturePath('after.yml');
const iniBeforeChange = getFixturePath('before.ini');
const iniAfterChange = getFixturePath('after.ini');
const recJSONbefore = getFixturePath('recBefore.json');
const recJSONafter = getFixturePath('recAfter.json');

test('Test JSON difference', async () => {
  const difference = getDifference(jsonBeforeChange, jsonAfterChange);
  expect(difference).toBe(result);
});

test('Test YAML difference', async () => {
  const difference = getDifference(yamlBeforeChange, yamlAfterChange);
  expect(difference).toBe(result);
});

test('Test INI difference', async () => {
  const difference = getDifference(iniBeforeChange, iniAfterChange);
  expect(difference).toBe(result);
});

test('Recursive comparison', async () => {
  const difference = getDifference(recJSONbefore, recJSONafter, 'stylish');
  expect(difference).toBe(recResult);
});

test('Plain comparison', async () => {
  const difference = getDifference(recJSONbefore, recJSONafter, 'plain');
  expect(difference).toBe(plainResult);
});

test('JSON comparison', async () => {
  const difference = getDifference(recJSONbefore, recJSONafter, 'json');
  expect(difference).toBe(jsonResult);
});
