//function that creates new cards based on input from admin on admin page
function createCard(event) {
    //stored value from input fields
    var name = document.querySelector("#name").value 
    var description = document.querySelector("#description").value
    var price = document.querySelector("#price").value

    //created a div that will be the container for the card 
    var div = document.createElement("div")
    div.setAttribute("class", "card")
    //selected where the created div should be placed 
    var section = document.querySelector("section")
    section.appendChild(div)

    //created h1 that stores the input from name field and stored h1 in div
    var h1 = document.createElement("h1")
    h1.innerHTML = name
    div.appendChild(h1)

    //created p that stores the input from the price field and stored p in div
    var pPrice = document.createElement("p")
    pPrice.setAttribute("class", "price")
    pPrice.innerHTML = price
    div.appendChild(pPrice)

    //created p that stores the input from the description field and stored p in div
    var pDescription = document.createElement("p")
    pDescription.innerHTML = description
    div.appendChild(pDescription)

    //created p and button and stored p in div and button in p, added text to the button with innerHTML
    var pButton = document.createElement("p")
    var divButton = document.createElement("button")
    divButton.innerHTML = "Add to cart"
    div.appendChild(pButton)
    pButton.appendChild(divButton)
}

//selected already existing button on admin page and added eventlistener, when clicked the function above will run
var btn = document.querySelector("#button")
btn.addEventListener("click", createCard)