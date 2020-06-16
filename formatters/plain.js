import _ from 'lodash';

const convertValue = (value) => {
  return (_.isObject(value)) ? '[complex value]' : value;
};

const pathToProperty = (path, key) => {
  if (path === '') {
    return key;
  }
  const tmp = path.split('.');
  tmp.push(key);
  return tmp.join('.');
};

const plain = (difference) => {
  // let acc = [];
  const iter = (item, path) => {
    const {
      key,
      type,
      children,
      value,
      oldValue,
      newValue,
    } = item;

    path = pathToProperty(path, key);
    // console.log('key is ', key);
    // console.log('path is ', path);
    if (type === 'nested') {
      return children.flatMap((item) => iter(item, path)).join('\n');
    }
    if (type === 'added') {
      return `Property \'${path}\' was added with value: ${convertValue(value)}`;
    }
    if (type === 'removed') {
      return `Property \'${path}\' was deleted`;
    }
    if (type === 'changed') {
      return `Property \'${path}\' was changed from ${convertValue(oldValue)} to ${convertValue(newValue)}`;
    }
    return [];
  };

  return difference.flatMap((item) => iter(item, '')).join('\n');
};

export default plain;
