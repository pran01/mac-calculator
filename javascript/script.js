"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
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
var scientific = false;
const factorial = (n) => {
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
};
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
    if (scientificPart.classList.contains("hidden"))
        scientific = true;
    else
        scientific = false;
    scientificPart.classList.toggle("hidden");
    localStorage.setItem('scientific', JSON.stringify(scientific));
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
    localStorage.setItem('top', calculator.style.top);
    localStorage.setItem('left', calculator.style.left);
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
(_a = document.querySelector("#square")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${parseFloat(result.innerText) * parseFloat(result.innerText)}`;
    }
});
(_b = document.querySelector("#squareroot")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.sqrt(parseFloat(result.innerText))}`;
    }
});
(_c = document.querySelector("#cuberoot")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.cbrt(parseFloat(result.innerText))}`;
    }
});
(_d = document.querySelector("#reciprocal")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${1 / parseFloat(result.innerText)}`;
    }
});
(_e = document.querySelector("#factorial")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${factorial(parseFloat(result.innerText))}`;
    }
});
(_f = document.querySelector("#poweroften")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.pow(10, parseFloat(result.innerText))}`;
    }
});
(_g = document.querySelector("#natural-log")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    result.innerText = `${Math.log(parseFloat(result.innerText))}`;
});
(_h = document.querySelector("#log10")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
    result.innerText = `${Math.log10(parseFloat(result.innerText))}`;
});
(_j = document.querySelector("#sin")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
    result.innerText = `${Math.sin(parseFloat(result.innerText))}`;
});
(_k = document.querySelector("#cos")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
    result.innerText = `${Math.cos(parseFloat(result.innerText))}`;
});
(_l = document.querySelector("#tan")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
    result.innerText = `${Math.tan(parseFloat(result.innerText))}`;
});
(_m = document.querySelector("#e")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
    result.innerText = `${Math.E}`;
});
(_o = document.querySelector("#sinh")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => {
    result.innerText = `${Math.sinh(parseFloat(result.innerText))}`;
});
(_p = document.querySelector("#cosh")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", () => {
    result.innerText = `${Math.cosh(parseFloat(result.innerText))}`;
});
(_q = document.querySelector("#tanh")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", () => {
    result.innerText = `${Math.tanh(parseFloat(result.innerText))}`;
});
(_r = document.querySelector("#pi")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", () => {
    result.innerText = `${Math.PI}`;
});
(_s = document.querySelector("#powerofe")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", () => {
    result.innerText = `${Math.pow(Math.E, parseFloat(result.innerText))}`;
});
window.onload = () => {
    if (localStorage.getItem('scientific'))
        scientific = JSON.parse(localStorage.getItem("scientific") || "false");
    else
        scientific = false;
    if (scientific)
        scientificPart.classList.remove("hidden");
    else
        scientificPart.classList.add("hidden");
    if (localStorage.getItem('top') && localStorage.getItem('left')) {
        calculator.style.top = localStorage.getItem('top') || "";
        calculator.style.left = localStorage.getItem('left') || "";
    }
};
