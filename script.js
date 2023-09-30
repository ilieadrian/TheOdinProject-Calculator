let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let storedOperator;
let storedSecondNumber;
let storedFirstNumber;

let upperDisplay = document.getElementById('upperValue');
let bottomDisplay = document.getElementById('bottomValue')

function updateDisplay() {
    bottomDisplay.innerHTML = `${firstNumber || 0} ${operator || ''} ${secondNumber || ''}`;
        
    if(result){
        upperDisplay.innerHTML = `${storedFirstNumber} ${storedOperator} ${storedSecondNumber}`;
        bottomDisplay.innerHTML = `${result}`;
    }

    if(result.length > 0 && operator.length < 0 && secondNumber.length < 0 ) {
        console.log(bau);
    }
}


function operate(){
    if (operator && secondNumber) {
        storedFirstNumber = firstNumber;
        storedOperator = operator;
        storedSecondNumber = secondNumber;
        firstNumber = calculate(operator, firstNumber, secondNumber);
        secondNumber = '';
        operator = '';
        result = firstNumber;
        updateDisplay();
    }
}

function calculate(operator, a, b){
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

function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    updateDisplay();
}

document.querySelectorAll('.number').forEach(function (button) {
    button.addEventListener('click', function () {
        if (operator) {
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
        updateDisplay();
    });
});

document.getElementById('equals').addEventListener('click', function () {
    operate();
});

document.getElementById('clear').addEventListener('click', function () {
    clear();
});

updateDisplay()