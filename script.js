const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const form = document.querySelector("form");

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
function showMessage(msg) {
  const textMsg = `<div class="alert alert-danger text-center" role="alert">${msg}</div>`;
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
    showMessage("Please Provide Necessary Input");
  }
  if(Number(price) !== Number(price)){
    isValid = false;
    showMessage('Please Provide Price in Number');
  }
  return isValid;
}
// reset Input
function resetInputs(){
  nameInputElm.value = '';
  priceInputElm.value = '';
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
  console.log(name, price);
}

form.addEventListener("submit", handelSubmitForm);
