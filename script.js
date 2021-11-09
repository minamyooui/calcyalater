const display = document.querySelector('.display');
let num1 = '', num2 = '', op = '';
let refDisplay = false;

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  let num = a / b;
  return num;
}

function operate() {
  switch(op) {
    case 'add':
      return add(num1, num2);
      break;
    case 'subtract':
      return subtract(num1, num2);
      break;
    case 'multiply':
      return multiply(num1, num2);
      break;
    case 'divide':
      return divide(num1, num2);
      break;
    case 'modulo':
      return mod(num1, num2);
      break;
  }
}

function neg() {
  let num = display.textContent;
  display.textContent = -num;
}

function mod(a, b) {
  return a % b;
}

function decimal() {
  if (display.textContent.includes('.')) return;
  display.textContent += '.';
}

//work on rounding numbers to not overflow display

function operation() {
  let result = operate();
  if (result.toString().length > 9) {
    if (Math.round(result).toString().length > 9) {
      result = result.toExponential(3);
    } else {
      let dec = 9 - Math.round(result).toString().length;
      let decPlace = '1';
      for (let i = 0; i < dec; i++) {
        decPlace += '0';
      }
      result = Math.round(result * decPlace) / decPlace;
    }
  }
  display.textContent = result;
  num1 = '';
  num2 = '';
  op = '';
  refDisplay = true;
}

function updateDisplay() {
  if (refDisplay) {
    display.textContent = '';
    refDisplay = false;
  }
  let displayValue = display.textContent;
  if (displayValue.length > 9) return;
  displayValue += this.textContent;
  display.textContent = displayValue;
}

function clearCalc() {
  display.textContent = '';
  num1 = '';
  num2 = '';
  op = '';
  refDisplay = false;
}

function equals() {
  if (!num1) {
    return;
  } else if (!num2) {
    num2 = display.textContent;
  }
  operation();
}

function del() {
  displayValue = display.textContent;
  display.textContent = displayValue.slice(0, -1);
}

function opLogic() {
  if (!num1) {
    num1 = display.textContent;
    op = this.id;
    refDisplay = true;
  } else if (!num2) {
    num2 = display.textContent;
    operation();
    op = this.id;
    num1 = display.textContent;
  }
}

function main() { 
  const numbers = document.querySelectorAll('.num');
  numbers.forEach(num => {
    num.addEventListener('click', updateDisplay);
  });
  const clear = document.querySelector('#Delete');
  clear.addEventListener('click', clearCalc);
  const operators = document.querySelectorAll('.operator');
  operators.forEach(op => {
    op.addEventListener('click', opLogic);
  })
  const equal = document.querySelector('#operate');
  equal.addEventListener('click', equals);
  const plusMinus = document.querySelector('#plusMinus');
  plusMinus.addEventListener('click', neg);
  const decimalButton = document.querySelector('#decimal');
  decimalButton.addEventListener('click', decimal);
  const backspace = document.querySelector('#Backspace');
  backspace.addEventListener('click', del);
  
  window.addEventListener('keydown', keyboard);
}

function keyboard(e) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.textContent == e.key) {
      btn.click();
    } else if (btn.id == e.key) {
      btn.click();
    }
  });
}

main();