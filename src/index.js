/////// DOM LOADED /////////
document.addEventListener("DOMContentLoaded", () => {
  ///// API STUFF

  const DOGS_URL = "http://localhost:3000/pups/";

  const apiHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  //get
  const get = (url) => {
    return fetch(url).then((resp) => resp.json());
  };

  // post
  const patch = (url, dog, goodBad) => {
    return fetch(DOGS_URL + dog.id, {
      method: "PATCH",
      headers: apiHeaders,
      body: JSON.stringify({ isGoodDog: goodBad }),
    }).then((response) => response.json());
  };

  const API = { get, patch };

  ///// CONSTANTS
  const dogBar = document.querySelector("#dog-bar");
  const dogSummary = document.querySelector("#dog-info");
  const dogFilter = document.querySelector("#good-dog-filter");

  ///// FUNCTIONS
  const getDogs = () => {
    API.get(DOGS_URL).then((dogs) => dogs.forEach((dog) => renderDog(dog)));
  };

  const getGoodDogs = () => {
    API.get(DOGS_URL).then((dogs) =>
    dogs.filter((dog) => dog.isGoodDog).forEach((dog) => renderDog(dog))
  );
  }

  const renderDog = (dog) => {
    const dogSpan = document.createElement("span");
    dogSpan.innerText = dog.name;

    dogBar.appendChild(dogSpan);

    dogSpan.addEventListener("click", () => {
      renderSummary(dog);
    });
  };

  const renderSummary = (dog) => {
    dogSummary.innerHTML = "";

    const dogImage = document.createElement("img");
    dogImage.src = dog.image;
    const dogName = document.createElement("h2");
    dogName.innerText = dog.name;
    const dogButton = document.createElement("button");

    function goodOrBad() {
      if (dog.isGoodDog) {
        return "Good dog!";
      } else {
        return "Bad dog!";
      }
    }

    dogButton.innerText = goodOrBad();

    dogButton.addEventListener("click", (e) => {
      toggleGoodBad(e, dog);
    });

    dogSummary.append(dogImage, dogName, dogButton);
  };

  const toggleGoodBad = (e, dog) => {
    if (e.target.innerText === "Good dog!") {
      API.patch(DOGS_URL, dog, false).then(
        () => (e.target.innerText = "Bad dog!")
      );
    } else {
      API.patch(DOGS_URL, dog, true).then(
        () => (e.target.innerText = "Good dog!")
      );
    }
  };

  dogFilter.addEventListener("click", (e) => {
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON";
      dogBar.innerHTML = "";
        getGoodDogs() 
    } else {
      e.target.innerText = "Filter good dogs: OFF";
      dogBar.innerHTML = "";
      getDogs();
    }
  });

  ///////// call function /////////
  getDogs();
});
