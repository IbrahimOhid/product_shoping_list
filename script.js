const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const form = document.querySelector("form");
const collectionElm =  document.querySelector('.collection');

// data store memory
let products = [];

// add product data store
function addProduct(name, price){
  const product = {
    id : products.length + 1,
    name,
    price
  }
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
function clearMsg(){
  msgElm.textContent = '';
}
// showMessage
function showMessage(msg, action = 'success') {
  const textMsg = `<div class="alert alert-${action} text-center" role="alert">${msg}</div>`;
  msgElm.insertAdjacentHTML('afterbegin', textMsg);
  setTimeout(()=>{
    clearMsg();
  }, 2000);
}
// validation Check
function validationInputs(name, price) {
  let isValid = true;
  if (name === "" || price === "") {
    isValid = false;
    showMessage("Please Provide Necessary Input", 'danger');
  }
  if(Number(price) !== Number(price)){
    isValid = false;
    showMessage('Please Provide Price in Number', 'danger');
  }
  return isValid;
}
// reset Input
function resetInputs(){
  nameInputElm.value = '';
  priceInputElm.value = '';
}
// show product ui
function showProductUi(productInfo){
  const {id, name, price} = productInfo;
  const elm = `<li
              class="list-group-item collection-item d-flex flex-row justify-content-between mb-2" data-productId = ${id}
            >
              <div class="product-info">
                <strong>${name}</strong>- <span class="price">$${price}</span>
              </div>
              <div class="action-btn">
                <i style='cursor: pointer' class="bi bi-pencil-square me-2 text-success"></i>
                <i style='cursor: pointer' class="bi bi-trash3 text-danger"></i>
              </div>
            </li>`
            collectionElm.insertAdjacentHTML('afterbegin', elm);
            showMessage('Product Added Successfully');
}

// handel submit form
function handelSubmitForm(e) {
  // prevent browser reloading
  e.preventDefault();
  // receive input
  const { name, price } = receiveInputs();
  // validation check
  const isValid = validationInputs(name, price);
  if(!isValid) return;
  // resetInput
  resetInputs();
 const product = addProduct(name, price);
 showProductUi(product);
  console.log(name, price);
}

form.addEventListener("submit", handelSubmitForm);
