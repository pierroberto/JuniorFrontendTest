require("es6-promise").polyfill();
require("isomorphic-fetch");
const rewire = require("rewire");
const app = rewire("../../js/index.js");
const dom = require("./dom.js");

// I get the functions which I need to test
retrieveData = app.__get__("retrieveData");
getPersonalInfo = app.__get__("getPersonalInfo");
fetchUserData = app.__get__("fetchUserData");
getRepos = app.__get__("getRepos");

// describe("Retrieve personal information", () => {
//   const validUrl = "https://api.github.com/users/pierroberto";
//   const invalidUrl = "https://api.github.com/";
//   it("Should return an object", () => {
//     return getPersonalInfo(validUrl).then(response => {
//       expect(typeof response).toEqual("object");
//     });
//   });
//   it("should have a biography and name", () => {
//     return getPersonalInfo(validUrl).then(response => {
//       expect(typeof response.bio).toEqual("string");
//       expect(typeof response.name).toEqual("string");
//     });
//   });
//   it("should return bio and name undefined if url is not valid", () => {
//     return getPersonalInfo(invalidUrl).then(response => {
//       expect(response.bio).toBe(undefined);
//       expect(response.name).toBe(undefined);
//     });
//   });
// });
//
// describe("Retrieve the correct information for the user", () => {
//   const event = { target: [{ value: "pierroberto" }] };
//   it("should return a response", () => {
//     return fetchUserData(event).then(response => {
//       expect(typeof response.total_count).toEqual("number");
//     });
//   });
//   it("should return one user", () => {
//     return fetchUserData(event).then(response => {
//       expect(response.total_count).toEqual(1);
//     });
//   });
//   it("event object has to have a target.value", () => {
//     // I check the first letter of the event.target.value
//     expect(event.target[0].value[0]).not.toBe(undefined);
//   });
// });

describe("Retrieve the repositories of the user", () => {
  const validLogin = "pierroberto";
  it("should return an array", async () => {
    const response = await getRepos(validLogin);
    expect(Array.isArray(await getRepos(validLogin))).toBe(true);
  });
  it("should have a string as argument", () => {
    expect(typeof validLogin).toEqual("string");
  });
  it("should contain one or more repositories", async () => {
    const response = await getRepos(validLogin);
    expect(response.length).not.toBeLessThan(1);
  });
});

// describe("Add elements to the DOM", () => {
//   it("Should add nodes to the parent", async () => {
//     const document = await dom.addElements();
//     expect(document.querySelector(".user__avatar")).not.toBe(null);
//     expect(document.querySelector(".user__login")).not.toBe(null);
//     expect(document.querySelector(".user__bio")).not.toBe(null);
//     expect(document.querySelector(".user__fullName")).not.toBe(null);
//   });
//   it("Should delete node from the parent", async () => {
//     const toBeDeleted = [
//       "user__login",
//       "user__fullName",
//       "user__bio",
//       "user__avatar"
//     ];
//     const document = await dom.deleteElements(toBeDeleted);
//     expect(document.querySelector(".user__avatar").firstChild).toBe(null);
//     expect(document.querySelector(".user__login").firstChild).toBe(null);
//     expect(document.querySelector(".user__bio").firstChild).toBe(null);
//     expect(document.querySelector(".user__fullName").firstChild).toBe(null);
//   });
// });
