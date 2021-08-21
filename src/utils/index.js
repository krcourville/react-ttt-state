export function flatten(arr) {
  return arr.reduce((acc, cur) => [...acc, ...cur], []);
}

export function clone(x) {
  return JSON.parse(JSON.stringify(x));
}
