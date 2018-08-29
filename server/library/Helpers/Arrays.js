export const arrayFilter = (arr, fn) => {
  const results = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if (fn(item, i)) results.unshift(item);
  }
  return results;
};

export const arrayMap = (arr, fn) => {
  const res = [];
  for (let i = arr.length; i >= 0; i--) {
    const item = arr[i];
    res.unshift(fn(item, i));
  }
  return res;
};
