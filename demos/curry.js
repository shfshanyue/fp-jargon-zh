const sum = (a, b) => a + b

const curriedSum = (a) => (b) => a + b

console.log(curriedSum(3)(4))         // 7

const add2 = curriedSum(2)

console.log(add2(10))     // 12
