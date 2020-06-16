const json = (difference) => {
  const iter = (item) => {
    const { type, children } = item;
    if (type === 'nested') {
      return children.flatMap(iter);
    }
    return JSON.stringify(item);
  };
  const result = difference.flatMap(iter);
  return `[${result.join(',')}]`;
};

export default json;
