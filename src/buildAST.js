import _ from 'lodash';

const bothAreObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);

const buildLeaf = (config1, config2, key, fn) => {
  if (!_.has(config1, key)) {
    return { key, type: 'added', value: config2[key] };
  }
  if (!_.has(config2, key)) {
    return { key, type: 'removed', value: config1[key] };
  }
  if (bothAreObjects(config1[key], config2[key])) {
    return { key, type: 'nested', children: fn(config1[key], config2[key]) };
  }
  if (config1[key] === config2[key]) {
    return { key, type: 'unchanged', value: config1[key] };
  }
  return {
    key,
    type: 'changed',
    oldValue: config1[key],
    newValue: config2[key],
  };
};

const buildAST = (config1, config2) => {
  const keys = Object.keys({ ...config1, ...config2 });
  return keys.flatMap((key) => buildLeaf(config1, config2, key, buildAST));
};

export default buildAST;
