const { capitalize } = require("../tools/capitalize");

let string1 = "miguel";
let string2 = "miguel ángel";
let string3 = "victor roberto francisco";

test("write first letter capitalize", () => {
  expect(capitalize(string1)).toBe("Miguel");
  expect(capitalize(string2)).toBe("Miguel Ángel");
  expect(capitalize(string3)).toBe("Victor Roberto Francisco");
});
