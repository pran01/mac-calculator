const btns=document.querySelector("#buttons");
const result =document.querySelector("#result") as HTMLDivElement;
const calculator=document.querySelector("#calculator") as HTMLDivElement;
const navigation=document.querySelector("#navigation") as HTMLDivElement;
const scientificToggle=document.querySelector("#scientific-toggle") as HTMLButtonElement;
const scientificPart=document.querySelector("#scientific") as HTMLDivElement;

var operatorPressed:boolean=false;
var operatorLastClicked:boolean=false;
var currentOperator:string;
var operand1:number;
var operand2:number;
var pos1=0,pos2=0,pos3=0,pos4=0;
var scientific=false;

const factorial=(n:number):number=>{
    if(n==0)
    return 1;
    return n*factorial(n-1);
}

const calculate=(operand:string,operator:string,result:string):string=>{
    switch(operator){
        case "+":
            {operand=`${parseFloat(operand)+parseFloat(result)}`}
            break;
            case "-":
                {operand=`${parseFloat(operand)-parseFloat(result)}`}
                break;
                case "x":
            {operand=`${parseFloat(operand)*parseFloat(result)}`}
            break;
            case "/":
            {operand=`${parseFloat(operand)/parseFloat(result)}`}
            break;
    }
    return operand;
}

const moveCalculator=(event:any)=>{
    event.preventDefault();
    pos3=event.clientX;
    pos4=event.clientY;
    document.onmouseup=closeDragElement;
    document.onmousemove=elementDrag;
}

const toggleScientific=()=>{
    if(scientificPart.classList.contains("hidden"))
        scientific=true;
    else
        scientific=false;
    scientificPart.classList.toggle("hidden");
    localStorage.setItem('scientific',JSON.stringify(scientific));
}

function elementDrag(e:any) {
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
    localStorage.setItem('top',calculator.style.top);
    localStorage.setItem('left',calculator.style.left);
  }

  function closeDragElement() {
    // stop moving calculator when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

btns?.addEventListener("click",(event)=>{
    let btn=event.target as HTMLButtonElement;
    if(btn.classList.contains("numbers")){
        if(operatorLastClicked){
            operatorLastClicked=false;
            result.innerText=btn.innerText;
        }
        else if(result.innerText!=="0"){
            result.innerText=result.innerText.concat(btn.innerText);
        }
        else {
            result.innerText=btn.innerText;
        }
    }
    if(btn.classList.contains("operator")){
        if(btn.innerText==="%" && result.innerText!=="0"){
            result.innerText=""+(parseFloat(result.innerText)/100);
            operand1=parseFloat(result.innerText);
        }
        else if(!operatorPressed){
            operand1=parseFloat(result.innerText);
            operatorPressed=true;
        currentOperator=btn.innerText;
        }
        else{
            operand1=parseFloat(calculate(`${operand1}`,currentOperator,result.innerText));
            result.innerText=""+operand1;
            currentOperator=btn.innerText;
            operand1=+result.innerText;
        }
        operatorLastClicked=true;
    }
    if(btn.classList.contains("equals")){
        if(operatorPressed && !operatorLastClicked){
            operand1=parseFloat(calculate(`${operand1}`,currentOperator,result.innerText));
            result.innerText=""+operand1;
        }
    }
    if(btn.classList.contains("clear")){
        result.innerText="0";
        operand1=0;
        operatorPressed=false;
        operatorLastClicked=false;
    }
    if(btn.classList.contains("negative")){
        result.innerText=`${parseFloat(result.innerText)*(-1)}`;
    }
})

navigation?.addEventListener("mousedown",moveCalculator);

scientificToggle?.addEventListener("click",toggleScientific);

document.querySelector("#square")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${parseFloat(result.innerText)*parseFloat(result.innerText)}`;
    }
})
document.querySelector("#squareroot")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${Math.sqrt(parseFloat(result.innerText))}`;
    }
})
document.querySelector("#cuberoot")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${Math.cbrt(parseFloat(result.innerText))}`;
    }
})
document.querySelector("#reciprocal")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${1/parseFloat(result.innerText)}`;
    }
})
document.querySelector("#factorial")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${factorial(parseFloat(result.innerText))}`;
    }
})
document.querySelector("#poweroften")?.addEventListener("click",()=>{
    if(result.innerText!=="0"){
        result.innerText=`${Math.pow(10,parseFloat(result.innerText))}`;
    }
})
document.querySelector("#natural-log")?.addEventListener("click",()=>{
        result.innerText=`${Math.log(parseFloat(result.innerText))}`;
})
document.querySelector("#log10")?.addEventListener("click",()=>{
        result.innerText=`${Math.log10(parseFloat(result.innerText))}`;
})
document.querySelector("#sin")?.addEventListener("click",()=>{
    result.innerText=`${Math.sin(parseFloat(result.innerText))}`;
})
document.querySelector("#cos")?.addEventListener("click",()=>{
    result.innerText=`${Math.cos(parseFloat(result.innerText))}`;
})
document.querySelector("#tan")?.addEventListener("click",()=>{
    result.innerText=`${Math.tan(parseFloat(result.innerText))}`;
})
document.querySelector("#e")?.addEventListener("click",()=>{
    result.innerText=`${Math.E}`;
})
document.querySelector("#sinh")?.addEventListener("click",()=>{
    result.innerText=`${Math.sinh(parseFloat(result.innerText))}`;
})
document.querySelector("#cosh")?.addEventListener("click",()=>{
    result.innerText=`${Math.cosh(parseFloat(result.innerText))}`;
})
document.querySelector("#tanh")?.addEventListener("click",()=>{
    result.innerText=`${Math.tanh(parseFloat(result.innerText))}`;
})
document.querySelector("#pi")?.addEventListener("click",()=>{
    result.innerText=`${Math.PI}`;
})
document.querySelector("#powerofe")?.addEventListener("click",()=>{
    result.innerText=`${Math.pow(Math.E,parseFloat(result.innerText))}`;
})

window.onload=()=>{
    if(localStorage.getItem('scientific'))
        scientific=JSON.parse(localStorage.getItem("scientific")||"false");
    else
        scientific=false;
    if(scientific)
        scientificPart.classList.remove("hidden");
    else
        scientificPart.classList.add("hidden");

    if(localStorage.getItem('top') && localStorage.getItem('left')){
        calculator.style.top=localStorage.getItem('top')||"";
        calculator.style.left=localStorage.getItem('left')||"";
    }
}