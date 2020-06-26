import _ from 'lodash';

const makeIndent = (depth) => {
  const tabulation = '  ';
  return tabulation.repeat((depth * 2) + 1);
};

const convertValue = (value, depth) => {
  const indentKey = makeIndent(depth);
  const indentValue = makeIndent(depth + 1);
  if (typeof value !== 'undefined') {
    if (_.isObject(value)) {
      const tmp = ['{'];
      const keys = Object.keys(value);
      keys.forEach((key) => {
        tmp.push(`${indentValue}  ${key}: ${value[key]}`);
      });
      tmp.push(`${indentKey}  }`);
      return tmp.join('\n');
    }
  }
  return `${value}`;
};

const alphabetizeDifference = (items) => {
  const arrangedList = {};
  items.forEach((current, index) => {
    const { key } = current;
    arrangedList[key] = index;
  });
  const keys = Object.keys(arrangedList);
  keys.sort();
  const sortedItems = [];
  keys.forEach((key) => {
    sortedItems.push(items[arrangedList[key]]);
  });
  return sortedItems;
};

const stylish = (ast) => {
  const iter = (acc, item, depth) => {
    item.forEach((astLeaf) => {
      const {
        key,
        type,
        children,
        value,
        oldValue,
        newValue,
      } = astLeaf;
      const indentKey = makeIndent(depth);
      const convertedValue = convertValue(value, indentKey);

      if (type === 'added') {
        acc.push(`${indentKey}+ ${key}: ${convertValue(value, depth)}`);
      }
      if (type === 'removed') {
        acc.push(`${indentKey}- ${key}: ${convertValue(value, depth)}`);
      }
      if (type === 'changed') {
        acc.push(`${indentKey}- ${key}: ${convertValue(oldValue, depth)}`);
        acc.push(`${indentKey}+ ${key}: ${convertValue(newValue, depth)}`);
      }
      if (type === 'unchanged') {
        acc.push(`${indentKey}  ${key}: ${convertedValue}`);
      }
      if (type === 'nested') {
        acc.push(`${indentKey}  ${key}: {`);
        iter(acc, alphabetizeDifference(children), depth + 1);
        acc.push(`${indentKey}  }`);
      }
    });
    return acc;
  };

  const result = iter([], alphabetizeDifference(ast), 0);
  result.unshift('{');
  result.push('}');
  return result.join('\n');
};

export default stylish;
