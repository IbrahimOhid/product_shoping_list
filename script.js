const filterEle = document.querySelector("#filter");
const productNameEle = document.querySelector("#productName");
const productPriceEle = document.querySelector("#productPrice");
const formEle = document.querySelector("form");
const msgEle = document.querySelector("#msg");
const addProductsEle = document.querySelector("#addProducts");

// product store
let products = [];
//addProduct
function addProduct(productName, productPrice) {
  const product = {
    id: products.length + 1,
    productName,
    productPrice,
  };
  products.push(product);
  return product;
}

// receiveInput
function receiveInput(e) {
  const productName = productNameEle.value;
  const productPrice = productPriceEle.value;
  return { productName, productPrice };
}
// clearMessage
function clearMessage() {
  msgEle.textContent = "";
}
//showMessage
function showMessage(msg, action = 'success') {
  const textMsg = `<div class="alert alert-${action}" role="alert">${msg}</div>`;
  msgEle.insertAdjacentHTML("afterbegin", textMsg);
  setTimeout(() => {
    clearMessage();
  }, 2000);
}
// inputValidation
function inputValidation(productName, productPrice) {
  let isValid = true;
  if (productName === "" || productPrice === "") {
    isValid = false;
    showMessage("Please Provide Necessary Input", 'danger');
  }
  if (Number(productPrice) !== Number(productPrice)) {
    isValid = false;
    showMessage("Please Provide Product Price in Number", 'danger');
  }
  return isValid;
}
// resetInput
function resetInput() {
  productNameEle.value = "";
  productPriceEle.value = "";
}
// showProductUi
function showProductUi(addProduct) {
  const {id, productName, productPrice} = addProduct;
  const productUi = `<div class="d-flex flex-row justify-content-between mb-3 align-items-center" style="background-color: aliceblue; padding: 8px 7px;" data-ProductId = ${id}>
    <div><span>${productName} -</span> <span>$${productPrice}</span></div>
  <div class="d-flex gap-3">
    <span style="cursor: pointer;"><i class="bi bi-pencil-square text-success editProduct"></i></span>
    <span style="cursor: pointer;"><i class="bi bi-trash3 text-danger deleteProduct"></i></span>
  </div>
</div>`;
  addProductsEle.insertAdjacentHTML('afterbegin', productUi);
  showMessage('Product Added Successfully');
}

// handelSubmitForm
function handelSubmitForm(e) {
  e.preventDefault();
  const { productName, productPrice } = receiveInput();
  const isValid = inputValidation(productName, productPrice);
  if (!isValid) return;
  resetInput();
  const product = addProduct(productName, productPrice);
  showProductUi(product);
}
// getProductId
function getProductId(e){
  const productId = e.target.parentElement.parentElement.parentElement;
  const id = +productId.getAttribute('data-productId');
  return id;
}
// removeItem
function removeItem(id){
  products = products.filter(product => product.id !== id)
}
//removeItemUi
function removeItemUi(id){
  document.querySelector(`[data-productId = '${id}']`).remove();
  showMessage('Product Deleted Successfully', 'warning');
}

// handleAddProducts
function handleAddProducts(e){
 if(e.target.classList.contains('deleteProduct')){
   const id =  getProductId(e);
   removeItem(id);
   removeItemUi(id)
 }
}

// form addEventlistener
formEle.addEventListener("submit", handelSubmitForm);
addProductsEle.addEventListener('click', handleAddProducts);
