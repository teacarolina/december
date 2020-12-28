//functions below adds, edits and removes products to the website and collects pictures from api

//function to save urls from api
async function saveUrls() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=sneakers&orientation=landscape&client_id=hoi7Zos7S4lDzSm4l4MQ3P4apEmBUDWctKoocFTwnwY"
  );
  const dataUrls = await response.json();
  let pictureUrls = dataUrls.urls.small;
  //storing an array in local storage
  if (localStorage.getItem("urls") == null) {
    localStorage.setItem("urls", "[]");
  }
  //old data input pushed into array so no data is lost
  let old_urls = JSON.parse(localStorage.getItem("urls"));
  old_urls.push({ pictureUrls });

  //storing the array with the new and old data
  localStorage.setItem("urls", JSON.stringify(old_urls));
}

//function to save admin input in local storage
function save() {
  //new data input from admin
  let name = document.querySelector("#product--name").value;
  let description = document.querySelector("#product--description").value;
  let price = document.querySelector("#product--price").value;
  //to give each card a specific id (random number 0-1)
  let id = Math.random();
  let picture = JSON.parse(localStorage.getItem("urls")); 

  //storing an array in local storage
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }
  //old data input pushed into array so no data is lost
  let old_data = JSON.parse(localStorage.getItem("data"));
  old_data.push({ name, description, price, id, picture });

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
  let dataCopy = JSON.parse(localStorage.getItem("data"));
  //filter specific id and if its not this id we should keep information
  let newData = dataCopy.filter((item) => item.id !== id);
  //storing again in local storage without deleted id
  localStorage.setItem("data", JSON.stringify(newData));

  view();
}

//function to edit object in local storage
function editElement(id) {
  //prompt alert to add new values
  let newName = prompt("Please enter new name");
  let newDescription = prompt("Please enter new description");
  let newPrice = prompt("Please enter new price");
  //get localstorage where previous input is saved
  let editData = JSON.parse(localStorage.getItem("data"));
  
  //for loop checking id for specific object, choosing that object and replacing
  //with new input from prompt alert
  for (let i in editData) {
    if (editData[i].id === id) {
      editData[i].name = newName;
      editData[i].description = newDescription;
      editData[i].price = newPrice;
    }
  }
  //saving new data to localstorage, is outside the loop so we don't
  //define what edit data is every time the loop runs
  localStorage.setItem("data", JSON.stringify(editData));
  view();
}

//function that creates the cards
function view() {
  //choosing where the input should appear
  const adminPage = document.querySelector(".admin-index");
  const homePage = document.querySelector(".landingpage-section");
  //checking if we failed to retrive homePage, if it doesn't exist we exit the code
  if (homePage === null) {
    return;
  }
  //takes away previous products so they don't get added over and over again
  homePage.innerHTML = "";
  let dataProductInfo = localStorage.getItem("data");

  //check if dataproduct is null then we exit the function because something is wrong
  if (dataProductInfo == null) {
    return;
  }
  let getProductInfo = JSON.parse(localStorage.getItem("data"));
  
  //if we have an item in local storage named data and it´s not empty and a section called homePage/adminPage
  //exists it should be added to this section
  if (adminPage) {
    Object.values(getProductInfo).map((item, index) => {
      //choosing how they should appear on page
      homePage.innerHTML += `
        <div class="card">  
        <img class="product-image" src="${item.picture[index].pictureUrls}" style=with"100%">
        <h1>${item.name}</h1>
        <p class="price">${item.price}</p>
        <p>${item.description}</p>
        <p><button>Add to Cart</button></p>
        <button onclick="removeElement(${item.id})" class="admin-remove" type="button">REMOVE</button>
        <button onclick="editElement(${item.id})" class="admin-edit" type="button">EDIT</button>
      </div>
        `;
    });
  }
  //if first statement is false this will run if its true
  else {
    //collecting the values stored in objects in array
    Object.values(getProductInfo).map((item, index) => {
      //choosing how they should appear on page
      homePage.innerHTML += `
        <div class="card">  
        <img class="product-image" src="${item.picture[index].pictureUrls}" style=width"100%">
        <h1 class="product-title">${item.name}</h1>
        <p class="product-price">${item.price}</p>
        <p>${item.description}</p>
        <p><button class="btn-add-to-cart product-id" data-id="${item.id}">Add to Cart</button></p>
      </div>
        `;
    });
  }
}