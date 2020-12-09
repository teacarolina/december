function save(){
    //new data
    var name = document.querySelector("#product--name").value;
    var description = document.querySelector("#product--description").value
    var id = Math.random()


    if(localStorage.getItem("data") == null){
        localStorage.setItem("data", "[]");
    }

    //old data
    var old_data = JSON.parse(localStorage.getItem("data"));
    old_data.push({name, description, id});

    localStorage.setItem("data", JSON.stringify(old_data)); 
}

function removeElement(id) {  
  
        var dataCopy = JSON.parse(localStorage.getItem("data"))
        var newData = dataCopy.filter(item => item.id !== id)
        localStorage.setItem("data",JSON.stringify (newData)); 
        view()
  
  }
  

function view() { 
    var homePage = document.querySelector(".landingpage-section")
    if(localStorage.getItem("data") != null && homePage){
        var test = JSON.parse(localStorage.getItem("data")) 
        homePage.innerHTML = "";
        Object.values(test).map(item => { 
        homePage.innerHTML += `
        <section class="landingpage-section">
        <div class="card">
        <h1>${item.name}</h1>
        <p class="price">199 SEK</p>
        <p>${item.description}</p>
        <p><button>Add to Cart</button></p>
        <button onclick="removeElement(${item.id})" class="admin-remove" type="button">REMOVE</button>
      </div>
     
    </section>
        `});   
    }
}