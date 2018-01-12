const clearElement = element => {
  // This is solution is slow, can be replaced with a while loop
  //  var myNode = document.getElementById("foo");
  //  while (myNode.firstChild) {
  //    myNode.removeChild(myNode.firstChild);
  //  }
  document.getElementsByClassName(element)[0].innerHTML = "";
};

const generateUser = (item, bio, name) => {
  const avatar = document.createElement("img");
  const login = document.createTextNode(`@${item.login}`);
  const username = document.createTextNode(item.login);
  const fullName = document.createTextNode(name);
  const biography = document.createTextNode(bio);
  avatar.src = item.avatar_url;
  document.getElementsByClassName("user__avatar")[0].appendChild(avatar);
  document.getElementsByClassName("user__login")[0].appendChild(login);
  document.getElementsByClassName("user__bio")[0].appendChild(biography);
  document.getElementsByClassName("user__fullName")[0].appendChild(fullName);
};

const getPersonalInfo = url => {
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return {
        bio: data.bio,
        name: data.name
      };
    });
};

const retrieveData = e => {
  e.preventDefault();
  fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("data", data.items);
      // If nothing has been found I display the result
      if (!data.items.length) {
        clearElement("user");
        let nothing = document.createElement("div");
        nothing.innerHTML = "Does not exist";
        nothing.classList.add("user__nothing");
        document.getElementsByClassName("user")[0].appendChild(nothing);
        return false;
      } else if (data.items.length === 1) {
        getPersonalInfo(data.items[0].url).then(personalInfo => {
          generateUser(data.items[0], personalInfo.bio, personalInfo.name);
        });
      }
    });
};
