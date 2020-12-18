///////////////
// Variables //
///////////////

const products = document.querySelector(".landingpage-section"),
  shoppingCartContent = document.querySelector(".cart-table tbody");

///////////////
// Listeners //
///////////////

loadEventListeners();

updateView();

function loadEventListeners() {
  // when a new 'products' is added
  if (products) products.addEventListener("click", addProduct);

  // when the 'X' button is clicked from the shopping cart
  //if (shoppingCartContent)
  //  shoppingCartContent.addEventListener("click", removeProduct);

  // load from local storage
  document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
}

///////////////
// Functions //
///////////////

// for loadEventListeners()
function addProduct(e) {
  // to find the product that was added
  if (e.target.classList.contains("btn-add-to-cart")) {
    // read the product values (values from .card)
    const product = e.target.parentElement.parentElement;
    getProductInfo(product);
  }
}
// This is to read the information of the product via HTML
function getProductInfo(product) {
  ///// comment
  const productInfo = {
    productImage: product.querySelector(".product-image").src,
    productTitle: product.querySelector(".product-title").textContent,
    productPrice: product.querySelector(".product-price").textContent,
    quantity: 1,
    productId: product.querySelector(".product-id").getAttribute("data-id"),
  };
  // function to push 'productInfo' into the cart
  addToCart(productInfo);
}

// check to see if the product is already added > if not alert (1/2)
function addCartCheck(product) {
  let check = false;
  try {
    const datas = JSON.parse(localStorage.getItem("products"));
    if (datas.length == 0) return false;
    datas.filter((item, i) => {
      console.log("item", item.productTitle === product.productTitle);
      if (item.productTitle === product.productTitle) check = true;
    });
  } catch (error) {
    return false;
  }
  return check;
}

// creating a template for products in cart
function addToCart(product) {
  // create a <tr> from template
  const row = document.createElement("tr");

  // check to see if the product is already added > if not alert (2/2)
  if (addCartCheck(product)) {
    alert(`${product.productTitle} already added to cart.`);
    return false;
  }

  // the template for 'row'
  row.innerHTML = `
        <tr>
              <td>
          <img src="${product.productImage}" width=60>
      </td>
            <td>
                ${product.productTitle}
            </td>
            <td class="cart-price">${product.productPrice}</td>
            <td>
            <input class="cart-quantity-input" type="number" onkeyup="onQuantityChanged(this)" onchange="onQuantityChanged(this)" value="${product.quantity}">
                <button class="remove" onclick="removeProduct(this)" data-id="${product.productId}">X</button>
            </td>

        </tr>
    `;

  // add to the shopping cart
  shoppingCartContent.appendChild(row);

  //updateCartTotal(product.productPrice, 1);

  // add - localstorage for products added (1/4)
  saveToLocalStorage(product);
}

function onQuantityChanged(e) {
  var quant = parseInt(e.value);

  var productId = e.parentElement
    .querySelector(".remove")
    .getAttribute("data-id");
  if (quant) {
    editProductLocalStorage(productId, quant);
  } else {
    editProductLocalStorage(productId, 0);
  }
}

function updateView() {
  var productsInCart = getProductsFromStorage();
  var total = 0;
  var quantity = 0;

  const cart = document.querySelector(".cart-total"),
    quantSpan = document.querySelector(".cart-icon-quant");
    //EOCHT
    let totalPriceOnCartSite = document.querySelector(".cart-total-price");

  productsInCart.map(function (productInStorage, index) {
    var price = parseInt(productInStorage.productPrice);
    var itemQuantity = parseInt(productInStorage.quantity);
    total = total + price * itemQuantity;
  });

  var quant = parseInt(productsInCart.length);

  if (cart) {
    cart.innerHTML = `${total}`;
    
  }
  //TE
  if (totalPriceOnCartSite){
    totalPriceOnCartSite.innerHTML =  `${total}.00 SEK`;
  }
  if (quantSpan) {
    quantSpan.innerHTML = `${quantity}`;
  }
}

// save - localstorage for products added (2/4)
function saveToLocalStorage(product) {
  let products = getProductsFromStorage();

  // add products to the array
  products.push(product);

  // convert JSON into string since localStorage only saves strings
  localStorage.setItem("products", JSON.stringify(products));
  updateView();
}

// get - localstorage for products added (3/4)
function getProductsFromStorage() {
  let products;

  // get the value from the storage, if null, create an empty array
  if (localStorage.getItem("products") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }
  return products;
}

// // remove product from the cart
function removeProduct(e) {
  let removeButton, productId;
  removeButton = e;
  productId = e.parentElement.querySelector(".remove").getAttribute("data-id");

  // remove from the dom
  if (removeButton) {
    removeButton.parentElement.parentElement.remove();
  }

  // remove from the local storage
  removeProductLocalStorage(productId);
}

