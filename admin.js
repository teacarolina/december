//function to save admin input in local storage
function save() {
  //new data input from admin
  var name = document.querySelector("#product--name").value;
  var description = document.querySelector("#product--description").value;
  var price = document.querySelector("#product--price").value;
  //to give each card a specific id (random number 0-1)
  var id = Math.random();

  //storing an array in local storage
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }
  //old data input pushed into array so no data is lost
  var old_data = JSON.parse(localStorage.getItem("data"));
  old_data.push({ name, description, price, id });

  //storing the array with the new and old data
  localStorage.setItem("data", JSON.stringify(old_data));

  formReset();
}

//function to reset input fields after pressing button submit
function formReset() {
  document.querySelector(".input--form").reset();
}

//function to remove object from localstorage
function removeElement(id) {
  //get localstorage objects, filter with id and deleting specific id
  var dataCopy = JSON.parse(localStorage.getItem("data"));
  //filter specific id and if its not this id we should keep information
  var newData = dataCopy.filter((item) => item.id !== id);
  //storing again in local storage without deleted id
  localStorage.setItem("data", JSON.stringify(newData));

  location.reload();
}

//function to edit object in local storage
function editElement(id) {
  //prompt alert to add new values
  var newName = prompt("Please enter new name");
  var newDescription = prompt("Please enter new description");
  var newPrice = prompt("Please enter new price");
  //get localstorage where previous input is saved
  var editData = JSON.parse(localStorage.getItem("data"));
  //for loop checking id for specific object, choosing that object and replacing
  //with new input from prompt alert
  for (var i in editData) {
    if (editData[i].id == id) {
      editData[i].name = newName;
      editData[i].description = newDescription;
      editData[i].price = newPrice;
      //saving new data to localstorage
      editData = localStorage.setItem("data", JSON.stringify(editData));
    }
  }
  location.reload();
}

//function that creates the cards
function view() {
  //choosing where the input should appear
  var adminPage = document.querySelector(".admin-index");
  var homePage = document.querySelector(".landingpage-section");
  //if we have an item in local storage named data and it´s not empty and a section called homePage/adminPage
  //exists it should be added to this section
  if (localStorage.getItem("data") != null && homePage && adminPage) {
    var test = JSON.parse(localStorage.getItem("data"));
    //collecting the values stored in objects in array
    Object.values(test).map((item) => {
      //choosing how they should appear on page
      homePage.innerHTML += `
        <section class="landingpage-section">
        <div class="card">  
        <img class="product-image" src="https://images.unsplash.com/photo-1521774971864-62e842046145?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80">
        <h1>${item.name}</h1>
        <p class="price">${item.price}</p>
        <p>${item.description}</p>
        <p><button>Add to Cart</button></p>
        <button onclick="removeElement(${item.id})" class="admin-remove" type="button">REMOVE</button>
        <button onclick="editElement(${item.id})" class="admin-edit" type="button">EDIT</button>
      </div>
     
    </section>
        `;
    });
  }
  //if first statement is false this will run if its true
  else if (localStorage.getItem("data") != null && homePage) {
    var test = JSON.parse(localStorage.getItem("data"));
    //collecting the values stored in objects in array
    Object.values(test).map((item) => {
      //choosing how they should appear on page
      homePage.innerHTML += `
        <section class="landingpage-section">
        <div class="card">  
        <img class="product-image" src="https://images.unsplash.com/photo-1521774971864-62e842046145?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80">
        <h1 class="product-title">${item.name}</h1>
        <p class="product-price">${item.price}</p>
        <p>${item.description}</p>
        <p><button class="btn-add-to-cart product-id" data-id="${item.id}">Add to Cart</button></p>
      </div>
     
    </section>
        `;
    });
  }
}
