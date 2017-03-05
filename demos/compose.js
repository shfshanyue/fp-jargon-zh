const compose = (f, g) => (a) => f(g(a))
const floorAndToString = compose((val) => val.toString(), Math.floor)
console.log(floorAndToString(12.12))   // '12'
