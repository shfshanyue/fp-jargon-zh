const f = x => x + 1
const g = x => x * 2

const a = [1, 2, 3].map(x => f(g(x)))
const b = [1, 2, 3].map(g).map(f)

console.log(a, b)

const Container = function (x) {
  this.__value = x  
}

Container.of = (x) => new Container(x) 

// console.log(Container.of(3))
// console.log(Container.of('hello, world'))
// console.log(Container.of(Container.of(3)))

Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}

// console.log(Container.of(3).map(x => x + 2))
// console.log(Container.of('hello, world.').map(s => s.toUpperCase()))
const compose = (f, g) => x => f(g(x))

const r1 = Container.of(3).map(x => x + 2).map(x => x * 3)
const r2 = Container.of(3).map(compose(x => x * 3, x => x + 2))

console.log(r1, r2)
