const errorElement = document.querySelector('.error');
const positionInput = document.querySelector('input');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const button = document.querySelector("button");
button.addEventListener("click", ()=>{
  let inputContent=positionInput.value;
  let inputNumber=+inputContent;
  let stringFrom = from.textContent;
  let stringTo = to.textContent;
   let fromArray = stringFrom.split("\n");
  let toArray = stringTo.split("\n");
  if (inputNumber<0){
    errorElement.textContent="Invalid position in destination!"
  } else if (inputContent.length===0){
    errorElement.textContent="Please enter a position!"
  } else if(inputNumber>toArray.length){
    errorElement.textContent="Invalid position in destination!"
  }
  else {
  let lastFromSong=fromArray[fromArray.length-1];
  fromArray.pop();
  toArray.splice(inputContent, 0, lastFromSong);
  let newFrom = fromArray.join("\n");
  let newTo = toArray.join("\n");
  to.textContent=newTo;
  from.textContent=newFrom;
  }
})