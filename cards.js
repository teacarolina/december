function test(event) {
    var name = document.querySelector("#name").value 
    var description = document.querySelector("#description").value
    var price = document.querySelector("#price").value

    var div = document.createElement("div")
    div.setAttribute("class", "card")
    var section = document.querySelector("section")
    section.appendChild(div)

    var h1 = document.createElement("h1")
    h1.innerHTML = name
    div.appendChild(h1)

    var pPrice = document.createElement("p")
    pPrice.setAttribute("class", "price")
    pPrice.innerHTML = price
    div.appendChild(pPrice)

    var pDescription = document.createElement("p")
    pDescription.innerHTML = description
    div.appendChild(pDescription)

    var pButton = document.createElement("p")
    var divButton = document.createElement("button")
    divButton.innerHTML = "Add to cart"
    div.appendChild(pButton)
    pButton.appendChild(divButton)
}

var btn = document.querySelector("#button")
btn.addEventListener("click", test)