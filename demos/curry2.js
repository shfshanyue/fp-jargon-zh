const _ = require('lodash')

const add = (x, y) => x + y

const curriedAdd = _.curry(add)

console.log(curriedAdd(1, 2))   // 3
console.log(curriedAdd(1)(2))   // 3
// console.log(curriedAdd(1))      // (y) => 1 + y

const add4 = (a, b, c, d) => a + b + c + d

const curriedAdd4 = _.curry(add4)

console.log(curriedAdd4(1)(2)(3)(4))
console.log(curriedAdd4(1, 2)(3, 4))
console.log(curriedAdd4(1, 2, 3)(4))

// --------- sourece code ------------
// curry(add) -> (a) => (b) => add(a, b)
//            -> (a, b) => add(a, b)
const partical = (f, ...args) => (...moreargs) => f(...args, ...moreargs)

const curry = function (add, len = add.length) {
  return (...args) => len - args.length === 0 ? add(...args) : curry(partical(add, ...args), len - args.length) 
}

const add6 = (a, b, c, d, e, f) => a + b + c + d + e + f

console.log(curry(add6)(1, 2, 3)(4, 5, 6))
console.log(curry(add6)(1)(2, 3)(4, 5, 6))
console.log(curry(add6)(1, 2)(3)(4, 5, 6))
console.log(curry(add6)(1, 2)(3)(4)(5, 6))
