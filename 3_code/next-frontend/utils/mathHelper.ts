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

export const range2 = (start: number, end?: number, step?: number) => {
  if (step === undefined) step = 1;
  if (end === undefined) { end = start; start = 0; }
  let result = [];
  for (let index = start; index < end; index+=step) {
    result.push(index);
  }
  return result;
}

export function iRange(start: number, end?: number, step?: number) {
  if (step === undefined) step = 1;
  if (end === undefined) { start = 0; end = start; }

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end!) {
        start = start + step!;
        return { value: start, done: false }
      }
      return { done: true, value: end }
    }
  }
}

export function calcPercent(num: number, percentage: number, decimal: number = 0){
  const result = num * (percentage / 100);
  return parseFloat(result.toFixed(decimal));
}

export function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// Remove undefined on object example
// Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])