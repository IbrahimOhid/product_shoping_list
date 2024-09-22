const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector('.nameInput');
const priceInputElm = document.querySelector('.priceInput');
const msgElm = document.querySelector('.msg');
const form = document.querySelector('form');


// receive input
function receiveInputs(){
  const name = nameInputElm.value;
  const price = priceInputElm.value;
  return {name, price};
}

// handel submit form
function handelSubmitForm(e){
  // prevent browser reloading
  e.preventDefault();
  // receive input
  const {name, price} = receiveInputs();
  console.log(name, price);
}

form.addEventListener('submit', handelSubmitForm);