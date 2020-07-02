import _ from 'lodash';

const makeIndent = (depth) => {
  const tabulation = '  ';
  return tabulation.repeat(1 + depth * 2);
};

const convertObjectToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(obj[key]) && !_.isArray(obj[key])) {
      return `${makeIndent(depth)}  ${key}: ${convertObjectToString(obj[key], depth + 1)}`;
    }
    return `${makeIndent(depth)}  ${key}: ${obj[key]}`;
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n  ${makeIndent(depth - 1)}}`;
};

const convertValue = (value, depth) => {
  if (_.isObject(value)) {
    return convertObjectToString(value, depth);
  }
  return value;
};

const makeLine = (key, marker, value, depth) => `${makeIndent(depth)}${marker}${key}: ${value}`;

const stylish = (ast, depth = 0) => {
  const render = {
    nested: (node) => makeLine(node.key, '  ', stylish(node.children, depth + 1), depth),
    added: (node) => makeLine(node.key, '+ ', convertValue(node.value, depth + 1), depth),
    removed: (node) => makeLine(node.key, '- ', convertValue(node.value, depth + 1), depth),
    unchanged: (node) => makeLine(node.key, '  ', convertValue(node.value, depth + 1), depth),
    changed: (node) => {
      const renderedRemovedValue = makeLine(node.key, '- ', convertValue(node.oldValue, depth + 1), depth);
      const renderedAddedValue = makeLine(node.key, '+ ', convertValue(node.newValue, depth + 1), depth);
      return `${renderedRemovedValue}\n${renderedAddedValue}`;
    },
  };

  const stringifiedNode = ast.flatMap((node) => render[node.type](node, depth));
  const result = stringifiedNode.join('\n');
  const makeFinalBracket = (level) => ((level === 0) ? '}' : `${makeIndent(level - 1)}  }`);
  return `{\n${result}\n${makeFinalBracket(depth)}`;
};

export default stylish;
