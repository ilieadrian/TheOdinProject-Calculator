let firstNumber = [];
let secondNumber = [];
let operator;
let clickedNumber;
let clickedOperator;
let firstToDisplay;
let secondToDisplay;
let storingInFirstNumber = true;
let result;
let randomCheck = false;
let operatorCount = 0;
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
        operatorCount++;
        updateDisplay();

        if(secondNumber.length !== 0 && operatorCount > 1) {
            operate(operator, firstToDisplay, secondToDisplay);
            randomCheck = true;
            updateDisplay();
        }
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
}

function operate(operator, a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    

    if (operator === "/") {
        result = divide(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else {
        result = add(a, b);
    }
    
    return result;
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
    currentValue.innerHTML = `${firstToDisplay || 0} ${operator || ''} ${secondToDisplay || ''}`;

    if (randomCheck){
        currentValue.innerHTML = `${result}`;
    }
    
}

updateDisplay();
