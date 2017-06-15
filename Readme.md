# 函数式编程术语

> 译者注：本项目译自 [functional-programing-jargon](https://github.com/hemanth/functional-programming-jargon)，专业术语居多，如有错误，可以提 pr 更正。除了术语翻译，针对每项术语，也有代码示例，位于 /demos 目录下。另外，这里也有几份不错的文章和仓库。
  + [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
  + [mostly-adequate-guide (10749 stars)](https://github.com/MostlyAdequate/mostly-adequate-guide)
  + [mostly-adequate-guide-chinese (602 stars)](https://github.com/llh911001/mostly-adequate-guide-chinese)
  + [fantasy-land](https://github.com/fantasyland/fantasy-land)

函数式编程有许多优势，由此越来越受欢迎。然而每个编程范式 (paradigm) 都有自己唯一的术语，函数式编程也不例外。我们提供一张术语表，希望使你学习函数式编程变得容易些。

示例均为 javascript (ES2015)。[Why javascript](https://github.com/hemanth/functional-programming-jargon/wiki/Why-JavaScript%3F)

*尚在 WIP 阶段，欢迎 pr。*

如有可能，本篇文档术语由 [Fantasy Land spec](https://github.com/fantasyland/fantasy-land) 定义。

**目录**

* [Arity](#arity)
* [高阶组件 (HOF)](#higher-order-functions-hof)
* [偏函数应用 (Partial Application)](#partial-application)
* [柯里化 (Currying)](#currying)
* [自动柯里化 (Auto Currying)](#auto-currying)
* [函数组合 (Function Composition)](#function-composition)
* [Continuation](#continuation)
* [纯函数 (Purity)](#purity)
* [副作用 (Side effects)](#side-effects)
* [幂等性 (Idempotent)](#idempotent)
* [Point-Free 风格 (Point-Free Style)](#point-free-style)
* [谓词 (Predicate)](#predicate)
* [契约 (Contracts)](#contracts)
* [Guarded Functions](#guarded-functions)
* [范畴 (Category)](#category)
* [值 (Value)](#value)
* [常量 (Constant)](#constant)
* [函子 (Functor)](#functor)
  * [一致性 (Preserves identity)](#preserves-identity)
  * [组合性 (Composable)](#composable)
* [Pointed Functor](#pointed-functor)
* [Lift](#lift)
* [引用透明性 (Referential Transparency)](#referential-transparency)
* [Equational Reasoning](#equational-reasoning)
* [匿名函数 (Lambda)](#lambda)
* [Lambda Calculus](#lambda-calculus)
* [惰性求值 (Lazy evaluation)](#lazy-evaluation)
* [独异点 (Monoid)](#monoid)
* [Monad](#monad)
* [Comonad](#comonad)
* [Applicative Functor](#applicative-functor)
* [态射 (Morphism)](#morphism)
  * [自同态 (Endomorphism)](#endomorphism)
  * [同构 (Isomorphism)](#isomorphism)
* [Setoid](#setoid)
* [半群 (Semigroup)](#semigroup)
* [Foldable](#foldable)
* [Traversable](#traversable)
* [类型签名 (Type Signatures)](#type-signatures)
* [Union type](#union-type)
* [Product type](#product-type)
* [Option](#option)
* [函数式编程库](#functional-programming-libraries-in-javascript)

<div id="arity"></div>

## Arity
函数参数的个数。来自于单词 unary, binary, ternary 等等。这个单词是由 -ary 与 -ity 两个后缀拼接而成。例如，一个带有两个参数的函数被称为二元函数或者它的 arity 是2。它也被那些更喜欢希腊词根而非拉丁词根的人称为 `dyadic`。同样地，带有可变数量参数的函数被称为 `variadic`，而二元函数只能带两个参数。

``` js
const sum = (a, b) => a + b

const arity = sum.length
console.log(arity)        // 2
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/arity.js)

<div id="higher-order-functions-hof"></div>

## 高阶函数 (Higher-Order Function / HOF)
以函数为参数或/和返回值。

``` js
const filter = (predicate, xs) => xs.filter(predicate)

const is = (type) => (x) => Object(x) instanceof type

filter(is(Number), [0, '1', 2, null]) // 0, 2
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/hoc.js)

<div id="partical-application"></div>

## 偏函数 (Partial Function)
对原始函数预设参数作为一个新的函数。

``` js
// 创建偏函数，固定一些参数
const partical = (f, ...args) =>
  // 返回一个带有剩余参数的函数
  (...moreArgs) =>
    // 调用原始函数
    f(...args, ...moreArgs)

const add3 = (a, b, c) => a + b + c

// (...args) => add3(2, 3, ...args)
// (c) => 2 + 3 + c
const fivePlus = partical(add3, 2, 3)

fivePlus(4)  // 9
```

也可以使用 `Function.prototype.bind` 实现偏函数。

``` js
const add1More = add3.bind(null, 2, 3)
```

偏函数应用通过对复杂的函数填充一部分数据来构成一个简单的函数。柯里化通过偏函数实现。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/partial.js)

<div id="currying"></div>

## 柯里化 (Currying)
将一个多元函数转变为一元函数的过程。
每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到传递完所有的参数。

``` js
const sum = (a, b) => a + b

const curriedSum = (a) => (b) => a + b

curriedSum(3)(4)         // 7

const add2 = curriedSum(2)

add2(10)     // 12
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/curry.js)

<div id="auto-currying"></div>

## 自动柯里化 (Auto Currying)
`lodash`，`understore` 和 `ramda` 有 `curry` 函数可以自动完成柯里化。

``` js
const add = (x, y) => x + y

const curriedAdd = _.curry(add)

curriedAdd(1, 2)   // 3
curriedAdd(1)(2)   // 3
curriedAdd(1)      // (y) => 1 + y
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/curry2.js)

#### 进一步阅读
+ [Favoring Curry](http://fr.umio.us/favoring-curry/)
+ [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA)

<div id="function-composition"></div>

## 函数组合 (Function Composing) 
接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出。

``` js
const compose = (f, g) => (a) => f(g(a))    // 定义
const floorAndToString = compose((val) => val.toString(), Math.floor) // 使用
floorAndToString(12.12)   // '12'
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/compose.js)

<div id="continuation"></div>

## Continuation
在一个程序执行的任意时刻，尚未执行的代码称为 Continuation。

``` js
const printAsString = (num) => console.log(`Given ${num}`)

const addOneAndContinue = (num, cc) => {
  const result = num + 1
  cc(result)
}

addOneAndContinue(2, printAsString) // 'Given 3'
```

Continuation 在异步编程中很常见，比如当程序需要接收到数据才能够继续执行。请求的响应通常作为代码的剩余执行部分，一旦接收到数据，对数据的处理被作为 Continuation。

``` js
const continueProgramWith = (data) => {
  // 继续执行程序
}

readFileAsync('path/to/file', (err, response) => {
  if (err) {
    // 错误处理
    return
  }
  continueProgramWith(response)
})
```

<div id="purity"></div>

## 纯函数 (Purity)
输出仅由输入决定，且不产生副作用。

``` js
const greet = (name) => `hello, ${name}`

greet('world')
```

以下代码不是纯函数：

``` js
window.name = 'Brianne'

const greet = () => `Hi, ${window.name}`

greet() // "Hi, Brianne"
```

以上示例中，函数依赖外部状态。

``` js
let greeting

const greet = (name) => {
    greeting = `Hi, ${name}`
}

greet('Brianne')
greeting // "Hi, Brianne"
```

以上实例中，函数修改了外部状态。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/purity.js)

<div id="side-effects"></div>

## 副作用 (Side effects)
如果函数与外部可变状态进行交互，则它是有副作用的。

``` js
const differentEveryTime = new Date()
```

``` js
console.log('IO is a side effect!')
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/sideEffect.js)

<div id="idempotent"></div>

## 幂等性 (Idempotent)
如果一个函数执行多次皆返回相同的结果，则它是幂等性的。

``` js
f(f(x)) ≍ f(x)
```

``` js
Math.abs(Math.abs(10))
```

``` js
sort(sort(sort([2, 1])))
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/idempotent.js)

<div id="point-free-style"></div>

## Point-Free 风格 (Point-Free Style)
定义函数时，不显式地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫 Tacit programming。

``` js
const map = (fn) => (list) => list.map(fn)
const add = (a) => (b) => a + b

# Points-Free   list 是显式参数
const incrementAll = (numbers) => map(add(1))(numbers)

# Points-Free   list 是隐式参数
const incrementAll2 = map(add(1))
```

`incrementAll` 识别并且使用了 `numbers` 参数，因此它不是 Point-Free 风格的。
`incrementAll2` 连接函数与值，并不提及它所使用的参数，因为它是 Point-Free 风格的。

Point-Free 风格的函数就像平常的赋值，不使用 `function` 或者 `=>`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/pointFree.js)

<div id="predicate"></div>

## 谓词 (Predicate)
根据输入返回 true 或 false。通常用在 Array.prototype.filter 的回调函数中。

``` js
const predicate = (a) => a > 2

;[1, 2, 3, 4].filter(predicate)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/predicate.js)

<div id="contract"></div>

## 契约 (Contracts)
契约保证了函数或者表达式在运行时的行为。当违反契约时，将抛出一个错误。

``` js
const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract Violated: expected int -> int')
}

const addOne = (num) => contract(num) && num + 1

addOne(2)
addOne('hello') // Error
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/contracts.js)

<div id="guarded-functions"></div>

## Guarded Functions
TODO

<div id="category"></div>

## 范畴 (Category)
在范畴论中，范畴是指对象集合及它们之间的态射 (morphism)。在编程中，数据类型作为对象，函数作为态射。

一个有效的范畴遵从以下三个原则：

1. 必有一个 identity 态射，使得 map 一个对象是它自身。`a` 是范畴里的一个对象时，必有一个函数使 `a -> a`。
2. 态射必是可组合的。`a`，`b`，`c` 是范畴里的对象，`f` 是态射 `a -> b`，`g` 是 `b -> c` 态射。`g(f(x))` 一定与 `(g ● f)(x)` 是等价的。
3. 组合满足结合律。`f ● (g ● h)` 与 `(f ● g) ● h` 是等价的。

这些准则是非常抽象的，范畴论对与发现组合的新方法是伟大的。

#### 进一步阅读
+ [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)

<div id="value"></div>

## 值 (Value)
赋值给变量的值称作 Value。

``` js
5
Object.freeze({name: 'John', age: 30})
;(a) => a
;[1]
undefined
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/value.js)

<div id="constant"></div>

## 常量 (Constant)
一旦定义不可重新赋值。

``` js
const five = 5
const john = Object.freeze({name: 'John', age: 30})
```

常量是[引用透明](#referential-transparency)的，因此它们可以被它们所代表的值替代而不影响结果。

对于以上两个常量，以下语句总会返回 true。

``` js
john.age + five === ({name: 'John', age: 30}).age + (5)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/constant.js)

<div id="functor"></div>

## 函子 (Functor)
一个实现了map 函数的对象，map 会遍历对象中的每个值并生成一个新的对象。遵守两个准则

<div id="preserves-identity"></div>

### 一致性 (Preserves identity)

``` js
object.map(x => x) ≍ object
```

<div id="composable"></div>

### 组合性 (Composable)

``` js
object.map(compose(f, g)) ≍ object.map(g).map(f)  // f, g 为任意函数
```

在 javascript 中一个常见的函子是 Array, 因为它遵守因子的两个准则。

``` js
const f = x => x + 1
const g = x => x * 2

;[1, 2, 3].map(x => f(g(x)))
;[1, 2, 3].map(g).map(f)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)

<div id="pointed-functor"></div>

### Pointed Functor
一个实现了 of 函数的对象。

ES2015 添加了 `Array.of`，使 Array 成为了 Pointed Functor。

``` js
Array.of(1)
```

<div id="lift"></div>

## Lift
TODO

<div id="referential-transparency"></div>

## 引用透明性 (Referential Transparency)
一个表达式能够被它的值替代而不改变程序的行为成为引用透明。

``` js
const greet = () => 'hello, world.'
```

<div id="equaltional-reasoning"></div>

## Equational Reasoning
TODO

<div id="lambda"></div>

## 匿名函数 (Lambda)
匿名函数被视作一个值

``` js
;(function (a) {
    return a + 1
})

;(a) => a + 1
```

匿名函数通常作为高阶函数的参数

``` js
[1, 2].map((a) => a + 1)
```

可以把 Lambda 赋值给一个变量

``` js
const add1 = (a) => a + 1
```

<div id="lambda-caculus"></div>

## Lambda Caculus
数学的一个分支，使用函数创造 [通过计算模型](https://en.wikipedia.org/wiki/Lambda_calculus)

<div id="lazy-evaluation"></div>

## 惰性求值 (Lazy evaluation)
按需求值机制，只有当需要计算所得值时才会计算。

``` js
const rand = function* () {
  while (true) {
    yield Math.random()  
  } 
}

const randIter = rand()
randIter.next()
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)

<div id="monoid"></div>

## Monoid
一个对象拥有一个函数用来连接相同类型的对象。

数值加法是一个简单的 Monoid

``` js
1 + 1   // 2
```

以上示例中，数值是对象而 `+` 是函数。

与另一个值结合而不会改变它的值必须存在，称为 `identity`。

加法的 `identity` 值为 0:

``` js
1 + 0   // 1
```

需要满足结合律

``` js
1 + (2 + 3) === (1 + 2) + 3 // true
```

数组的结合也是 Monoid

``` js
;[1, 2].concat([3, 4])
```

`identity` 值为空数组

``` js
;[1, 2].concat([])
```

identity 与 compose 函数能够组成 monoid

``` js
const identity = (a) => a
const compose = (f, g) => (x) => f(g(x))
```

foo 是只带一个参数的任意函数

``` js
compose(foo, identity) ≍ compose(identity, foo) ≍ foo
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monoid.js)

<div id="monad"></div>

## Monad
拥有 `of` 和 `chain` 函数的对象。`chain` 很像 `map`， 除了用来铺平嵌套数据。

``` js
Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}

// ['cat', 'dog', 'fish', 'bird']
;Array.of('cat,dog', 'fish,bird').chain(s => s.split(','))

// [['cat', 'dog'], ['fish', 'bird']]
;Array.of('cat,dog', 'fish,bird').map(s => s.split(','))
```

在有些语言中，`of` 也称为 `return`，`chain` 也称为 `flatmap` 与 `bind`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monad.js)

<div id="comonad"></div>

## Comonad
拥有 `extract` 与 `extend` 函数的对象。

``` js
const CoIdentity = (v) => ({
  val: v,
  extract () {
    return this.val  
  },
  extend (f) {
    return CoIdentity(f(this))  
  }
})
```

``` js
CoIdentity(1).extract()
CoIdentity(1).extend(x => x.extract() + 1)   # CoIdentity(2)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/comonad.js)

<div id="applicative-functor"></div>

## Applicative Functor
一个拥有 ap 函数的对象。

``` js
// 实现
Array.prototype.ap = function (xs) {
    return this.reduce((acc, f) => acc.concat(xs.map(f)), [])
}

// 示例
;[(a) => a + 1].ap([1]) // [2]
```

如果你有两个对象，并需要对他们的元素执行一个二元函数

``` js
// Arrays that you want to combine
const arg1 = [1, 3]
const arg2 = [4, 5]

// combining function - must be curried for this to work
const add = (x) => (y) => x + y

const partiallyAppliedAdds = [add].ap(arg1) // [(y) => 1 + y, (y) => 3 + y]
```

由此得到了一个函数数组，并且可以调用 `ap` 函数得到结果

``` js
partiallyAppliedAdds.ap(arg2) // [5, 6, 7, 8]
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/applicativeFunctor.js)

<div id="morphism"></div>

## 态射 (Morphism)
一个变形的函数。

<div id="endomophism"></div>

### 自同态 (Endomorphism)
输入输出是相同类型的函数。

``` js
// uppercase :: String -> String
const uppercase = (str) => str.toUpperCase()

// decrement :: Number -> Number
const decrement = (x) => x - 1
```

<div id="isomorphism"></div>

### 同构 (Isomorphism)
不用类型对象的变形，保持结构并且不丢失数据。

例如，一个二维坐标既可以表示为数组 `[2, 3]`，也可以表示为对象 `{x: 2, y: 3}`。

``` js
// 提供函数在两种类型间互相转换
const pairToCoords = (pair) => ({x: pair[0], y: pair[1]})

const coordsToPair = (coords) => [coords.x, coords.y]

coordsToPair(pairToCoords([1, 2])) // [1, 2]

pairToCoords(coordsToPair({x: 1, y: 2})) // {x: 1, y: 2}
```

<div id="setoid"></div>

## Setoid
拥有 `equals` 函数的对象。`equals` 可以用来和其它对象比较。

``` js
Array.prototype.equals = function (arr) {
  const len = this.length
  if (len !== arr.length) {
    return false
  }
  for (let i = 0; i < len; i++) {
    if (this[i] !== arr[i]) {
      return false
    }
  }
  return true
}

;[1, 2].equals([1, 2])   // true
;[1, 2].equals([3, 4])   // false
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/setoid.js)

<div id="semigroup"></div>

## 半群 (Semigroup)
一个拥有 `concat` 函数的对象。`concat` 可以连接相同类型的两个对象。

``` js
;[1].concat([2]) // [1, 2]
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/semigroup.js)

<div id="foldable"></div>

## Foldable
一个拥有 `reduce` 函数的对象。`reduce` 可以把一种类型的对象转化为另一种类型。

``` js
const sum = (list) => list.reduce((acc, val) => acc + val, 0)
sum([1, 2, 3])        // 6
```

<div id="traversable"></div>

## Traversable
TODO

<div id="type-signatures"></div>

## 类型签名 (Type Signatures)
通常 js 会在注释中指出参数与返回值的类型。

``` js
// functionName :: firstArgType -> secondArgType -> returnType

// add :: Number -> Number -> Number
const add = (x) => (y) => x + y

// increment :: Number -> Number
const increment = (x) => x + 1
```

如果函数的参数也是函数，那么这个函数需要用括号括起来。

``` js
// call :: (a -> b) -> a -> b
const call = (f) => (x) => f(x)
```

字符 a, b, c, d 表明参数可以是任意类型。以下版本的 `map` 的参数 f，把一种类型 a 的数组转化为另一种类型 b 的数组。

``` js
// map :: (a -> b) -> [a] -> [b]
const map = (f) => (list) => list.map(f)
```

<div id="union-type"></div>

## 联合类型 (Union Type)
连接不同的数据类型。

js 没有静态类型，我们假设一个数据类型是 `NumOrString` 用来对 `Number` 与 `String` 两种类型求和。

js 中可以对数值或字符串使用 `+` 操作符，因此我们可以使用这个新类型去描述输入输出。

``` js
// add :: (NumOrString, NumOrString) -> NumOrString
const add = (a, b) => a + b

add(1, 2) // Returns number 3
add('Foo', 2) // Returns string "Foo2"
add('Foo', 'Bar') // Returns string "FooBar"
```

联合类型又称为代数类型 algebraic types，tagged union 或者 sum type。

这里有一些 js 库可以帮助我们定义和使用联合类型。

+ [union-type](https://github.com/paldepind/union-type)
+ [daggy](https://github.com/fantasyland/daggy)

<div id="product-type"></div>

## Product type
用一种你可能更熟悉的方式把数据类型联合起来

``` js
// point :: (Number, Number) -> {x: Number, y: Number}
const point = (x, y) => ({x: x, y: y})
```

又见 [Set theory](https://en.wikipedia.org/wiki/Set_theory)

<div id="option"></div>

## Option
Option 是一种联合类型，它有两种情况，`Some` 或者 `None`。

``` js
// 定义
const Some = (v) => ({
  val: v,
  map (f) {
    return Some(f(this.val))
  },
  chain (f) {
    return f(this.val)
  }
})

const None = () => ({
  map (f) {
    return this
  },
  chain (f) {
    return this
  }
})

// maybeProp :: (String, {a}) -> Option a
const maybeProp = (key, obj) => typeof obj[key] === 'undefined' ? None() : Some(obj[key])
```

使用 `chain` 可以序列化返回 `Option` 的函数。

``` js
// getItem :: Cart -> Option CartItem
const getItem = (cart) => maybeProp('item', cart)

// getPrice :: Item -> Option Number
const getPrice = (item) => maybeProp('price', item)

// getNestedPrice :: cart -> Option a
const getNestedPrice = (cart) => getItem(obj).chain(getPrice)

getNestedPrice({}) // None()
getNestedPrice({item: {foo: 1}}) // None()
getNestedPrice({item: {price: 9.99}}) // Some(9.99)
```

在其它的一些地方，`Option` 也称为 `Maybe`，`Some` 也称为 `Just`，`None` 也称为 `Nothing`。

[示例 option.js](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/option.js)
[示例 maybe.js](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/maybe.js)

<div id="functional-programing-libraries-in-javascript"></div>

## 在 js 中的函数式编程库

+ [mori](https://github.com/swannodette/mori)
+ [Immutable](https://github.com/facebook/immutable-js/)
+ [Ramda](https://github.com/ramda/ramda)
+ [Folktale](http://folktalejs.org)
+ [monet.js](https://cwmyers.github.io/monet.js/)
+ [lodash](https://github.com/lodash/lodash)
+ [Underscore.js](https://github.com/jashkenas/underscore)
+ [Lazy.js](https://github.com/dtao/lazy.js)
+ [maryamyriameliamurphies.js](https://github.com/sjsyrek/maryamyriameliamurphies.js)
+ [Haskell in ES6](https://github.com/casualjavascript/haskell-in-es6)
