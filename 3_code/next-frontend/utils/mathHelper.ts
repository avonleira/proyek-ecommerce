interface IRangeAttr {
  min?: number
  max: number
}

export const range = (attr: IRangeAttr) => {
  let { min = 0, max } = attr;
  let result = [];
  for (let index = min; index < max; index++) {
    result.push(index);
  }
  return result;
}