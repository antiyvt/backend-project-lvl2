import _ from 'lodash';
// import parse from './parsers.js';

const bothAreObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);

const buildLeaf = (before, after, key, fn) => {
  if (!_.has(before, key)) {
    return { key, type: 'added', value: after[key] };
  }
  if (!_.has(after, key)) {
    return { key, type: 'removed', value: before[key] };
  }
  if (bothAreObjects(before[key], after[key])) {
    return { key, type: 'nested', children: fn(before[key], after[key]) };
  }
  if (before[key] === after[key]) {
    return { key, type: 'unchanged', value: before[key] };
  }
  return {
    key,
    type: 'changed',
    oldValue: before[key],
    newValue: after[key],
  };
};

const buildAST = (before, after) => {
  const keys = Object.keys({ ...before, ...after });
  return keys.flatMap((key) => buildLeaf(before, after, key, buildAST));
};

export default buildAST;
