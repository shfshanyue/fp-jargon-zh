const rand = function* () {
  while (true) {
    yield Math.random()  
  } 
}

const randIter = rand()
const number = randIter.next()
console.log(number.value)
