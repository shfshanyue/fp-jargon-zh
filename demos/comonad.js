const CoIdentity = (v) => ({
  val: v,
  extract () {
    return this.val  
  },
  extend (f) {
    return CoIdentity(f(this))  
  }
})

const a = CoIdentity(1).extract()
const b = CoIdentity(1).extend(x => x.extract() + 1)

console.log(a, b)
