// To do
// Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
// Prevent large numbers to overflow display

let firstNumber = '';
let secondNumber = '';
let operator = '';
let intermediateResult = ''; 
let isEnteringSecondNumber = false; 
let errorMessage = null;
let display = document.getElementById('uiDisplay');

function updateDisplay() {
    let displayText = '';

    if (errorMessage) {
        isEnteringSecondNumber = false;
        displayText = errorMessage;
        if (operator) {
            return;
        }
    } else if (intermediateResult) {
        let roundedResult = parseFloat(intermediateResult).toFixed(2);
        if (intermediateResult % 1 !== 0) {
            displayText += roundedResult;
        } else {
            displayText += intermediateResult;
        }
    } else {
        displayText += firstNumber || '0';
    }

    if (operator !== "=") {
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
    if (b === 0) {
        errorMessage = "Cannot divide by 0"; 
        return null;
    } else {
        errorMessage = null; 
        return a / b;
    }
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

function handleNumberInput(number) {
    if (operator && isEnteringSecondNumber) {
        if (number === '.' && secondNumber.includes('.')) {
            return;
        }
        secondNumber += number;
        
    } else {
        if (number === '.' && firstNumber.includes('.')) {
            return;
        }
        firstNumber += number;
    }
    updateDisplay();
}

function handleOperatorInput(selectedOperator) {
    if (firstNumber && secondNumber && operator) {
        operate();
    }

    if (operator === "=" && firstNumber === '' && secondNumber === '') {
        return;
    }
    operator = selectedOperator;
    isEnteringSecondNumber = true;
    updateDisplay();
}

function handleKeyboardInput(event) {
    let pressedKey = event.key;

    if (pressedKey === "/") {
        event.preventDefault();
    }

    if (/[+\-*/]/.test(pressedKey)) {
        handleOperatorInput(pressedKey);
    } else if (pressedKey === "=" || pressedKey === "Enter") {
        operate();
    } else if (pressedKey === "Backspace") {
        deleteFromNumber();
    } else if (pressedKey === "Escape") {
        clear();
    } else if (/^[0-9.]$/.test(pressedKey)) {
        handleNumberInput(pressedKey);
    } else {
        return;
    }}

function deleteFromNumber() {
    if (operator && isEnteringSecondNumber) {
        secondNumber = secondNumber.slice(0,-1);
    } else {
        firstNumber = firstNumber.slice(0,-1);
    };
    errorMessage = null; 
    updateDisplay();
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    intermediateResult = ''; 
    isEnteringSecondNumber = false; 
    errorMessage = null; 
    updateDisplay();
}

document.querySelectorAll('.number').forEach(function (button) {
    button.addEventListener('click', function () {
        handleNumberInput(button.innerText);
    });
});

document.querySelectorAll('.operator').forEach(function (button) {
    button.addEventListener('click', function () {
        handleOperatorInput(button.innerText);
    });
});

document.getElementById('equals').addEventListener('click', function () {
    operate();
});

document.getElementById('delete').addEventListener('click', function () {
    deleteFromNumber();
});

document.getElementById('clear').addEventListener('click', function () {
    clear();
});

window.addEventListener('keydown', function (event) {
    handleKeyboardInput(event);
});

updateDisplay();