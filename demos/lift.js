Array.prototype.ap = function (xs) {
  return this.reduce((acc, f) => acc.concat(xs.map(f)), [])  
}

const liftA2 = (f) => (a, b) => a.map(f).ap(b)

const mult = (a) => (b) => a * b

const liftedMult = liftA2(mult)

const r1 = liftedMult([1, 2], [3, 5])
const r2 = liftA2(mult)([1, 2], [3, 5])
