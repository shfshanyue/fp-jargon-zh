const partical = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs)

const add3 = (a, b, c) => a + b + c

// (...args) => add3(2, 3, ...args)
// (c) => 2 + 3 + c
const fivePlus = partical(add3, 2, 3)

console.log(fivePlus(4))  // 9

const add1More = add3.bind(null, 2, 3)

console.log(add1More(4))
