const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result");
const screen = document.querySelector(".screen");
const history = document.querySelector(".history");
//Populate the grid
buttons.forEach((button) => (button.style.gridArea = button.classList[0]));

//By default left_value=0 and operator="+" because it's like we doing an addition with 0
let left_value = 0;
let right_value = 0;
let operator = "+";
let updatehistory = false;

function handleNumber(number) {
  right_value *= 10;
  right_value += parseInt(number);
  display(right_value);
}
function handleOperation(newOp) {
  //Infos for the history
  let operationstr = `${left_value} ${operator} ${right_value} = `;
  //We do the operations with the left and right values
  switch (operator) {
    case "+":
      left_value += right_value;
      break;
    case "-":
      left_value -= right_value;
      break;
    case "*":
      left_value *= right_value;
      break;
    case "/":
      left_value = Math.round((left_value / right_value) * 1000) / 1000;
      break;
  }
  operationstr += `${left_value}`;
  operator = newOp;
  //We display the new operator
  switch (operator) {
    case "+":
      display("+");
      break;
    case "-":
      display("-");
      break;
    case "*":
      display("*");
      break;
    case "/":
      display("/");
      break;
  }
  right_value = 0;

  //Update the history
  if (!updatehistory) {
    updatehistory = true;
  } else {
    let item = document.createElement("li");
    item.textContent = operationstr;
    history.appendChild(item);
  }
}
function handleResult() {
  handleOperation();
  display(left_value);
  //Like de beginning but allows you to resume the operation from the last result
  right_value = left_value;
  left_value = 0;
  operator = "+";
  updatehistory = false;
}
function handleAC() {
  right_value = 0;
  display(0);
}
function handleClear() {
  left_value = 0;
  right_value = 0;
  operator = "+";
  display(0);
  while (history.firstChild) {
    history.removeChild(history.lastChild);
  }
  updatehistory = false;
}

function display(char) {
  result.innerText = char;
  screen.classList.add("active");
  setTimeout(() => {
    screen.classList.remove("active");
  }, 50);
}

function handleKeyPressed(event) {
  console.log(event.key);
  switch (true) {
    case 0 <= parseInt(event.key) && parseInt(event.key) <= 9:
      handleNumber(event.key);
      break;
    case event.key == "+" ||
      event.key == "-" ||
      event.key == "*" ||
      event.key == "/":
      handleOperation(event.key);
      break;
    case event.key == "Enter":
      handleResult();
      break;
    case event.key == "Backspace":
      handleAC();
      break;
    case event.key == "Escape":
      handleClear();
      break;
  }
}

//Add event listeners
buttons.forEach((button) => {
  if (button.classList.contains("number")) {
    button.addEventListener("click", (e) => {
      handleNumber(e.target.innerText);
    });
  } else if (button.classList.contains("operation")) {
    button.addEventListener("click", (e) => {
      handleOperation(e.target.innerText);
    });
  } else if (button.classList.contains("equal")) {
    button.addEventListener("click", handleResult);
  } else if (button.classList.contains("ac")) {
    button.addEventListener("click", handleAC);
  } else if (button.classList.contains("clear")) {
    button.addEventListener("click", handleClear);
  }
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (!e.repeat) {
    handleKeyPressed(e);
  }
});
