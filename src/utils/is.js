const toString = Object.prototype.toString

export const is = (val, type) => {
  return toString.call(val) === `[object ${type}]`
}

export const isString = (val) => {
  return is(val, 'String')
}
