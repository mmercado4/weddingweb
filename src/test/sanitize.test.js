const { sanitizeString, sanitizeObject } = require("../tools/sanitize");

let obj1 = {
  name: "Miguel +Mercado",
  email: "migu{el.merca=>do@gmai<l.com",
};

test("sanitize string removing coding chars", () => {
  expect(sanitizeString("Miguel +*Mercado")).toBe("Miguel Mercado");
  expect(sanitizeString("{Os queremos chicos}")).toBe("Os queremos chicos");
  expect(sanitizeString("Hay comida?")).toBe("Hay comida?");
});

// test("sanitize object removing coding chars", () => {
//   let obj3 = sanitizeObject(obj1);
//   expect(obj3.name).toBe("Miguel Mercado");
//   expect(obj3.email).toBe("miguel.mercado@gmail.com");
// });
