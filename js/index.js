const clearElement = element => {
  // This is solution is slow, can be replaced with a while loop
  //  var myNode = document.getElementById("foo");
  //  while (myNode.firstChild) {
  //    myNode.removeChild(myNode.firstChild);
  //  }
  document.getElementsByClassName(element)[0].innerHTML = "";
};

const retrieveData = e => {
  e.preventDefault();
  clearElement("results");
  fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("data", data.items);
      // If nothing has been found I display the result
      if (!data.items.length) {
        let nothing = document.createElement("div");
        nothing.innerHTML = "Does not exist";
        nothing.classList.add("results__nothing");
        const x = document
          .getElementsByClassName("results")[0]
          .appendChild(nothing);
        return false;
      }
    });
};
