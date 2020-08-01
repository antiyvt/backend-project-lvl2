import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDifference from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const result = (format) => readFile(`result.${format}`);
const config1 = (extension) => getFixturePath(`before.${extension}`);
const config2 = (extension) => getFixturePath(`after.${extension}`);


test('Test YAML difference', async () => {
  const difference = getDifference(config1('yml'), config2('yml'));
  expect(difference).toBe(result('txt'));
});

test('Test INI difference', async () => {
  const difference = getDifference(config1('ini'), config2('ini'));
  expect(difference).toBe(result('txt'));
});

test('Recursive comparison', async () => {
  const difference = getDifference(config1('json'), config2('json'), 'stylish');
  expect(difference).toBe(result('stylish'));
});

test('Plain comparison', async () => {
  const difference = getDifference(config1('json'), config2('json'), 'plain');
  expect(difference).toBe(result('plain'));
});

test('JSON comparison', async () => {
  const difference = getDifference(config1('json'), config2('json'), 'json');
  expect(difference).toBe(result('json'));
});
