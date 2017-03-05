const map = (fn) => (list) => list.map(fn)
const add = (a) => (b) => a + b

# Points-Free   list 是显式参数
const incrementAll = (numbers) => map(add(1))(numbers)

# Points-Free   list 是隐式参数
const incrementAll2 = map(add(1))
