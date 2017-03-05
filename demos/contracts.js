const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract Violated: expected int -> int')
}

const addOne = (num) => contract(num) && num + 1

addOne(2)
addOne('hello')
