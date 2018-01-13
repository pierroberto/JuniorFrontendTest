const rewire = require("rewire");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const app = rewire("../../js/index.js");
test = app.__get__("test");
retrieveData = app.__get__("retrieveData");
getPersonalInfo = app.__get__("getPersonalInfo");

describe("Test search bar", function() {
  it("should return true for each user found", function() {
    return JSDOM.fromFile("./index.html", {}).then(dom => {
      return dom;
    });
    const index = fs.readFileSync("./index.html", "utf-8");
    const event = { target: [{ value: "pierroberto" }] };
    //expect(retrieveData(event)).toBe(true);
  });
});

describe("Retrieve personal information", () => {
  const validUrl = "https://api.github.com/users/pierroberto";
  const invalidUrl = "https://api.github.com/";
  it("Should return an object", () => {
    return getPersonalInfo(validUrl).then(response => {
      expect(typeof response).toEqual("object");
    });
  });
  it("should have a biography and name", () => {
    return getPersonalInfo(validUrl).then(response => {
      expect(typeof response.bio).toEqual("string");
      expect(typeof response.name).toEqual("string");
    });
  });
  it("should return bio and name undefined if url is not valid", () => {
    return getPersonalInfo(invalidUrl).then(response => {
      expect(response.bio).toBe(undefined);
      expect(response.name).toBe(undefined);
    });
  });
});
