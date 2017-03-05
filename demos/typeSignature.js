// capitalize :: String -> String
const capitalize = (s) => toUpperCase(head(s)) + toLowerCase(tail(s))

// join :: String -> [String] -> String
const join = curry(function(what, xs) {
  return xs.join(what);
});


