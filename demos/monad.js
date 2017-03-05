Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}

// ['cat', 'dog', 'fish', 'bird']
const a = Array.of('cat,dog', 'fish,bird').chain(s => s.split(','))

// [['cat', 'dog'], ['fish', 'bird']]
const b = Array.of('cat,dog', 'fish,bird').map(s => s.split(','))

console.log(a, b)
