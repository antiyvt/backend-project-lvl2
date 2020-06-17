import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDifference from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let result;
let recResult;
let jsonBeforChange;
let jsonAfterChange;
let yamlBeforChange;
let yamlAfterChange;
let iniBeforChange;
let iniAfterChange;
let recJSONbefore;
let recJSONafter;
let plainResult;
let jsonResult;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  result = readFile('result.txt');
  recResult = readFile('recResult.txt');
  plainResult = readFile('plainResult.txt');
  jsonResult = readFile('jsonResult.txt');
  jsonBeforChange = getFixturePath('before.json');
  jsonAfterChange = getFixturePath('after.json');
  yamlBeforChange = getFixturePath('before.yml');
  yamlAfterChange = getFixturePath('after.yml');
  iniBeforChange = getFixturePath('before.ini');
  iniAfterChange = getFixturePath('after.ini');
  recJSONbefore = getFixturePath('recBefore.json');
  recJSONafter = getFixturePath('recAfter.json');
});

test('Test JSON difference', async () => {
  const differense = getDifference(jsonBeforChange, jsonAfterChange);
  expect(differense).toBe(result);
});

test('Test YAML difference', async () => {
  const differense = getDifference(yamlBeforChange, yamlAfterChange);
  expect(differense).toBe(result);
});

test('Test INI difference', async () => {
  const differense = getDifference(iniBeforChange, iniAfterChange);
  expect(differense).toBe(result);
});

test('Recursive comparison', async () => {
  const differense = getDifference(recJSONbefore, recJSONafter, 'stylish');
  expect(differense).toBe(recResult);
});

test('Plain comparison', async () => {
  const differense = getDifference(recJSONbefore, recJSONafter, 'plain');
  expect(differense).toBe(plainResult);
});

test('JSON comparison', async () => {
  const differense = getDifference(recJSONbefore, recJSONafter, 'json');
  expect(differense).toBe(jsonResult);
});
