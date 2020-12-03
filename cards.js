function createCard(event) {
    event.preventDefault(); 

var name = document.querySelector("#name").value
var description = document.querySelector("#description").value
var price = document.querySelector("#price").value

var div = document.createElement("div")
var landingPage = document.querySelector(".landingpage-section")
landingPage.appendChild(div)
}

var btn = document.querySelector("#input--button")
btn.addEventListener("click", createCard)