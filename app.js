const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

let currentInput = "";
let previousInput = "";
let operator = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    return b !== 0 ? a / b : NaN;
  } else {
    return NaN;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (button.classList.contains("operator")) {
      if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay("");
      } else {
        if (currentInput && operator) {
          previousInput = calculate(previousInput, currentInput, operator);
        } else if (!previousInput) {
          previousInput = currentInput;
        }
        operator = value;
        currentInput = "";
        updateDisplay(previousInput);
      }
    } else if (button.classList.contains("equals")) {
      if (currentInput && previousInput && operator) {
        currentInput = calculate(previousInput, currentInput, operator);
        previousInput = "";
        operator = "";
        updateDisplay(currentInput);
      }
    }
  });
});
