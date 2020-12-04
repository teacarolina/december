function saveInput() {
    var name = document.querySelector("#name").value
    var description = document.querySelector("#description").value
    var price = document.querySelector("#price").value

    localStorage.setItem("nameValue", name)
    localStorage.setItem("descriptionValue", description)
    localStorage.setItem("priceValue", price)
} 

var btn = document.querySelector("#button")
btn.addEventListener("click", saveInput)