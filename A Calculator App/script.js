 // Get elements 
const displayCurrent = document.querySelector('.current-operand');
const displayPrevious = document.querySelector('.previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const dotButton = document.querySelector('.dot');

let currentOperand = '';
let previousOperand = '';
let operation = null;

// Add event listeners to buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
      appendNumber(button.innerText);
      updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
      chooseOperation(button.innerText);
      updateDisplay();
  });
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', calculate);
dotButton.addEventListener('click', appendDot);

// Functions
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;  // Return if either value is NaN

  switch (operation) {
      case '+':
          result = prev + current;
          break;
      case '-':
          result = prev - current;
          break;
      case '*':
          result = prev * current;
          break;
      case '/':
          result = prev / current;
          break;
      case '%':
          result = prev * (current / 100);
          break;
      case '^':
          result = Math.pow(prev, current);
          break;
      case '√':
          result = Math.sqrt(current);
          break;
      default:
          return;
  }

  currentOperand = result.toString();  // Update the current operand with the result
  operation = undefined;  // Reset operation
  previousOperand = '';  // Clear the previous operand
  updateDisplay();  // Refresh the display with the new state
}

function appendDot() {
  if (currentOperand.includes('.')) return;  // Prevent multiple decimals
  if (currentOperand === '') currentOperand = '0';  // If empty, start with '0.'
  currentOperand += '.';
  updateDisplay();
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;  // Prevent multiple decimals
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
      calculate();  // If there's already a previous operand, perform the calculation first
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = '';  // Clear current operand for next input
}

function updateDisplay() {
  displayCurrent.innerText = currentOperand;  // Update the current operand display
  displayPrevious.innerText = previousOperand + ' ' + (operation || '');  // Update the previous operand with the operation
}
