///////////////
// Variables //
///////////////

const products = document.querySelector(".landingpage-section"),
  shoppingCartContent = document.querySelector(".cart-table tbody");
btnClearCart = document.querySelector(".btn-clear-cart");

///////////////
// Listeners //
///////////////

loadEventListeners();

function loadEventListeners() {
  // when a new 'products' is added
  products.addEventListener("click", addProduct);

  // when the 'X' button is clicked from the shopping cart
  shoppingCartContent.addEventListener("click", removeProduct);

  // clear cart button
  btnClearCart.addEventListener("click", clearCartClicked);

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
    productId: product.querySelector(".product-id").getAttribute("data-id")
  };
  // function to push 'productInfo' into the cart
  addToCart(productInfo);
}

// creating a template for products in cart
function addToCart(product) {
  // create a <tr> from template
  const row = document.createElement("tr");

  // the template for 'row'
  row.innerHTML = `
        <tr>
            <td>
                <img src="${product.productImage}" width=100>
            </td>
            <td>
                ${product.productTitle}
            </td>
            <td>
                ${product.productPrice}
            </td>
            <td>
                <button class="remove" data-id="${product.productId}">X</button>
            </td>

        </tr>
    `;
  // add to the shopping cart
  shoppingCartContent.appendChild(row);

  // add - localstorage for products added (1/4)
  saveToLocalStorage(product);
}

// save - localstorage for products added (2/4)
function saveToLocalStorage(product) {
  let products = getProductsFromStorage();

  // add products to the array
  products.push(product);

  // convert JSON into string since localStorage only saves strings
  localStorage.setItem("products", JSON.stringify(products));
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
    let product, productId;    

    // remove from the dom
  if (e.target.classList.contains("remove")); {
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;
    productId = product.querySelector(".remove").getAttribute("data-id");

  }
  console.log(productId);
  // remove from the local storage
}



// function for clear cart - remove all products from the cart
function clearCartClicked() {
  while(shoppingCartContent.firstChild) {
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);
  }
  
  // when clear cart clicked > remove from local storage as well (1/2)
  clearLocalStorage();
  
}

// when clear cart clicked > remove from local storage as well (2/2)
function clearLocalStorage() {
    localStorage.clear();
}

// loads products in the shopping cart from the local storage even after refreshing (4/4)
function loadFromLocalStorage() {
  let productsInStorage = getProductsFromStorage();

  // LOOP through the products inside local storage and show in the shopping cart
  productsInStorage.forEach(function (product) {
    // create the <tr> same as addToCart
    const row = document.createElement("tr");

    // pull the content
    row.innerHTML = `
        <tr>
            <td>
                <img src="${product.productImage}" width=100>
            </td>
                <td>
                    ${product.productTitle}
                </td>
                <td>
                    ${product.productPrice}
                </td>
            <td>
                <button class="remove" data-id="${product.productId}">X</button>
            </td>
        </tr>
        `;
        shoppingCartContent.appendChild(row);
  });
}
