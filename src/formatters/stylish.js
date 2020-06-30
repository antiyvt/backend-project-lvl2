import _ from 'lodash';

const makeIndent = (depth) => {
  const tabulation = '  ';
  return tabulation.repeat(depth);
};

const convertObjectToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(obj[key]) && !_.isArray(obj[key])) {
      return `${makeIndent(depth + 2)}${key}: ${convertObjectToString(obj[key], depth + 2)}`;
    }
    return `${makeIndent(depth + 2)}${key}: ${obj[key]}`;
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n${makeIndent(depth + 1)}}`;
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
    nested: (item) => makeLine(item.key, '', stylish(item.children, depth + 2), depth + 2),
    added: (item) => makeLine(item.key, '+ ', convertValue(item.value, depth + 1), depth + 1),
    removed: (item) => makeLine(item.key, '- ', convertValue(item.value, depth + 1), depth + 1),
    unchanged: (item) => makeLine(item.key, '  ', convertValue(item.value, depth + 1), depth + 1),
    changed: (item) => {
      const renderedRemovedValue = makeLine(item.key, '- ', convertValue(item.oldValue, depth + 1), depth + 1);
      const renderedAddedValue = makeLine(item.key, '+ ', convertValue(item.newValue, depth + 1), depth + 1);
      return `${renderedRemovedValue}\n${renderedAddedValue}`;
    },
  };

  const stringifiedItem = ast.flatMap((node) => render[node.type](node, depth));
  const result = stringifiedItem.join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

export default stylish;
