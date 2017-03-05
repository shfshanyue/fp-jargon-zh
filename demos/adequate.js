const _ = require('lodash')

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
// console.log(Container.of("bombs").map(_.concat(' away')).map(_.prop('length')))

const Maybe = function (x) {
  this.__value = x  
}

Maybe.of = (x) => new Maybe(x)

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this))
}
