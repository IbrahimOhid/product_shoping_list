const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const form = document.querySelector("form");
const collectionElm = document.querySelector(".collection");

// data store memory
let products = localStorage.getItem("storeProducts")
  ? JSON.parse(localStorage.getItem("storeProducts"))
  : [];

// add product data store
function addProduct(name, price) {
  const product = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(product);
  return product;
}

// receive input
function receiveInputs() {
  const name = nameInputElm.value;
  const price = priceInputElm.value;
  return { name, price };
}
// clearMsg
function clearMsg() {
  msgElm.textContent = "";
}
// showMessage
function showMessage(msg, action = "success") {
  const textMsg = `<div class="alert alert-${action} text-center" role="alert">${msg}</div>`;
  msgElm.insertAdjacentHTML("afterbegin", textMsg);
  setTimeout(() => {
    clearMsg();
  }, 2000);
}
// validation Check
function validationInputs(name, price) {
  let isValid = true;
  if (name === "" || price === "") {
    isValid = false;
    showMessage("Please Provide Necessary Input", "danger");
  }
  if (Number(price) !== Number(price)) {
    isValid = false;
    showMessage("Please Provide Price in Number", "danger");
  }
  return isValid;
}
// reset Input
function resetInputs() {
  nameInputElm.value = "";
  priceInputElm.value = "";
}
// show product ui
function showProductUi(productInfo) {
  const notFoundMsg = document.querySelector('.not-found-product');
  if(notFoundMsg){
    notFoundMsg.remove();
  }
  const { id, name, price } = productInfo;
  const elm = `<li
              class="list-group-item collection-item d-flex flex-row justify-content-between mb-2" data-productId = ${id}
            >
              <div class="product-info">
                <strong>${name}</strong>- <span class="price">$${price}</span>
              </div>
              <div class="action-btn">
                <i style='cursor: pointer' class="bi bi-pencil-square me-2 text-success editProduct"></i>
                <i style='cursor: pointer' class="bi bi-trash3 text-danger deleteProduct"></i>
              </div>
            </li>`;
  collectionElm.insertAdjacentHTML("afterbegin", elm);
  showMessage("Product Added Successfully");
}

// handel submit form
function handelSubmitForm(e) {
  // prevent browser reloading
  e.preventDefault();
  // receive input
  const { name, price } = receiveInputs();
  // validation check
  const isValid = validationInputs(name, price);
  if (!isValid) return;
  // resetInput
  resetInputs();
  const product = addProduct(name, price);
  // add product data store
  addProductToStore(product);
  showProductUi(product);
}
// get product id
function getProductId(e) {
  const liElm = e.target.parentElement.parentElement;
  const id = Number(liElm.getAttribute("data-productId"));
  return id;
}
// get product
function removeItem(id) {
  products = products.filter((product) => product.id !== id);
}
// remove id
function removeItemFromUi(id) {
  document.querySelector(`[data-productId = "${id}"]`).remove();
  showMessage("Product Remove Successfully", "warning");
}

// handelManipulateProduct
function handelManipulateProduct(e) {
  if (e.target.classList.contains("deleteProduct")) {
    // get product id
    const id = getProductId(e);
    removeItem(id);
    removeItemFromUi(id);
    // remove product from store
    removeProductFromStore(id);
  }
}

// local storage to data show 💛🧡💛

// add Product To Store
function addProductToStore(product) {
  let products;
  if (localStorage.getItem("storeProducts")) {
    products = JSON.parse(localStorage.getItem("storeProducts"));
    products.push(product);
  } else {
    products = [];
    products.push(product);
  }
  localStorage.setItem("storeProducts", JSON.stringify(products));
}

// show all products to ui local store
function showAllProductsToUi(products) {
  let liElms
  liElms =
    products.length === 0
      ? "<li class='list-group-item not-found-product'>No Products To Show</li>"
      : "";
      products.sort((a,b)=> b.id - a.id);
  products.forEach((product) => {
    const { id, name, price } = product;
    liElms += `<li
              class="list-group-item collection-item d-flex flex-row justify-content-between mb-2" data-productId = ${id}
            >
              <div class="product-info">
                <strong>${name}</strong>- <span class="price">$${price}</span>
              </div>
              <div class="action-btn">
                <i style='cursor: pointer' class="bi bi-pencil-square me-2 text-success editProduct"></i>
                <i style='cursor: pointer' class="bi bi-trash3 text-danger deleteProduct"></i>
              </div>
            </li>`;
  });
  collectionElm.insertAdjacentHTML("afterbegin", liElms);
}

// remove product from store
function removeProductFromStore(id){
  let products;
  products = JSON.parse(localStorage.getItem('storeProducts'));
  products = products.filter((product)=> product.id !== id);
  localStorage.setItem('storeProducts', JSON.stringify(products));
}

form.addEventListener("submit", handelSubmitForm);
collectionElm.addEventListener("click", handelManipulateProduct);
document.addEventListener("DOMContentLoaded", () =>
  showAllProductsToUi(products)
);
