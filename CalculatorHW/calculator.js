'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const calculator = document.getElementById('calculator');

  display.value = '';

  calculator.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const value = event.target.textContent;

    if (value === 'Clear') {
      display.value = '';
    } else if (value === '=') {
      try {
        display.value = evaluateExpression(display.value);
      } catch {
        display.value = 'ERROR!';
      }
    } else {
      display.value += value;
    }
  });
});

function evaluateExpression(expression) {
    try {
      // Only allow digits, decimal points, and basic operators
      const tokens = expression.match(/(\d+\.?\d*|\.\d+|[+\-*/])/g);
      if (!tokens || tokens.length < 1) return 'Error';
  
      let result = parseFloat(tokens[0]);
  
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const next = parseFloat(tokens[i + 1]);
  
        if (isNaN(next)) return 'Error';
  
        switch (operator) {
          case '+': result += next; break;
          case '-': result -= next; break;
          case '*': result *= next; break;
          case '/':
            if (next === 0) return 'Error'; // Prevent divide-by-zero
            result /= next;
            break;
          default: return 'Error';
        }
  
        if (!isFinite(result)) return 'Error'; // Prevent Infinity
      }
  
      return result.toString();
    } catch {
      return 'Error';
    }
  }
