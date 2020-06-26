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

const plain = (ast) => {
  const iter = (astLeaf, path) => {
    const {
      key,
      type,
      children,
      value,
      oldValue,
      newValue,
    } = astLeaf;

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

  return ast.flatMap((astLeaf) => iter(astLeaf, '')).join('\n');
};

export default plain;
