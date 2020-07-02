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
    nested: (node, path) => node.children.flatMap((child) => render[child.type](child, pathToProperty(path, node.key))).join('\n'),
    added: (node, path) => `Property '${pathToProperty(path, node.key)}' was added with value: ${convertValue(node.value)}`,
    removed: (node, path) => `Property '${pathToProperty(path, node.key)}' was deleted`,
    changed: (node, path) => `Property '${pathToProperty(path, node.key)}' was changed from ${convertValue(node.oldValue)} to ${convertValue(node.newValue)}`,
    unchanged: () => [],
  };
  return ast.flatMap((node) => render[node.type](node, '')).join('\n');
};

export default plain;
