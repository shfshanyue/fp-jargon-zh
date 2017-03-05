const filter = (predicate, xs) => xs.filter(predicate)

const is = (type) => (x) => Object(x) instanceof type

const results = filter(is(Number), [0, '1', 2, null]) 

console.log(results)  // 0, 2
