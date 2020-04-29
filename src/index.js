document.addEventListener("DOMContentLoaded", function(){
// constants
const BASE_URL = `http://localhost:3000`
const PUPS_URL = `${BASE_URL}/pups/`
const pupDivBar = document.querySelector('#dog-bar')
const pupInfoDiv = document.querySelector('#dog-info')
const goodBoyToggle = document.querySelector('#good-dog-filter')

const apiHeaders = {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
}

//APIS
const get = (url) => {
    return fetch(url).then(response => response.json())
}

// patch
const patch = (url, dog) => {
    debugger
    return fetch(url + dog.id, {
    method : "PATCH",
    headers: apiHeaders,
    body: JSON.stringify(dog),
}).then(response => response.json())
    }

const API = {get, patch}

//functions
const getPups = () => {
    API.get(PUPS_URL).then(pups => {
        pups.forEach(pup => renderPup(pup))
    })
}

const renderPup = (pup) => {
const pupSpan = document.createElement('span')
pupSpan.innerHTML = pup.name
pupDivBar.append(pupSpan)

pupSpan.addEventListener('mouseover', e => {
    goodOrBadDog(pup)
})

}

const goodOrBadDog = pup => {
    console.log("Working")
    pupInfoDiv.innerHTML = ""
    const pupImg = document.createElement('img')
    pupImg.src = pup.image
    const pupH2 = document.createElement('h2')
    pupH2.innerHTML = pup.name
    const pupButton = document.createElement('button')
    pupButton.innerText = goodDogBadDog(pup)

    pupButton.addEventListener('click', e => {
        changeGoodDogBadDog(pup, pupButton)
    })
 
    pupInfoDiv.append(pupImg, pupH2, pupButton)
    // append to dog info div
}

    // pup button inner HTML
const goodDogBadDog = (pup) => { 
    if (pup.isGoodDog === true){
        return "Good Dog!"
    }
    else {return "Bad Dog!"}
}

const changeGoodDogBadDog = (pup, pupButton) => {
    if (pupButton.innerHTML === "Good Dog!"){
        pup.isGoodDog = false
        API.patch(PUPS_URL, pup).then(pup => {
            console.log(pup)
            pupButton.innerText = goodDogBadDog(pup)
        })
}
    else {
        pup.isGoodDog = true
         API.patch(PUPS_URL, pup).then(pup => {
            console.log(pup)
            pupButton.innerText = goodDogBadDog(pup)
    })
    }
}

getPups()
})