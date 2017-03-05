Array.prototype.ap = function (xs) {
  return this.reduce((acc, f) => acc.concat(xs.map(f)), [])  
}

const r1 = [(a) => a + 1].ap([1])

console.log(r1)

const arg1 = [1, 3, 5]
const arg2 = [4, 5]

const add = (x) => (y) => x + y

const r2 = [add].ap(arg1)
const r3 = r2.ap(arg2)

const r4 = [add].ap(arg1).ap(arg2)
const r5 = arg1.map(add).ap(arg2)

console.log(r3, r4, r5)

