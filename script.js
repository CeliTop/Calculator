const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result");
//Populate the grid
buttons.forEach((button) => (button.style.gridArea = button.classList[0]));

//By default left_value=0 and operator="+" because it's like we doing an addition with 0
let left_value = 0;
let right_value = 0;
let operator = "+";

function handleNumber() {
  right_value *= 10;
  right_value += parseInt(this.innerText);
  console.log(right_value);
  display(right_value);
}
function handleOperation() {}
function handleResult() {}
function handleAC() {}
function handleClear() {}

function display(number) {
  result.innerText = number;
}

//Add event listeners
buttons.forEach((button) => {
  if (button.classList.contains("number")) {
    button.addEventListener("click", handleNumber);
  } else if (button.classList.contains("operation")) {
    button.addEventListener("click", handleOperation);
  } else if (button.classList.contains("equal")) {
    button.addEventListener("click", handleResult);
  } else if (button.classList.contains("ac")) {
    button.addEventListener("click", handleAC);
  } else if (button.classList.contains("clear")) {
    button.addEventListener("click", handleClear);
  }
});
