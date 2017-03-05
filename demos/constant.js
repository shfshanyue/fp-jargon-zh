const five = 5
const john = Object.freeze({name: 'John', age: 30})

john.name = 'xiange'
console.log(john)

john.age + five === ({name: 'John', age: 30}).age + (5)
