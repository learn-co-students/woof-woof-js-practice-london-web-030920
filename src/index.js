document.addEventListener("DOMContentLoaded", function(){
   
const dogURL = "http://localhost:3000/pups"
const dogInfoDiv = document.querySelector("#dog-info")


function fetchDogs(){
     return fetch(dogURL)
    .then(response => response.json())
}

function renderDogs(){
    fetchDogs()
    .then(function(dogs){
        for (let i = 0; i < dogs.length; i++)
        renderDog(dogs[i])
    })
}

function renderDog(dog){
    const dogBarDiv = document.querySelector("#dog-bar")
    const span = document.createElement("span")
    span.innerText = dog.name
    span.addEventListener("click", function(e){
       spanClick(dog)
    })
    dogBarDiv.appendChild(span)
    
}


function spanClick(dog){
        dogInfoDiv.innerHTML = " "
        const dogImage = document.createElement("img")
        dogImage.src = dog.image
        const dogName = document.createElement("h2")
        dogName.innerText = dog.name
        const dogBtn = document.createElement("button")
        if (dog.isGoodDog === true) { dogBtn.innerText = "Good Dog!"}
        else {dogBtn.innerText = "Bad Dog!"}
        dogBtn.addEventListener("click", function(){
            if (dog.isGoodDog === true)
            {dogBtn.innerText = "Bad Dog!"}
            else {dogBtn.innerText = "Good Dog!"}
            changeButton(dog)
        })
        dogInfoDiv.append(dogImage, dogName, dogBtn)
}

function changeButton(dog){
        if (dog.isGoodDog === true)
        {dog.isGoodDog = false}
        else if (dog.isGoodDog === false)
        {dog.isGoodDog = true}
        const configObj = {method: "PATCH",
        headers: {"Content-Type": "application/json",
        accept: "application/json"},
        body: JSON.stringify(dog)
        }
     fetch(`${dogURL}/${dog.id}`, configObj)
        .then(function(response){
            return response.json()
        })
    }

renderDogs()
changeButton()
})