import _ from 'lodash';

const convertValue = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const pathToProperty = (path, key) => {
  if (path === '') {
    return key;
  }
  return path.concat('.', key);
};

const plain = (ast, path = '') => {
  const render = {
    nested: (node) => plain(node.children, pathToProperty(path, node.key)),
    added: (node) => `Property '${pathToProperty(path, node.key)}' was added with value: ${convertValue(node.value)}`,
    removed: (node) => `Property '${pathToProperty(path, node.key)}' was deleted`,
    changed: (node) => `Property '${pathToProperty(path, node.key)}' was changed from ${convertValue(node.oldValue)} to ${convertValue(node.newValue)}`,
    unchanged: () => [],
  };
  return ast.flatMap((node) => render[node.type](node, path)).join('\n');
};

export default plain;
