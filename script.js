let firstNumber = '';
let secondNumber = '';
let operator = '';
let intermediateResult = ''; 
let isEnteringSecondNumber = false; 
let display = document.getElementById('uiDisplay');
let bottomDisplay = document.getElementById('bottomValue')

function updateDisplay() {
    let displayText = '';

    if (intermediateResult) {
        let roundedResult = parseFloat(intermediateResult).toFixed(2);
        displayText += roundedResult;
    } else {
        displayText += firstNumber || '0';
    }

    if (operator != "=" ) {
        displayText += `${operator}`;
    }

    if (isEnteringSecondNumber) {
        displayText += `${secondNumber}`;
    }

    display.innerHTML = displayText;
}

function operate() {
    if (operator && secondNumber) {
        if (intermediateResult) {
            firstNumber = intermediateResult;
            intermediateResult = '';
        }
        intermediateResult = calculate(operator, firstNumber, secondNumber);
        secondNumber = '';
        operator = '';
        updateDisplay();
    }
}

function calculate(operator, a, b) {
    let num1 = +a;
    let num2 = +b;
    if (operator === "/") {
        return divide(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else {
        return add(num1, num2);
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

function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    intermediateResult = ''; 
    isEnteringSecondNumber = false; 
    updateDisplay();
}

document.querySelectorAll('.number').forEach(function (button) {
    button.addEventListener('click', function () {
        let decimalSelected = false;
        if (operator && isEnteringSecondNumber) {
            secondNumber += button.innerText;
        } else {
            firstNumber += button.innerText;
        }

        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(function (button) {
    button.addEventListener('click', function () {
        if (firstNumber && secondNumber) {
            operate();
        }
        operator = button.innerText;
        isEnteringSecondNumber = true;
        updateDisplay();
    });
});

document.getElementById('equals').addEventListener('click', function () {
    operate();
});

document.getElementById('clear').addEventListener('click', function () {
    clear();
});

updateDisplay();