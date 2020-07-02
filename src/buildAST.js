import _ from 'lodash';

const bothValuesAreObjects = (value1, value2) => _.isObject(value1) && _.isObject(value2);
const bothValuesAreEqual = (value1, value2) => value1 === value2;
const hasNoKey = (config, key) => !_.has(config, key);

const buildAST = (config1, config2) => {
  const buildNode = (setting1, setting2, key) => {
    if (hasNoKey(setting1, key)) {
      return { key, type: 'added', value: setting2[key] };
    }
    if (hasNoKey(setting2, key)) {
      return { key, type: 'removed', value: setting1[key] };
    }
    if (bothValuesAreObjects(setting1[key], setting2[key])) {
      return { key, type: 'nested', children: buildAST(setting1[key], setting2[key]) };
    }
    if (bothValuesAreEqual(setting1[key], setting2[key])) {
      return { key, type: 'unchanged', value: setting1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: setting1[key],
      newValue: setting2[key],
    };
  };
  const keys = Object.keys({ ...config1, ...config2 });
  return keys.flatMap((key) => buildNode(config1, config2, key));
};

export default buildAST;
