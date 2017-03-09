const compose = (...f) => (a) => {
  const len = f.length
  let r = a
  for (let i = len - 1; i >= 0; i--)  {
    r = f[i](r)
  }
  return r
}

const r1 = compose(x => 3 * x, Number, val => val.toString(), Math.floor)
console.log(r1(12.22))   // '12'
