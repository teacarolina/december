//window.addEventListener("load", () => {
    function createCard() {
    var name = localStorage.getItem("nameValue")
    var description = localStorage.getItem("descriptionValue")
    var price = localStorage.getItem("priceValue")

    //created a div that will be the container for the card 
    var div = document.createElement("div")
    div.setAttribute("class", "card")
    //selected where the created div should be placed 
    var section = document.querySelector(".landingpage-section")
    section.appendChild(div)

    //created h1 that stores the input from name field and stored h1 in div
    var h1 = document.createElement("h1")
    h1.innerHTML = name
    div.appendChild(h1)

     //created p that stores the input from the description field and stored p in div
    var pDescription = document.createElement("p")
    pDescription.innerHTML = description
    div.appendChild(pDescription)

     //created p that stores the input from the price field and stored p in div
    var pPrice = document.createElement("p")
    pPrice.setAttribute("class", "price")
    pPrice.innerHTML = price
    div.appendChild(pPrice)

    //created p and button and stored p in div and button in p, added text to the button with innerHTML
    var pButton = document.createElement("p")
    var divButton = document.createElement("button")
    divButton.innerHTML = "Add to cart"
    div.appendChild(pButton)
    pButton.appendChild(divButton)
    }//)

    var button = document.querySelector("#tryButton")
    button.addEventListener("click", createCard)