import * as readline from 'readline';
import { printLogEntry, cleanExpressionParts, saveLogToFile, addToLog, getTimestamp } from './helpers';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentOperation: string = '';
let firstOperand: number | null = null;
let secondOperand: number | null = null;
let hasOperator: boolean = false;
let lastPrinted: number | null = null;
let log: Array<{ input: string, output: number, reason: string }> = [];
let isTesting: boolean = process.argv.includes('--testing');
let timestamp: string = getTimestamp();

if (!isTesting) {
  console.log('0');
}

rl.on('line', (input: string) => {
  let expressionParts: Array<string> = cleanExpressionParts(processExpression(input.trim()));
  lastPrinted = processExpressionParts(expressionParts, input);
  console.log(lastPrinted);
});

rl.on('close', () => {
  saveLogToFile(log, timestamp);
});

function processExpressionParts(expressionParts: Array<string>, input: string): number | null {
  let logEntry: { input: string, output: number, reason: string } = { input: "", output: 0, reason: ""};

  for (const part of expressionParts) {
    switch (true) {
      case part === 'c':
        clearCalculator();
        lastPrinted = 0;
        logEntry = {
          input: input,
          output: lastPrinted,
          reason: 'Calculator cleared',
        };
        break;
      case '+-*/'.includes(part):
        if (hasOperator) {
          performOperation();
        }
        currentOperation = part;
        hasOperator = true;
        logEntry = {
          input: input,
          output: lastPrinted || 0,
          reason: `Operator "${part}" selected`,
        };
        break;
      case part === '=':
        performOperation();
        lastPrinted = firstOperand;

        let output = lastPrinted;

        if (expressionParts.length === 2 && expressionParts[1] === '=') {
          if (expressionParts[0].startsWith('*') || expressionParts[0].startsWith('/')) {
            expressionParts[0] = `${lastPrinted}${expressionParts[0]}`;
          }
          output = eval(expressionParts[0]);
          lastPrinted = output;
          firstOperand = output;
        }

        logEntry = {
          input: input,
          output: output || 0,
          reason: 'Operation performed',
        };

        break;

      case !isNaN(Number(part)):
        const number = Number(part);
        if (!hasOperator || firstOperand === null) {
          firstOperand = number;
        } else {
          secondOperand = number;
        }
        lastPrinted = number;

        logEntry = {
          input: input,
          output: lastPrinted,
          reason: 'Number entered',
        };
        break;
    }
    printLogEntry(logEntry);
    addToLog(logEntry.input, logEntry.output, logEntry.reason, log);
  }

  return lastPrinted;
}

function performOperation(): void {
  if (!hasOperator || secondOperand === null) {
    return;
  }

  switch (currentOperation) {
    case '+':
      if (firstOperand) firstOperand += secondOperand;
      break;
    case '-':
      if (firstOperand) firstOperand -= secondOperand;
      break;
    case '*':
      if (firstOperand) firstOperand *= secondOperand;
      break;
    case '/':
      if (firstOperand) firstOperand /= secondOperand;
      break;
  }

  secondOperand = null;
  hasOperator = false;
}

function clearCalculator(): void {
  currentOperation = '';
  firstOperand = null;
  secondOperand = null;
  hasOperator = false;
}

function processExpression(expression: string): Array<string> {
  expression = expression.replace(/\s/g, '');

  if (expression.endsWith('=')) {
    const calculation = expression.slice(0, -1);
    let result: Array<string> = [];

    if (calculation[0] === '-') {
      result = ['-', ...processExpression(calculation.slice(1)), '='];
    } else if (calculation[0] === '+') {
        result = ['+', ...processExpression(calculation.slice(1)), '='];
    } else {
      result = [calculation, '='];
    }

    return result;
  } else {
    const numbers = expression.split(/[-+*/()]/);
    const operators = expression.split(/[0-9.]+/).filter(Boolean);
    const result: Array<string> = [];

    for (let i = 0; i < numbers.length; i++) {
      result.push(numbers[i]);
      if (i < operators.length) result.push(operators[i]);
    }

    return result;
  }
}
