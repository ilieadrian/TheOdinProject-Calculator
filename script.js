// To do
// 1. Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.
// 2. Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

let firstNumber = '';
let secondNumber = '';
let operator = '';
let intermediateResult = ''; 
let isEnteringSecondNumber = false; 
let errorMessage;
let display = document.getElementById('uiDisplay');

function updateDisplay(error) {
    let displayText = '';

    if (intermediateResult) {
        let roundedResult = parseFloat(intermediateResult).toFixed(2);
        if(intermediateResult % 1 != 0) {
            displayText += roundedResult; console.log(displayText, "intermediateResult 1");
        } else {
            displayText += intermediateResult;
            // console.log(displayText, "intermediateResult 2");
        }
    } else {
        displayText += firstNumber || '0';
        // console.log(displayText, "else 2");
    }

    if (operator != "=" ) {
        displayText += `${operator}`;
        // console.log(displayText, "!=");
    }

    if (isEnteringSecondNumber) {
        displayText += `${secondNumber}`;
        // console.log(displayText, "isEnteringSecondNumber");
    }

    if(error) {
        displayText = `${error}`;
        // console.log(displayText);
        // display.innerHTML = `${displayText}`; // Display the error and return immediately
        // return;
    }
    // console.log(displayText, "outsite of if")
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
        console.log(b)
        errorMessage = "Nu se poate diviza la 0";
        updateDisplay(errorMessage);
        return null;
    }
    console.log(a, b)
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

function deleteFromNumber() {
    if (operator && isEnteringSecondNumber) {
        secondNumber = secondNumber.slice(0,-1);
    } else {
        firstNumber = firstNumber.slice(0,-1);
    };
    updateDisplay();
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    intermediateResult = ''; 
    isEnteringSecondNumber = false; 
    updateDisplay();
}

function handleKeyboardInput(event) {
    let pressedkey = event.key; 

    switch (pressedkey){
        case "Backspace":
            deleteFromNumber();
            break;
        case "Escape":
            clear()
            break;
        case "+":
            // 
            break;
            default:
            console.log(pressedkey) ;   
    }   

}

document.querySelectorAll('.number').forEach(function (button) {
    button.addEventListener('click', function () {
        if (operator && isEnteringSecondNumber) {
            if(button.innerText === '.' && secondNumber.includes('.')){
                return;
            }
            secondNumber += button.innerText;
        } else {
            if (button.innerText === '.' && firstNumber.includes('.')) {
                return;
            }
            firstNumber += button.innerText;
        }

        updateDisplay();
    });
});



document.querySelectorAll('.operator').forEach(function (button) {
    button.addEventListener('click', function () {
        if (firstNumber && secondNumber && operator) {
            operate();
        } 

        if(operator == "=" && firstNumber == '' && secondNumber == '') {
            return;
        }
        operator = button.innerText;
        isEnteringSecondNumber = true;
        updateDisplay();
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