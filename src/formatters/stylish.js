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
    nested: (item, level) => makeLine(item.key, '', stylish(item.children, level + 2), level + 2),
    added: (item, level) => makeLine(item.key, '+ ', convertValue(item.value, level + 1), level + 1),
    removed: (item, level) => makeLine(item.key, '- ', convertValue(item.value, level + 1), level + 1),
    unchanged: (item, level) => makeLine(item.key, '  ', convertValue(item.value, level + 1), level + 1),
    changed: (item, level) => {
      const renderedRemovedValue = makeLine(item.key, '- ', convertValue(item.oldValue, level + 1), level + 1);
      const renderedAddedValue = makeLine(item.key, '+ ', convertValue(item.newValue, level + 1), level + 1);
      return `${renderedRemovedValue}\n${renderedAddedValue}`;
    },
  };

  const stringifiedItem = ast.flatMap((node) => render[node.type](node, depth));
  const result = stringifiedItem.join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

export default stylish;
