import _ from 'lodash';

const areBothItemsObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);
const areBothItemsEqual = (item1, item2) => item1 === item2;
const hasNoKey = (config, key) => !_.has(config, key);

const buildAST = (config1, config2) => {
  const buildNode = (item1, item2, key) => {
    if (hasNoKey(item1, key)) {
      return { key, type: 'added', value: item2[key] };
    }
    if (hasNoKey(item2, key)) {
      return { key, type: 'removed', value: item1[key] };
    }
    if (areBothItemsObjects(item1[key], item2[key])) {
      return { key, type: 'nested', children: buildAST(item1[key], item2[key]) };
    }
    if (areBothItemsEqual(item1[key], item2[key])) {
      return { key, type: 'unchanged', value: item1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: item1[key],
      newValue: item2[key],
    };
  };
  const keys = Object.keys({ ...config1, ...config2 });
  return keys.flatMap((key) => buildNode(config1, config2, key));
};

export default buildAST;
