import _ from 'lodash';

const convertValue = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const pathToProperty = (path, key) => {
  if (path === '') {
    return key;
  }
  return path.concat('.', key);
};

const plain = (ast) => {
  const render = {
    nested: (item, path) => item.children.flatMap((child) => render[child.type](child, pathToProperty(path, item.key))).join('\n'),
    added: (item, path) => `Property '${pathToProperty(path, item.key)}' was added with value: ${convertValue(item.value)}`,
    removed: (item, path) => `Property '${pathToProperty(path, item.key)}' was deleted`,
    changed: (item, path) => `Property '${pathToProperty(path, item.key)}' was changed from ${convertValue(item.oldValue)} to ${convertValue(item.newValue)}`,
    unchanged: () => [],
  };
  return ast.flatMap((node) => render[node.type](node, '')).join('\n');
};

export default plain;
