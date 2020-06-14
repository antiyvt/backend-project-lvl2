#!/usr/bin/env node
import program from 'commander';
import getDifference from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = getDifference(filepath1, filepath2, program.format);
    console.log(result);
    return result;
  });

program.parse(process.argv);
