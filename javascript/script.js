"use strict";
const btns = document.querySelector("#buttons");
const result = document.querySelector("#result");
const calculator = document.querySelector("#calculator");
const navigation = document.querySelector("#navigation");
const scientificToggle = document.querySelector("#scientific-toggle");
const scientificPart = document.querySelector("#scientific");
var operatorPressed = false;
var operatorLastClicked = false;
var currentOperator;
var operand1;
var operand2;
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
const calculate = (operand, operator, result) => {
    switch (operator) {
        case "+":
            {
                operand = `${parseFloat(operand) + parseFloat(result)}`;
            }
            break;
        case "-":
            {
                operand = `${parseFloat(operand) - parseFloat(result)}`;
            }
            break;
        case "x":
            {
                operand = `${parseFloat(operand) * parseFloat(result)}`;
            }
            break;
        case "/":
            {
                operand = `${parseFloat(operand) / parseFloat(result)}`;
            }
            break;
    }
    return operand;
};
const moveCalculator = (event) => {
    event.preventDefault();
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
};
const toggleScientific = () => {
    scientificPart.classList.toggle("hidden");
};
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the calculator's new position:
    calculator.style.top = (calculator.offsetTop - pos2) + "px";
    calculator.style.left = (calculator.offsetLeft - pos1) + "px";
}
function closeDragElement() {
    // stop moving calculator when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}
btns === null || btns === void 0 ? void 0 : btns.addEventListener("click", (event) => {
    let btn = event.target;
    if (btn.classList.contains("numbers")) {
        if (operatorLastClicked) {
            operatorLastClicked = false;
            result.innerText = btn.innerText;
        }
        else if (result.innerText !== "0") {
            result.innerText = result.innerText.concat(btn.innerText);
        }
        else {
            result.innerText = btn.innerText;
        }
    }
    if (btn.classList.contains("operator")) {
        if (btn.innerText === "%" && result.innerText !== "0") {
            result.innerText = "" + (parseFloat(result.innerText) / 100);
            operand1 = parseFloat(result.innerText);
        }
        else if (!operatorPressed) {
            operand1 = parseFloat(result.innerText);
            operatorPressed = true;
            currentOperator = btn.innerText;
        }
        else {
            operand1 = parseFloat(calculate(`${operand1}`, currentOperator, result.innerText));
            result.innerText = "" + operand1;
            currentOperator = btn.innerText;
            operand1 = +result.innerText;
        }
        operatorLastClicked = true;
    }
    if (btn.classList.contains("equals")) {
        if (operatorPressed && !operatorLastClicked) {
            operand1 = parseFloat(calculate(`${operand1}`, currentOperator, result.innerText));
            result.innerText = "" + operand1;
        }
    }
    if (btn.classList.contains("clear")) {
        result.innerText = "0";
        operand1 = 0;
        operatorPressed = false;
        operatorLastClicked = false;
    }
    if (btn.classList.contains("negative")) {
        result.innerText = `${parseFloat(result.innerText) * (-1)}`;
    }
});
navigation === null || navigation === void 0 ? void 0 : navigation.addEventListener("mousedown", moveCalculator);
scientificToggle === null || scientificToggle === void 0 ? void 0 : scientificToggle.addEventListener("click", toggleScientific);
