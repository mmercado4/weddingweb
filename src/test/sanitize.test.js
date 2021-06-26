const { sanitizeString } = require("../tools/sanitize");

test("sanitize string removing coding chars", () => {
  expect(sanitizeString("Miguel +*Mercado")).toBe("Miguel Mercado");
  expect(sanitizeString("{Os queremos chicos}")).toBe("Os queremos chicos");
  expect(sanitizeString("Hay comida?")).toBe("Hay comida?");
});
