const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const addElements = () => {
  const event = { target: [{ value: "pierroberto" }] };
  return JSDOM.fromFile("./index.html", {}).then(dom => {
    return fetchUserData(event).then(userList => {
      return getPersonalInfo("https://api.github.com/users/pierroberto").then(
        userData => {
          const document = dom.window.document;
          const avatar = document.createElement("img");
          const login = document.createTextNode("@pierroberto");
          const username = document.createTextNode("pierroberto");
          const fullName = document.createTextNode("pier roberto");
          const biography = document.createTextNode("very long bio");
          avatar.src = "https://avatars1.githubusercontent.com/u/28726124?v=4";
          document
            .getElementsByClassName("user__avatar")[0]
            .appendChild(avatar);
          document.getElementsByClassName("user__login")[0].appendChild(login);
          document
            .getElementsByClassName("user__bio")[0]
            .appendChild(biography);
          document
            .getElementsByClassName("user__fullName")[0]
            .appendChild(fullName);
          return document;
        }
      );
    });
  });
};

const deleteElements = async elements => {
  const document = await addElements();
  elements.map(element => {
    const parent = document.getElementsByClassName(element)[0];
    if (parent) {
      while (parent.firstChild) {
        parent.firstChild.remove();
      }
    }
  });
  return document;
};
module.exports = { addElements, deleteElements };
