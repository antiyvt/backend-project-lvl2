import _ from 'lodash';

const makeIndent = (depth) => {
  const tabulation = '    ';
  return tabulation.repeat(depth);
};

const makeLine = (key, marker, value, depth) => `${makeIndent(depth)}${marker}${key}: ${value}`;

const convertObjectToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(obj[key]) && !_.isArray(obj[key])) {
      return makeLine(key, '    ', convertObjectToString(obj[key], depth + 1), depth);
    }
    return makeLine(key, '    ', obj[key], depth);
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n${makeIndent(depth)}}`;
};

const convertValue = (value, depth) => {
  if (_.isObject(value)) {
    return convertObjectToString(value, depth);
  }
  return value;
};

const stylish = (ast, depth = 0) => {
  const render = {
    nested: (node) => makeLine(node.key, '    ', stylish(node.children, depth + 1), depth),
    added: (node) => makeLine(node.key, '  + ', convertValue(node.value, depth + 1), depth),
    removed: (node) => makeLine(node.key, '  - ', convertValue(node.value, depth + 1), depth),
    unchanged: (node) => makeLine(node.key, '    ', convertValue(node.value, depth + 1), depth),
    changed: (node) => {
      const renderedRemovedValue = makeLine(node.key, '  - ', convertValue(node.oldValue, depth + 1), depth);
      const renderedAddedValue = makeLine(node.key, '  + ', convertValue(node.newValue, depth + 1), depth);
      return [renderedRemovedValue, renderedAddedValue];
    },
  };

  const stringifiedNode = ast.flatMap((node) => render[node.type](node, depth));
  const result = stringifiedNode.join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

export default stylish;
