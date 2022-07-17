# 函数式编程术语

> 译者注：本项目译自 [functional-programing-jargon](https://github.com/hemanth/functional-programming-jargon)，专业术语居多，如有错误，可以提 pr 更正。除了术语翻译，针对每项术语，也有代码示例，位于 /demos 目录下。另外，这里也有几份不错的文章和仓库。
  + [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
  + [mostly-adequate-guide (10749 stars)](https://github.com/MostlyAdequate/mostly-adequate-guide)
  + [mostly-adequate-guide-chinese (602 stars)](https://github.com/llh911001/mostly-adequate-guide-chinese)
  + [fantasy-land](https://github.com/fantasyland/fantasy-land)

函数式编程有许多优势，由此越来越受欢迎。然而每个编程范式 (paradigm) 都有自己唯一的术语，函数式编程也不例外。我们提供一张术语表，希望使你学习函数式编程变得容易些。

示例均为 javascript (ES2015)。[为什么使用JavaScript?](https://github.com/hemanth/functional-programming-jargon/wiki/Why-JavaScript%3F)

*尚在 WIP 阶段，欢迎 pr。*

如果适用，本篇文档使用定义在 [Fantasy Land spec](https://github.com/fantasyland/fantasy-land) 中的术语。

**目录**

* [Arity](#arity)
* [高阶组件 (HOF)](#higher-order-functions-hof)
* [闭包 (Closure)](#closure)
* [偏函数应用 (Partial Application)](#partial-application)
* [柯里化 (Currying)](#currying)
* [自动柯里化 (Auto Currying)](#auto-currying)
* [函数组合 (Function Composition)](#function-composition)
* [后续 (Continuation)](#continuation)
* [纯函数 (Purity)](#purity)
* [副作用 (Side effects)](#side-effects)
* [幂等性 (Idempotent)](#idempotent)
* [Point-Free 风格 (Point-Free Style)](#point-free-style)
* [断定 (Predicate)](#predicate)
* [契约 (Contracts)](#contracts)
* [范畴 (Category)](#category)
* [值 (Value)](#value)
* [常量 (Constant)](#constant)
* [函子 (Functor)](#functor)
  * [一致性 (Preserves identity)](#preserves-identity)
  * [组合性 (Composable)](#composable)
* [指向函子 (Pointed Functor)](#pointed-functor)
* [抬升 (Lift)](#lift)
* [引用透明性 (Referential Transparency)](#referential-transparency)
* [等式推理 (Equational Reasoning)](#equational-reasoning)
* [Lambda](#lambda)
* [Lambda 演算 (Lambda Calculus)](#lambda-calculus)
* [惰性求值 (Lazy evaluation)](#lazy-evaluation)
* [幺半群 (Monoid)](#monoid)
* [单子 (Monad)](#monad)
* [余单子 (Comonad)](#comonad)
* [应用函子 (Applicative Functor)](#applicative-functor)
* [态射 (Morphism)](#morphism)
  * [Endomorphism (自同态)](#endomorphism)
  * [Isomorphism (同构)](#isomorphism)
  * [Homomorphism (同态)](#homomorphism)
  * [Catamorphism](#catamorphism)
  * [Anamorphism](#anamorphism)
  * [Hylomorphism](#hylomorphism)
  * [Paramorphism](#paramorphism)
  * [Apomorphism](#apomorphism)
* [Setoid](#setoid)
* [半群 (Semigroup)](#semigroup)
* [可折叠性 (Foldable)](#foldable)
* [透镜 (Lens)](#lens)
* [类型签名 (Type Signatures)](#type-signatures)
* [代数数据类型 (Algebraic data type)](#algebraic-data-type)
  * [和类型 (Sum type)](#sum-type)
  * [积类型 (Product type)](#product-type)
* [可选类型 (Option)](#option)
* [函数 (Function)](#function)
* [偏函数 (Partial Function)](#partial-function)
* [函数式编程库](#functional-programming-libraries-in-javascript)

<div id="arity"></div>

## Arity
函数参数的个数。来自于单词 unary(一元), binary(二元), ternary(三元) 等等。这个单词是由 -ary 与 -ity 两个后缀拼接而成。例如，加法函数有两个参数，因此它被定义为二元函数(`binary function`)，或者说它的 `arity` 是2。它也被那些更喜欢希腊词根而非拉丁词根的人称为 `dyadic`。同样地，带有可变数量的参数的函数被称为 `variadic`，而二元函数只能且必须带两个参数，尽管有柯里化(currying)和偏函数应用(partial application)的存在(见下文)。

``` js
const sum = (a, b) => a + b

const arity = sum.length
console.log(arity)        // 2

// 函数sum的arity为2。
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/arity.js)

<div id="higher-order-functions-hof"></div>

## 高阶函数 (Higher-Order Function / HOF)
以函数为参数或/和返回值的函数。

``` js
const filter = (predicate, xs) => xs.filter(predicate)

const is = (type) => (x) => Object(x) instanceof type

filter(is(Number), [0, '1', 2, null]) // 0, 2
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/hoc.js)

<div id="closure"></div>

## 闭包 (Closure)
闭包是访问在其作用域外的变量的一种方式。正式地说，闭包是一种用于实现词法作用域命名绑定的技术。它是存储一个函数和它的环境的一种方法。

闭包是一个作用域，它会捕获函数的局部变量，因此即使执行过程已经移出了定义它的那个代码块，也可以访问它们。也就是说，它们允许在声明变量的代码块已经执行完成之后，还是可以引用这个作用域。

``` js
const addTo = x => y => x + y;
var addToFive = addTo(5);
addToFive(3); //返回 8
```

函数`addTo()`返回了一个函数(在内部调用了`add()`)，我们将它保存在了一个叫做`addToFive`的变量中，并且柯里化地用一个参数5来调用它。

理想情况下，当函数`addTo`执行完成后，它的作用域，包括本地变量add(即+)，x，y，都应该无法访问了。但是，`addToFive()`的调用返回了8。这说明，`addTo`函数的状态被保存了，即使在代码块已经完成执行之后。否则，就不会知道`addTo`曾经被`addTo(5)`这样调用过，且x的值被设为了5。

词法作用域(lexical scoping)是它能找到x和add这两个已经完成执行的父级私有变量的原因。这个值就称为闭包。

栈和函数的词法作用域被以父函数的引用的形式存储。这可以防止闭包和底层的变量被垃圾回收(因为至少有一个对它的有效引用)。

Lambda Vs 闭包：Lambda本质上是一个内联定义的函数，而不是声明函数的标准方法。Lambda经常可以作为对象被传递。

闭包是通过引用其主体外部的字段来将其周围的状态包裹进来的函数。被包裹的状态在闭包调用期间保持不变。

<div id="partial-application"></div>

## 偏函数应用 (Partial Application)
"部分地"应用一个函数，即预设原始函数的部分参数来创建一个新的函数。

``` js
// 创建偏函数，固定一些参数
const partical = (f, ...args) =>
  // 返回一个带有剩余参数的函数
  (...moreArgs) =>
    // 调用原始函数
    f(...args, ...moreArgs)

const add3 = (a, b, c) => a + b + c // (c) => 2 + 3 + c

// 部分地将`2`和`3`应用于`add3`，得到一个只有一个参数的函数
const fivePlus = partical(add3, 2, 3)

fivePlus(4)  // 9
```

也可以使用 `Function.prototype.bind` 实现偏函数。

``` js
const add1More = add3.bind(null, 2, 3) // (c) => 2 + 3 + c
```

偏函数应用通过对复杂的函数填充一部分数据来构成一个简单的函数。柯里化就是自动实现的偏函数。

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
将一个包含多个参数的函数转换成另一个函数，这个函数如果被给到的参数少于正确的数量，就会返回一个接受剩余参数的函数。

lodash & Ramda 有一个`curry`函数可以做到这一点。

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

## 函数组合 (Function Composition) 
把两个函数放在一起形成第三个函数的行为，一个函数的输入为另一个函数的输出。

``` js
const compose = (f, g) => (a) => f(g(a))    // 定义
const floorAndToString = compose((val) => val.toString(), Math.floor) // 使用
floorAndToString(12.12)   // '12'
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/compose.js)

<div id="continuation"></div>

## Continuation (后续)
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

以上示例中，函数输出基于在函数外部存储的数据。

``` js
let greeting

const greet = (name) => {
    greeting = `Hi, ${name}`
}

greet('Brianne')
greeting // "Hi, Brianne"
```

以上示例中，函数修改了外部状态。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/purity.js)

<div id="side-effects"></div>

## 副作用 (Side effects)
如果一个函数或者表达式除了返回一个值之外，还与外部可变状态进行了交互（读取或写入），则它是有副作用的。

``` js
const differentEveryTime = new Date()
```

``` js
console.log('IO就是一种副作用!')
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/sideEffect.js)

<div id="idempotent"></div>

## 幂等 (Idempotent)
如果一个函数执行多次皆返回相同的结果，则它是幂等的。

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
// 已知：
const map = (fn) => (list) => list.map(fn)
const add = (a) => (b) => a + b

// 所以：

// 非Points-Free —— number 是显式参数
const incrementAll = (numbers) => map(add(1))(numbers)

// Points-Free —— list 是隐式参数
const incrementAll2 = map(add(1))
```

`incrementAll` 识别并且使用了 `numbers` 参数，因此它不是 Point-Free 风格的。
`incrementAll2` 仅连接函数与值，并不提及它所使用的参数，因为它是 Point-Free 风格的。

Point-Free 风格的函数就像平常的赋值，不使用 `function` 或者 `=>`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/pointFree.js)

<div id="predicate"></div>

## 断定 (Predicate)
根据输入返回 true 或 false。通常用在 array filter 的回调函数中。

``` js
const predicate = (a) => a > 2

;[1, 2, 3, 4].filter(predicate)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/predicate.js)

<div id="contracts"></div>

## 契约 (Contracts)
契约规定了函数或表达式在运行时的行为的职责和保障。它表现为一组规则，这些规则是对函数或表达式的输入和输出的期望。当违反契约时，将抛出一个错误。

``` js
// 定义的contract: int -> boolean
const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract Violated: expected int -> int')
}

const addOne = (num) => contract(num) && num + 1

addOne(2) // 3
addOne('hello') // 违反了contract: int -> boolean
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/contracts.js)

<div id="category"></div>

## 范畴 (Category)
在范畴论中，范畴是指对象集合及它们之间的态射 (morphism)。在编程中，数据类型作为对象，函数作为态射。

一个有效的范畴遵从以下三个原则：

1. 必有一个同一态射（identity morphism）将一个对象映射到它自身。即当 `a` 是范畴里的一个对象时，必有一个函数使 `a -> a`。
2. 态射必是可组合的。`a`，`b`，`c` 是范畴里的对象，`f` 是态射 `a -> b`，`g` 是 `b -> c` 态射。`g(f(x))` 一定与 `(g • f)(x)` 是等价的。
3. 组合满足结合律。`f • (g • h)` 与 `(f • g) • h` 是等价的。

由于这些准则是在非常抽象的层面控制着组合方式，因此范畴论对于发现组合的新方法来说是伟大的。

#### 进一步阅读
+ [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)

<div id="value"></div>

## 值 (Value)
任何可以赋给变量的东西叫做值。

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
一旦被定义之后就不可以被重新赋值。

``` js
const five = 5
const john = Object.freeze({name: 'John', age: 30})
```

常量是[引用透明](#referential-transparency)的，也就是说，它们可以被它们所代表的值替代而不影响结果。

对于以上两个常量，以下语句总会返回 true。

``` js
john.age + five === ({name: 'John', age: 30}).age + (5)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/constant.js)

<div id="functor"></div>

## 函子 (Functor)
函子是一个实现了 `map` 函数的对象。`map` 函数会遍历对象中的每个值并生成一个新的对象，遵守两个准则:

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
(`f`, `g` 是任意的函数)

在 javascript 中一个常见的函子是 Array, 因为它遵守因子的两个准则。

``` js
const f = x => x + 1
const g = x => x * 2

;[1, 2, 3].map(x => f(g(x)))
;[1, 2, 3].map(g).map(f)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)

<div id="pointed-functor"></div>

### 指向函子 (Pointed Functor)
一个对象，拥有一个`of`函数，可以将一个任何值放入它自身。

ES2015 添加了 `Array.of`，使 Array 成为了 Pointed Functor。

``` js
Array.of(1)
```

<div id="lift"></div>

## 抬升 (Lift)
抬升是指将一个值放进一个对象（如[函子](#functor)）中。如果你将一个函数抬升到一个[应用函子](#applicative-functor)中，那么就可以将它作用于该函子中的值。

``` js
const liftA2 = (f) => (a, b) => a.map(f).ap(b) // 注意这里是 ap 而不是 map.

const mult = a => b => a * b

const liftedMult = liftA2(mult) // 这个函数现在可以作用于函子，如Array

liftedMult([1, 2], [3]) // [3, 6]
liftA2(a => b => a + b)([1, 2], [3, 4]) // [4, 5, 5, 6]
```

抬升并应用一个单参数的函数的作用等同于 `map`。

``` js
const increment = (x) => x + 1

lift(increment)([2]) // [3]
;[2].map(increment) // [3]
```

<div id="referential-transparency"></div>

## 引用透明性 (Referential Transparency)
如果一个表达式能够被它的值替代而不改变程序的行为，则它是引用透明的。

例如我们有 greet 函数：

``` js
const greet = () => 'hello, world.'
```

任何对 `greet()` 的调用都可以被替换为 `Hello World!`, 因此 greet 是引用透明的。

<div id="equational-reasoning"></div>

## 等式推理 (Equational Reasoning)
当一个应用程序由表达式组成并且没有副作用时，我们可以从这些组成部分中得知系统的真相。

<div id="lambda"></div>

## Lambda
一种可以被视作一个值的匿名函数。

``` js
;(function (a) {
    return a + 1
})

;(a) => a + 1
```

Lambda 通常作为参数被传递给高阶函数。

``` js
[1, 2].map((a) => a + 1)
```

可以把 Lambda 赋值给一个变量。

``` js
const add1 = (a) => a + 1
```

<div id="lambda-calculus"></div>

## Lambda演算 (Lambda Calculus)
数学的一个分支，使用函数创造 [通用计算模型](https://en.wikipedia.org/wiki/Lambda_calculus)

<div id="lazy-evaluation"></div>

## 惰性求值 (Lazy evaluation)
惰性求值是一种按需调用的求值机制，它将表达式的求值延迟到需要它的值为止，在函数式语言中，允许类似无限列表这样的结构存在，而这在非常重视命令顺序的命令式语言中通常是不可用的。

``` js
const rand = function* () {
  while (true) {
    yield Math.random()  
  } 
}

const randIter = rand()
randIter.next() // 每次执行产生一个随机值，表达式会在需要时求值。
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)

<div id="monoid"></div>

## 幺半群 (Monoid)
一个对象，它拥有一个函数，这个函数用来与另一个相同类型的对象"结合"。对象的类型（[半群](#semigroup)）必须具有一个"identity"值。

数值加法是一个简单的幺半群:

``` js
1 + 1   // 2
```

以上示例中，数是对象而 `+` 是函数。

当任何一个值与"identity"值结合时，结果一定是原始的值。"identity"也是可换位的（即排列次序不影响结果）。

加法的特征值是 0。

``` js
1 + 0   // 1
```

操作的组合不会影响结果（必须满足结合律）:

``` js
1 + (2 + 3) === (1 + 2) + 3 // true
```

数组的结合也是幺半群:

``` js
;[1, 2].concat([3, 4]) // [1, 2, 3, 4]
```

`identity` 值为空数组

``` js
;[1, 2].concat([])
```

减法作为一个反例，不形成幺半群，因为不存在可以换位的"identity"值。

``` js
0 - 4 === 4 - 0 // false
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monoid.js)

<div id="monad"></div>

## 单子 (Monad)
拥有 `of` 和 `chain` 函数的对象即为单子。`chain` 很像 `map`， 不同的是它可以展平嵌套数据。

``` js
Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}

// 使用
;Array.of('cat,dog', 'fish,bird').chain(s => s.split(',')) // ['cat', 'dog', 'fish', 'bird']

// 和 map 相比
;Array.of('cat,dog', 'fish,bird').map(s => s.split(',')) // [['cat', 'dog'], ['fish', 'bird']]
```

在有些函数式语言中，`of` 也称为 `return`，`chain` 也称为 `flatmap` 与 `bind`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monad.js)

<div id="comonad"></div>

## 余单子 (Comonad)
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

Extract 将值从函子中取出。

``` js
CoIdentity(1).extract() // 1
```

Extends 在余单子上运行一个函数。这个函数会返回和余单子相同的类型。

``` js
CoIdentity(1).extend(x => x.extract() + 1) // CoIdentity(2)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/comonad.js)

<div id="applicative-functor"></div>

## 应用函子 (Applicative Functor)
一个拥有 `ap` 函数的对象称为应用函子。`ap` 将对象中的函数应用于另一个同样类型的对象中的值。

``` js
// 实现
Array.prototype.ap = function (xs) {
    return this.reduce((acc, f) => acc.concat(xs.map(f)), [])
}

// 示例
;[(a) => a + 1].ap([1]) // [2]
```

如果你有两个对象，并需要对他们的元素执行一个二元函数，这将会很有用。

``` js
// 你想要组合的两个数组
const arg1 = [1, 3]
const arg2 = [4, 5]

// 组合函数 - 必须要柯里化
const add = (x) => (y) => x + y

const partiallyAppliedAdds = [add].ap(arg1) // [(y) => 1 + y, (y) => 3 + y]
```

由此得到了一个函数数组，并且可以调用 `ap` 函数得到结果。

``` js
partiallyAppliedAdds.ap(arg2) // [5, 6, 7, 8]
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/applicativeFunctor.js)

<div id="morphism"></div>

## 态射 (Morphism)
一个变形函数。

<div id="endomorphism"></div>

### Endomorphism (自同态)
输入输出是相同类型的函数。

``` js
// uppercase :: String -> String
const uppercase = (str) => str.toUpperCase()

// decrement :: Number -> Number
const decrement = (x) => x - 1
```

<div id="isomorphism"></div>

### Isomorphism (同构)
两个不用类型的对象之间的变换，保持结构并且不丢失数据。

例如，一个二维坐标既可以表示为数组 `[2, 3]`，也可以表示为对象 `{x: 2, y: 3}`。

``` js
// 提供函数在两种类型间互相转换
const pairToCoords = (pair) => ({x: pair[0], y: pair[1]})

const coordsToPair = (coords) => [coords.x, coords.y]

coordsToPair(pairToCoords([1, 2])) // [1, 2]

pairToCoords(coordsToPair({x: 1, y: 2})) // {x: 1, y: 2}
```

<div id="homomorphism"></div>

### Homomorphism (同态)
同态只是一个保持结构的映射，实际上，函子只是[范畴](#category)之间的同态，因为它在映射下保持了原范畴的结构。

``` js
A.of(f).ap(A.of(x)) == A.of(f(x))

Either.of(_.toUpper).ap(Either.of("oreos")) == Either.of(_.toUpper("oreos"))
```

<div id="catamorphism"></div>

### Catamorphism

一个 `reduceRight` 函数，它应用于累加器(accumulator)和数组中的每个值（从右到左），来将其缩减为一个单一的值。

<div id="anamorphism"></div>

### Anamorphism
一个 `unfold` 函数。`unfold` 是 `fold`（`ruduce`）的反面。它从一个值生成一个列表。

``` js
const unfold = (f, seed) => {
  function go(f, seed, acc) {
    const res = f(seed);
    return res ? go(f, res[1], acc.concat([res[0]])) : acc;
  }
  return go(f, seed, [])
}
```

``` js
const countDown = n => unfold((n) => {
  return n <= 0 ? undefined : [n, n - 1]
}, n)

countDown(5) // [5, 4, 3, 2, 1]
```

<div id="hylomorphism"></div>

### Hylomorphism
Anamorphism 和 catamorphism 的结合。

<div id="paramorphism"></div>

### Paramorphism
一类类似于 `reduceRight` 的函数，不过还是有区别的：

在Paramorphism中，reducer的参数是当前的值、所有先前的值的缩减(reduction，即reduce的结果)、以及形成该缩减的值的列表。

``` js
// 包含 undefined 对于列表来说显然是不安全的，
// 但是足以说明问题。
const para = (reducer, accumulator, elements) => {
  if (elements.length === 0)
    return accumulator

  const head = elements[0]
  const tail = elements.slice(1)

  return reducer(head, tail, para(reducer, accumulator, tail))
}

const suffixes = list => para(
  (x, xs, suffxs) => [xs, ... suffxs],
  [],
  list
)

suffixes([1, 2, 3, 4, 5]) // [[2, 3, 4, 5], [3, 4, 5], [4, 5], [5], []]
```

上面的例子中的 reducer（`[x, ... xs]`）的第三个参数有点像一个"如何达到你当前的 acc 值"的历史记录。

<div id="apomorphism"></div>

### Apomorphism
paramorphism 的反面。就像 anamorphism 是 catamorphism 的反面一样。对于 paramorphism，我们结合了对累加器的访问和已经累加的东西，而apomorphism让我们可以 unfold（展开）并且具有提早return的可能性。

<div id="setoid"></div>

## Setoid
拥有 `equals` 函数的对象。`equals` 可以用来和其它相同类型的对象比较。

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

## 可折叠性 (Foldable)
一个拥有 `reduce` 函数的对象具有可折叠性。`reduce` 可以把一种类型的对象转化为另一种类型。

``` js
const sum = (list) => list.reduce((acc, val) => acc + val, 0)
sum([1, 2, 3])        // 6
```

<div id="lens"></div>

## 透镜 (Lens)
Lens是一种结构（通常是一个对象或者函数），他为其他数据结构对 getter 和非可变的 setter 进行配对。

``` js
// 使用 [Ramda's lens](http://ramdajs.com/docs/#lens)
const nameLens = R.lens(
  // 一个对象的 name 属性的 getter
  (obj) => obj.name,
  // name 属性的 setter
  (val, obj) => Object.assign({}, obj, {name: val})
)
```

为给定的数据结构设置 `get` 和 `set` 可以实现一些关键特性。

``` js
const person = {name: 'Gertrude Blanch'}

// 调用 getter
R.view(nameLens, person) // 'Gertrude Blanch'

// 调用 setter
R.set(nameLens, 'Shafi Goldwasser', person) // {name: 'Shafi Goldwasser'}

// 将函数应用于结构中的值
R.over(nameLens, uppercase, person) // {name: 'GERTRUDE BLANCH'}
```

lens 也是可以组合的。这让我们可以对深度嵌套的数据进行简单的不可变更新。

``` js
// 这个 lens 关注一个非空数组中的第一个元素
const firstLens = R.lens(
  // 获取数组的第一个元素
  xs => xs[0],
  // 数组的第一个元素的非可变 setter
  (val, [__, ...xs]) => [val, ...xs]
)

const people = [{name: 'Gertrude Blanch'}, {name: 'Shafi Goldwasser'}]

// 无论你怎么想，lens 是从左到右合成的
R.over(compose(firstLens, nameLens), uppercase, people) // [{'name': 'GERTRUDE BLANCH'}, {'name': 'Shafi Goldwasser'}]
```

其他市县:

[partial.lenses](https://github.com/calmm-js/partial.lenses) - "好吃"的语法糖和很多强大功能

[nanoscope](http://www.kovach.me/nanoscope/) - 流畅接口

<div id="type-signatures"></div>

## 类型签名 (Type Signatures)
通常 js 中的函数会在注释中指出参数与返回值的类型。

在整个社区内存在很大的差异，但通常遵循以下模式：

``` js
// functionName :: firstArgType -> secondArgType -> returnType

// add :: Number -> Number -> Number
const add = (x) => (y) => x + y

// increment :: Number -> Number
const increment = (x) => x + 1
```

如果函数接受其他函数作为参数，那么这个函数需要用括号括起来。

``` js
// call :: (a -> b) -> a -> b
const call = (f) => (x) => f(x)
```

字符 `a`, `b`, `c`, `d` 表明参数可以是任意类型。以下版本的 `map` 的函数类型的参数 `f`，把一种类型 `a` 的数组转化为另一种类型 `b` 的数组。

``` js
// map :: (a -> b) -> [a] -> [b]
const map = (f) => (list) => list.map(f)
```

进一步阅读：

- [Ramda's type signatures](https://github.com/ramda/ramda/wiki/Type-Signatures)
- [What is Hindley-Milner?](https://stackoverflow.com/questions/399312/what-is-hindley-milner/399392#399392) on Stack Overflow

<div id="algebraic-data-type"></div>

## 代数数据类型 (Algebraic data type)
一种由其他类型组合而成的复合类型。两种常见的代数类型是[sum](#sum-type)和[product](#product-type)。

<div id="sum-type"></div>

### 和类型 (Sum type)
和类型是将两种类型组合成另一种类型。之所以称为和，是因为结果类型的可能的值的数目是两种输入类型的值的数目的和。

js 中没有这种类型，但是我们可以用 set 来假装：

``` js
// 想象这些不是 set，而是仅包含这些值的某种类型。
const bools = new Set([true, false])
const halfTrue = new Set(['half-true'])

// 这个 weakLogic 类型包含 bools 类型和 halfTrue 类型的和。
const weakLogicValues = new Set([...bools, ...halfTrue])
```

和类型有时也称作联合类型（union type）、区分联合（discriminated union）或标记联合（tagged unions）。

JS中有一些库可以帮助定义和使用联合类型。

流（flow）包括联合类型，而TypeScript具有提供相同能力的枚举（enum）。

<div id="product-type"></div>

### Product type
用一种你可能更熟悉的方式把数据类型联合起来:

``` js
// point :: (Number, Number) -> {x: Number, y: Number}
const point = (x, y) => ({x: x, y: y})
```

之所以称之为积，是因为数据结构的总的可能值是不同值的乘积。许多语言都有 tuple 类型，这是积类型的最简单形式。

另见 [Set theory](https://en.wikipedia.org/wiki/Set_theory)

<div id="option"></div>

## 可选类型 (Option)
Option 是一种联合类型，它有两种情况，`Some` 或者 `None`。

Option对于一些可能不会返回值的组合函数非常有用。

``` js
// 简单的定义
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

<div id="function"></div>

## Function
一个函数 `f :: A => B` 是一个表达式，通常称为 arrow 或者 lambda 表达式——只能有**一个**（这点是不可变的）的 `A` 类型参数和**一个** `B` 类型返回值。该返回值完全取决于参数，使函数独立于上下文，或者说[引用透明](#referential-transparency)。这里暗示的是一个函数不能产生任何隐藏的[副作用](#side-effects)——根据定义，函数总是[纯](#purity)的。这些属性使函数易于使用：它们是完全确定的，因此也是可以预测的。函数可以将代码作为数据进行处理，对行为进行抽象：

``` js
// times2 :: Number -> Number
const times2 = n => n * 2

[1, 2, 3].map(times2) // [2, 4, 6]
```

<div id="partial-function"></div>

## 偏函数 (Partial function)
偏函数是没有为全部参数定义的函数——它可能返回意料之外的结果或者永远不会终止。偏函数增加了认知开销，它们更难推理，并可能导致运行时错误。一些例子：

``` js
// 例1: 列表的和
// sum :: [Number] -> Number
const sum = arr => arr.reduce((a, b) => a + b)
sum([1, 2, 3]) // 6
sum([]) // TypeError: Reduce of empty array with no initial value

// 例2: 获取列表的第一个值
// first :: [A] -> A
const first = a => a[0]
first([42]) // 42
first([]) // undefined
// 甚至更糟: 
first([[42]])[0] // 42
first([])[0] // Uncaught TypeError: Cannot read property '0' of undefined

// 例3: 将函数重复 N 次
// times :: Number -> (Number -> Number) -> Number
const times = n => fn => n && (fn(n), times(n - 1)(fn))
times(3)(console.log)
// 3
// 2
// 1
times(-1)(console.log)
// RangeError: Maximum call stack size exceeded
```

### 处理偏函数
偏函数是危险的，它们需要被非常谨慎地对待。你可能会得到意料之外的（错误的）结果或遇到运行时错误。有时偏函数可能根本不会返回。意识到并相应地处理所有这些边缘情况可能会变得非常乏味。幸运的是，部分函数可以转换为常规函数。我们可以提供默认值或使用 guard 来处理偏函数未定义的输入。利用 option 类型，我们可以在可能会出现意外行为的地方使用 yield `Some(value)` 或 `None`: 

``` js
// 例1: 列表的和
// 我们可以提供默认值，使它总会返回结果
// sum :: [Number] -> Number
const sum = arr => arr.reduce((a, b) => a + b, 0)
sum([1, 2, 3]) // 6
sum([]) // 0

// 例2: 获取列表的第一个值
// 将结果改为 Option
// first :: [A] -> A
const first = a => a.length ? Some(a[0]) : None()
first([42]).map(a => console.log(a)) // 42
first([]).map(a => console.log(a)) // console.log 不会执行
//我们之前的糟糕情况
first([[42]]).map(a => console.log(a[0])) // 42
first([]).map(a => console.log(a[0])) // 不会执行，所以不会有 error
// 更重要的是，通过返回类型 (Option) ，我们会知道：
// 我们应该使用 .map 方法来访问数据，所以我们不会忘记检查输入，
// 因为这样的检查会被内建在函数中。

// 例3: 将函数重复 N 次
// 我们需要通过改变条件来确保函数总会终止: 
// times :: Number -> (Number -> Number) -> Number
const times = n => fn => n > 0 && (fn(n), times(n - 1)(fn))
times(3)(console.log)
// 3
// 2
// 1
times(-1)(console.log)
// 不会再执行
```

将偏函数改成全函数可以防止此类运行时错误。总是返回一个"值"也会使得代码更容易维护和推理。

<div id="functional-programing-libraries-in-javascript"></div>

## 在 js 中的函数式编程库

+ [mori](https://github.com/swannodette/mori)
+ [Immutable](https://github.com/facebook/immutable-js/)
+ [Immer](https://github.com/immerjs/immer)
+ [Ramda](https://github.com/ramda/ramda)
+ [ramda-adjunct](https://github.com/char0n/ramda-adjunct)
+ [Folktale](http://folktalejs.org)
+ [monet.js](https://cwmyers.github.io/monet.js/)
+ [lodash](https://github.com/lodash/lodash)
+ [Underscore.js](https://github.com/jashkenas/underscore)
+ [Lazy.js](https://github.com/dtao/lazy.js)
+ [maryamyriameliamurphies.js](https://github.com/sjsyrek/maryamyriameliamurphies.js)
+ [Haskell in ES6](https://github.com/casualjavascript/haskell-in-es6)
+ [Sanctuary](https://github.com/sanctuary-js/sanctuary)
+ [Crocks](https://github.com/evilsoft/crocks)
+ [Fluture](https://github.com/fluture-js/Fluture)
+ [fp-ts](https://github.com/gcanti/fp-ts)
