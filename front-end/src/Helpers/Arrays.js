import hsl from 'hsl-to-hex';

export const arrayFilter = (arr, fn) => {
  const results = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i]
    if (fn(item, i)) results.unshift(item);
 }
 return results;
}

export const arrayMap = (arr, fn) => {
  const res = [];
  for(let i = arr.length; i >= 0; i--) {
    const item = arr[i];
    res.unshift(fn(item, i));
  }
  return res;
}

export const generateColors = (index, length) => {
  const hueDelta = 360 / length;
  const hue = index * hueDelta;
  const color1 = hsl(hue, 86, 60);
  const color2 = hsl(hue, 86, 70);
  return { color1, color2 };
}