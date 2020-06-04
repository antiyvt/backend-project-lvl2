#!/usr/bin/env node
import program from 'commander';
import getDifference from '../src/index.js';
import getJSON from '../src/utils.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const firstJSON = getJSON(filepath1);
    const secondJSON = getJSON(filepath2);
    const result = getDifference(firstJSON, secondJSON);
    console.log(result);
    return result;
  });

program.parse(process.argv);
