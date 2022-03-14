const firstLine = document.querySelector('.firstLine');
const secondLine = document.querySelector('.secondLine');
const numbers = document.querySelectorAll('.number');
const signs = document.querySelectorAll('.sign');
const dot = document.querySelector('.dot');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');

let firstNumber = '';
let secondNumber = '';
let number = '';
let sign = '';
let disable = false;
let needCleaning = false;

const evaluate = (firstNumber, sign, secondNumber) => {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch (sign) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '÷':
            return firstNumber / secondNumber;
        case "×":
            return firstNumber * secondNumber;
    }
}

const makeProperSize = (number) => {
    if (number.toString().length > 16) secondLine.style.fontSize = '20px';
    else if (number.toString().length > 24) secondLine.style.fontSize = '16px';
    else secondLine.style.fontSize = '28px';
    return number;
}

const clean = () => {
    firstNumber = '';
    firstLine.textContent = '';
    needCleaning = false;
}

const changeSign = () => {
    if (!number) {
        if (firstNumber){
            firstLine.textContent = firstNumber + ' ' + sign;
            return true;
        } else number = '0';
    }
}

const move = () => {
    firstNumber = number;
    number = '';
    secondNumber = '';
}

const makeEvaluation = (previousSign) => { 
    secondNumber = number;
    number = evaluate(firstNumber, previousSign, secondNumber);
    secondLine.textContent = makeProperSize(number);
}

const toggleNumbersBtn = () => {
    if (disable) numbers.forEach(number => number.addEventListener('click', getNumber));
    else numbers.forEach(number => number.removeEventListener('click', getNumber));
    disable = !disable;
}

const getNumber = (e) => {
    if (number == '0') number = '';
    if (needCleaning) clean();
    number += e.target.dataset.number;
    secondLine.textContent = makeProperSize(number);
    if (number.length == 16) toggleNumbersBtn();
}

const makeFloat = () => { 
    if (disable) return;
    if (needCleaning) clean();
    if (!number) number = '0';
    if (!number.includes('.')) number += '.';
    secondLine.textContent = number; 
}

const count = (e) => {
    let previousSign = sign;
    sign = e.target.dataset.sign;
    needCleaning = (sign == '=');
    if (changeSign()) return; 
    if (firstNumber) makeEvaluation(previousSign);
    firstLine.textContent = (firstNumber && sign == '=') ? 
        (firstNumber + ' ' + previousSign + ' ' + secondNumber + ' =') : number + ' ' + sign;
    move();
    if (disable) toggleNumbersBtn();
}

const clear = () => {
    secondLine.style.fontSize = '28px';
    number = '';
    firstNumber = '';
    secondNumber = '';
    firstLine.textContent = '';
    secondLine.textContent = '0';
}

const deleteSymbol = () => {
    number = number.toString().slice(0, -1);
    if (!number) number = '0';
    secondLine.textContent = makeProperSize(number);
}

numbers.forEach(number => number.addEventListener('click', getNumber));
signs.forEach(sign => sign.addEventListener('click', count));
dot.addEventListener('click', makeFloat);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteSymbol);
