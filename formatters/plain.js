import _ from 'lodash';

const convertValue = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const pathToProperty = (path, key) => {
  if (path === '') {
    return key;
  }
  const tmp = path.split('.');
  tmp.push(key);
  return tmp.join('.');
};

const plain = (difference) => {
  const iter = (item, path) => {
    const {
      key,
      type,
      children,
      value,
      oldValue,
      newValue,
    } = item;

    const pathToKey = pathToProperty(path, key);
    if (type === 'nested') {
      return children.flatMap((child) => iter(child, pathToKey)).join('\n');
    }
    if (type === 'added') {
      return `Property '${pathToKey}' was added with value: ${convertValue(value)}`;
    }
    if (type === 'removed') {
      return `Property '${pathToKey}' was deleted`;
    }
    if (type === 'changed') {
      return `Property '${pathToKey}' was changed from ${convertValue(oldValue)} to ${convertValue(newValue)}`;
    }
    return [];
  };

  return difference.flatMap((item) => iter(item, '')).join('\n');
};

export default plain;
