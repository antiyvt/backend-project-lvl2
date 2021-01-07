import _ from 'lodash';

const convertValue = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const pathToProperty = (path, key) => {
  if (path === '') {
    return key;
  }
  return path.concat('.', key);
};

const pathToPropertyMessage = (path, nodeKey) => `Property '${pathToProperty(path, nodeKey)}' was`;

const plain = (ast, path = '') => {
  const render = {
    nested: (node) => plain(node.children, pathToProperty(path, node.key)),
    added: (node) => `${pathToPropertyMessage(path, node.key)} added with value: ${convertValue(node.value)}`,
    removed: (node) => `${pathToPropertyMessage(path, node.key)} deleted`,
    changed: (node) => `${pathToPropertyMessage(path, node.key)} changed from ${convertValue(node.oldValue)} to ${convertValue(node.newValue)}`,
    unchanged: () => [],
  };
  return ast.flatMap((node) => render[node.type](node, path)).join('\n');
};

export default plain;
