function test() {
  return true;
}

const clearElement = elements => {
  elements.map(element => {
    // If the element exists then delete it
    const parent = document.getElementsByClassName(element)[0];
    if (parent) {
      while (parent.firstChild) {
        parent.firstChild.remove();
      }
    }
  });
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

const getRepos = login => {
  fetch(`https://api.github.com/users/${login}/repos`)
    .then(response => {
      return response.json();
    })
    .then(repos => {
      // I generate the header for the list of the repos
      const header = document.createElement("div");
      header.classList.add("repos__head");
      const headerText = document.createTextNode("Repositories");
      header.appendChild(headerText);
      document.getElementsByClassName("repos__header")[0].appendChild(header);
      repos.map(repo => {
        // I create a container for each repo
        const container = document.createElement("div");
        container.classList.add("repos__item");
        // I create a div for the repo's name
        const repoName = document.createElement("div");
        const repoText = document.createTextNode(repo.name);
        repoName.appendChild(repoText);
        repoName.classList.add("repos__name");
        // I create a container for the starts and the counter
        const containerStars = document.createElement("div");
        containerStars.classList.add("repos__containerStars");
        // I create the div which contains the number of stars
        const stars = document.createElement("div");
        const starsText = document.createTextNode(repo.stargazers_count);
        stars.classList.add("repos__counter");
        stars.appendChild(starsText);
        const starsPicture = document.createElement("img");
        starsPicture.classList.add("repos__icon");
        starsPicture.src = "assets/star.png";
        containerStars.appendChild(stars);
        containerStars.appendChild(starsPicture);
        // I append to the second container the star container
        const container2 = document.createElement("div");
        container2.appendChild(containerStars);
        // I create a container for the stars and forks
        container2.classList.add("repos__container");
        // I create a container for the forks and the counter
        const containerForks = document.createElement("div");
        containerForks.classList.add("repos__containerForks");
        // I create the container for the forks
        const forks = document.createElement("div");
        const forksText = document.createTextNode(repo.forks_count);
        forks.classList.add("repos__counter");
        forks.appendChild(forksText);
        const forksPicture = document.createElement("img");
        forksPicture.classList.add("repos__icon");
        forksPicture.src = "assets/fork.png";
        containerForks.appendChild(forks);
        containerForks.appendChild(forksPicture);
        container2.appendChild(containerForks);
        // I append the repo's name to the container
        container.appendChild(repoName);
        container.appendChild(container2);
        // I append the container to the document
        document
          .getElementsByClassName("repos__list")[0]
          .appendChild(container);
      });
    });
};

const retrieveData = e => {
  console.log("before prevent", e);
  if (e.preventDefault) e.preventDefault();
  clearElement([
    "user__login",
    "user__fullName",
    "user__bio",
    "user__avatar",
    "repos__header",
    "repos__list",
    "user__noresult"
  ]);
  console.log("targer", e, typeof e);
  fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // If nothing has been found I display the result
      if (!data.items.length) {
        let nothing = document.createElement("div");
        nothing.innerHTML = "Does not exist";
        nothing.classList.add("user__nothing");
        document
          .getElementsByClassName("user__noresult")[0]
          .appendChild(nothing);
        return false;
      } else if (data.items.length === 1) {
        console.log("personal", data.items[0].url);
        getPersonalInfo(data.items[0].url).then(personalInfo => {
          generateUser(data.items[0], personalInfo.bio, personalInfo.name);
        });
        getRepos(data.items[0].login);
        return true;
      } else {
        alert("More users has been found");
        return false;
      }
    });
};
