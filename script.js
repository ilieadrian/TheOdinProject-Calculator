let firstNumber = [];
let secondNumber = [];
let operator;
let clickedNumber;
let clickedOperator;
let firstToDisplay;
let secondToDisplay;
let storingInFirstNumber = true;
let calculationValue = document.getElementById("calculationValue");
let currentValue = document.getElementById("currentValue");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");

numbers.forEach((element) => {
    element.addEventListener("click", getNumber);
});

function getNumber() {
    clickedNumber = event.target.textContent;
    computeNumbers()
}

operators.forEach((element) => {
    element.addEventListener("click", getOperator);
});

function getOperator(){
    operator = event.target.textContent;
    if (operator) {
        storingInFirstNumber = false;
    }
}

function computeNumbers() {
    if (storingInFirstNumber) {
        firstNumber.push(clickedNumber);
        updateDisplay(firstToDisplay = firstNumber.join("").toString());
    } else {
        secondNumber.push(clickedNumber);
        updateDisplay(secondToDisplay = secondNumber.join("").toString());
    }

    console.log(firstNumber, firstToDisplay)
}

function operate(operator, a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "/") {
        divide(a, b);
    } else if (operator === "*") {
        multiply(a, b);
    } else if (operator === "-") {
        subtract(a, b);
    } else {
        add(a, b);
    }
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function add(a, b) {
    return a + b;
}

function updateDisplay(){
    currentValue.innerHTML = `${firstToDisplay || 0} ${operator || ''}  ${secondToDisplay || ''}`;
    console.log(firstNumber, firstToDisplay)
}

updateDisplay();
