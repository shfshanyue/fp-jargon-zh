Array.prototype.equals = function (arr) {
  const len = this.length
  if (len !== arr.length) {
    return false
  }
  for (let i = 0; i < len; i++) {
    if (this[i] !== arr[i]) {
      return false
    }
  }
  return true
}

const a = [1, 2].equals([1, 2]) // true
const b = [1, 2].equals([0]) // false

console.log(a, b)
