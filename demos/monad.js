Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}

// ['cat', 'dog', 'fish', 'bird']
const a = Array.of('cat,dog', 'fish,bird').chain(s => s.split(','))

// Derivations
const animals = Array.of('cat,dog', 'fish,bird')
const f = s => s.split(',')

const b = animals.map(f)
const c = animals.chain(x => {
  return Array.of(f(x))
})

// map :: function(f) { return this.chain(a => this.of(f(a))); }
console.log(a, b, c)

