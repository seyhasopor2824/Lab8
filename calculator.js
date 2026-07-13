let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && number !== '.') {
            currentValue = number;
        } else {
            // Prevent multiple decimal points
            if (number === '.' && currentValue.includes('.')) return;
            currentValue += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || shouldResetDisplay) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    currentValue = Math.round(result * 100000000) / 100000000 + '';
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});