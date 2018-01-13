const rewire = require("rewire");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("es6-promise").polyfill();
require("isomorphic-fetch");

const app = rewire("../../js/index.js");
// I get the functions which I need to test
test = app.__get__("test");
retrieveData = app.__get__("retrieveData");
getPersonalInfo = app.__get__("getPersonalInfo");
fetchUserData = app.__get__("fetchUserData");

// describe("Test search bar", function() {
//   it("should return true for each user found", function() {
//     const { document } = new JSDOM(
//       `<body>
//
//       <div class="wrapper">
//         <div class="container">
//           <div class="search">
//             <form class="search__form" onSubmit="retrieveData(event)">
//             <input class="search__input" ref="user" name="user" placeholder="Search username..."/>
//             <button type="submit" class="search__button">Search</button>
//           </form>
//           </div>
//           <div class="user">
//             <div class="user__noresult"></div>
//             <div class="user__container">
//               <div class="user__avatar"></div>
//               <div class="user__info">
//                 <div class="user__login"></div>
//                 <div class="user__fullName"></div>
//                 <div class="user__bio"></div>
//               </div>
//             </div>
//           </div>
//           <div class="repos">
//             <div class="repos__header"></div>
//             <div class="repos__list">
//             </div>
//           </div>
//         </div>
//       </div>
//       </body>`
//     ).window;
//     // return JSDOM.fromFile("./index.html", {}).then(dom => {
//     //   const html = dom.window;
//     //
//     //   return dom;
//     // });
//     console.log("doc", document);
//     const event = { target: [{ value: "pierroberto" }] };
//     expect(retrieveData(event)).toBe(true);
//   });
// });

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

describe("Retrieve the correct information for the user", () => {
  const event = { target: [{ value: "pierroberto" }] };
  it("should return a response", () => {
    return fetchUserData(event).then(response => {
      expect(typeof response.total_count).toEqual("number");
    });
  });
  it("should return one user", () => {
    return fetchUserData(event).then(response => {
      expect(response.total_count).toEqual(1);
    });
  });
  it("event object has to have a target.value", () => {
    // I check the first letter of the event.target.value
    expect(event.target[0].value[0]).not.toBe(undefined);
  });
});
