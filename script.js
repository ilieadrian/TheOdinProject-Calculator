let firstNumber;
let secondNumber;
let operator;

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