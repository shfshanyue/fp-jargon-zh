Array.prototype.ap = function (xs) {
  return this.reduce((acc, f) => acc.concat(xs.map(f)), [])  
}

const r1 = [(a) => a + 1].ap([1])

console.log(r1)

const arg1 = [1, 3, 5]
const arg2 = [4, 5]

const add = x => y => x + y
const mult = x => x * 3

const r2 = [add].ap(arg1)
const r3 = r2.ap(arg2)

const r4 = [add].ap(arg1).ap(arg2)
const r5 = arg1.map(add).ap(arg2)
const r6 = arg2.map(add).ap(arg1)

console.log(r3, r4, r5, r6)

// derived from chain
Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}

const adds = [x => x + 1, x => x * 2]
const r7 = adds.ap(arg2)
const r8 = adds.chain(f => arg2.chain(f))

console.log(r7, r8)