// function for removeProductLocalStorage > remove from the local storage
function removeProductLocalStorage(productId) {
  //get the local storage data 
  let productsInStorage = getProductsFromStorage();

  //loop through the array to find the index to remove
  productsInStorage.map(function (productInStorage, index) {
    if (productInStorage.productId === productId) {
      productsInStorage.splice(index, 1);
    }
  });

  // add the rest of the array
  localStorage.setItem("products", JSON.stringify(productsInStorage));
  updateView();
}

// function for editProductLocalStorage > edit from the local storage
function editProductLocalStorage(productId, quantity) {
  //get the local storage data
  let productsInStorage = getProductsFromStorage();
  let quantityNew = quantity;
  let productToEdit;

  //loop through the array to find the index to remove
  productsInStorage.map(function (productInStorage, index) {
    if (productInStorage.productId === productId) {
      productToEdit = productInStorage;
      productToEdit.quantity = quantityNew;
      productsInStorage.splice(index, 1);
    }
  });

  productsInStorage.push(productToEdit);
  // add the rest of the array
  localStorage.setItem("products", JSON.stringify(productsInStorage));
  updateView();
}

// loads products in the shopping cart from the local storage even after refreshing (4/4)
function loadFromLocalStorage() {
  let productsInStorage = getProductsFromStorage();

  // LOOP through the products inside local storage and show in the shopping cart
  productsInStorage.map(function (product) {
    // create the <tr> same as addToCart
    const row = document.createElement("tr");

    // pull the content
    row.innerHTML = `
        <tr>
            <td>
                <img src="${product.productImage}" width=60>
            </td>
            <td class="cart-title">${product.productTitle}</td>
                <td class="cart-price">${product.productPrice}</td>
                 <td>
                <input class="cart-quantity-input" type="number" onkeyup="onQuantityChanged(this)" onchange="onQuantityChanged(this)" value="${product.quantity}">
                <button class="remove" onclick="removeProduct(this)" data-id="${product.productId}">X</button>
            </td>
        </tr>
        `;
    shoppingCartContent.appendChild(row);
  });
}
///Här låg det


  // remove items on purchase
  //while (cartItems.hasChildNodes()) {
  //  cartItems.removeChild(cartItems.firstChild)
  //}

//tea emilia testarHÄÄÄÄÄÄR
// let cartRow = document.querySelector('.put-cart-info')

// if (cartRow){
//   btnCheckOut = document.querySelector(".btn-clear-cart");
//   btnCheckOut.addEventListener("click", checkoutClicked);
  
//   function checkoutClicked() {
//     const total = document.querySelector(".cart-total-price").innerHTML;
//     alert(`Checkout completed. Total price: ${total} SEK`);
//   }
//     }

function displayCart() {
  let cartItemsSide = JSON.parse(localStorage.getItem('products'));
  //cartItemsSide = JSON.parse(cartItemsSide); //konvertera till js obejcts från JSON
  console.log(cartItemsSide);
  let cartRow = document.querySelector('.put-cart-info')//om cart-row existerar på sidan kör denna kod
  //let cartCost = cartItemsSide.productPrice

  
  
  if (cartItemsSide && cartRow)//om vi har något på localstorage samt är på varukorgssidan
   {
      cartRow.innerHTML = '';
      Object.values(cartItemsSide).map(product => {  //lägger till en knapp när en vara dyker upp varukorgen
          cartRow.innerHTML += `
                <tr>
                      <td>
                  <img src="${product.productImage}" width=120>
              </td>
                    <td>
                        ${product.productTitle}
                    </td>
                    <td class="cart-price">${product.productPrice}</td>
                    <td>
                    <input class="cart-quantity-input" type="number" onkeyup="onQuantityChanged(this)" onchange="onQuantityChanged(this)" value="${product.quantity}">
                        <button class="remove" onclick="removeProduct(this)" data-id="${product.productId}">X</button>
                    </td>
        
                </tr>
            `;
        
         
      });
     
    }
  }

  displayCart()
  
  let cartRow = document.querySelector('.put-cart-info')

  if (cartRow) {

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#btn-checkout');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
  }


  //document.getElementsByClassName("cart-total-price")[0].innerText =
 // `${product.quantity * product.productPrice}` + " SEK"; 
/* 
 `
 <div class = "flex-cart-items">
 <div class="product"> 
 <ion-icon name="close-circle-outline"></ion-icon>
 <img src=itemitem>
 <span>${product.productTitle}</span>
 </div>
 <div class="price-of-item">${product.productPrice},00 SEK</div>
 <div class="quantity">
 
 <span>${product.quantity}</span>

 </div>

 <div class="total">${product.quantity * product.productPrice},00 SEK
 </div>
 </div>
 `; */

 // let cartRow = document.querySelector('.put-cart-info')

// if (cartRow){
//   btnCheckOut = document.querySelector(".btn-clear-cart");
//   btnCheckOut.addEventListener("click", checkoutClicked);
  
//   function checkoutClicked() {
//     const total = document.querySelector(".cart-total-price").innerHTML;
//     alert(`Checkout completed. Total price: ${total} SEK`);
//   }
//     }