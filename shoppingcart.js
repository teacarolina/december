///////////////
// Variables //
///////////////

const products = document.querySelector(".landingpage-section"),
  shoppingCartContent = document.querySelector(".cart-table tbody");

///////////////
// Listeners //
///////////////

loadEventListeners();

function loadEventListeners() {
  // when a new 'products' is added
  products.addEventListener("click", addProduct);

  // when the 'X' button is clicked from the shopping cart
  shoppingCartContent.addEventListener("click", removeProduct);

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
                <input class="cart-quantity-input" type="number" value="1">
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
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;
    productId = product.querySelector(".remove").getAttribute("data-id");
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
                <input class="cart-quantity-input" type="number" value="1">
                <button class="remove" data-id="${product.productId}">X</button>
            </td>
        </tr>
        `;
    shoppingCartContent.appendChild(row);
  });
}

btnCheckOut = document.querySelectorAll(".btn-clear-cart")[0];
btnCheckOut.addEventListener("click", checkoutClicked);

function checkoutClicked() {
  const quant = document.querySelector(".cart-quantity-input").value;
  const price = document.querySelector(".cart-price").innerHTML;
  const total = quant * price;
  alert(`Checkout completed. Total price: ${total} SEK`);

  // remove items on purchase
  //while (cartItems.hasChildNodes()) {
  //  cartItems.removeChild(cartItems.firstChild)
  //}
}
