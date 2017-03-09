const x = [1, 2, 3]
const y = [4, 5, 6]
const z = [7, 8, 9]

const r1 = x.concat(y).concat(z)
const r2 = x.concat(y.concat(z))

console.log(r1, r2)
