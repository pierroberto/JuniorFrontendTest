const rewire = require("rewire");

const app = rewire("../../js/index.js");
test = app.__get__("test");

describe("A suite is just a function", function() {
  it("and so is a spec", function() {
    expect(test()).toBe(true);
  });
});
