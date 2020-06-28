import _ from 'lodash';

const addIndent = (depth) => {
  const tabulation = '  ';
  const indentStep = 1;
  return tabulation.repeat(depth * indentStep);
};

const convertObjectToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(obj[key]) && !_.isArray(obj[key])) {
      return `${addIndent(depth + 2)}${key}: ${convertObjectToString(obj[key], depth + 2)}`;
    }
    return `${addIndent(depth + 2)}${key}: ${obj[key]}`;
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n${addIndent(depth)}}`;
};

const convertValue = (value, depth) => {
  if (_.isObject(value)) {
    return convertObjectToString(value, depth);
  }
  return value;
};

const stylish = (ast, depth = 0) => {
  const render = {
    nested: (item, level) => `${addIndent(level + 2)}${item.key}: ${stylish(item.children, level + 2)}`,
    added: (item, level) => `${addIndent(level + 1)}+ ${item.key}: ${convertValue(item.value, level + 1)}`,
    removed: (item, level) => `${addIndent(level + 1)}- ${item.key}: ${convertValue(item.value, level + 1)}`,
    changed: (item, level) => `${addIndent(level + 1)}- ${item.key}: ${convertValue(item.oldValue, level + 1)}\n${addIndent(level + 1)}+ ${item.key}: ${convertValue(item.newValue, level + 1)}`,
    unchanged: (item, level) => `${addIndent(level + 1)}  ${item.key}: ${convertValue(item.value, level + 1)}`,
  };

  const stringifiedItem = ast.flatMap((node) => render[node.type](node, depth));
  const result = stringifiedItem.join('\n');
  return `{\n${result}\n${addIndent(depth)}}`;
};

export default stylish;
