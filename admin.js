function save(){
    //new data input from admin 
    var name = document.querySelector("#product--name").value;
    var description = document.querySelector("#product--description").value
    var id = Math.random()

    var price = document.querySelector("#product--price").value;

    //storing an array in local storage
    if(localStorage.getItem("data") == null){
        localStorage.setItem("data", "[]");
    }

    //old data input pushed into array
    var old_data = JSON.parse(localStorage.getItem("data"));
    old_data.push({name, description, price, id});

    //storing the array with the old data as well
    localStorage.setItem("data", JSON.stringify(old_data)); 
}

function removeElement(id) {  
  
        var dataCopy = JSON.parse(localStorage.getItem("data"))
        var newData = dataCopy.filter(item => item.id !== id)
        localStorage.setItem("data",JSON.stringify (newData)); 
        view()
  
  }
  

function view() { 
    //choosing where the input should appear
    var homePage = document.querySelector(".landingpage-section")
    //if we have an item in local storage named data and it´s not empty and a section called homePage it should
    //be added to this section
    if(localStorage.getItem("data") != null && homePage){
        var test = JSON.parse(localStorage.getItem("data")) 
        //collecting the values stored in objects in array 
        Object.values(test).map(item => { 
        //choosing how they should appear on page
        homePage.innerHTML += `
        <section class="landingpage-section">
        <div class="card">  
        <h1>${item.name}</h1>
        <p class="price">${item.price}</p>
        <p>${item.description}</p>
        <p><button>Add to Cart</button></p>
        <button onclick="removeElement(${item.id})" class="admin-remove" type="button">REMOVE</button>
      </div>
     
    </section>
        `});   
    }
}