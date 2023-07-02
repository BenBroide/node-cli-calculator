"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var readline = require("readline");
var helpers_1 = require("./helpers");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var currentOperation = '';
var firstOperand = null;
var secondOperand = null;
var hasOperator = false;
var lastPrinted = null;
var log = [];
var isTesting = process.argv.includes('--testing');
var timestamp = (0, helpers_1.getTimestamp)();
if (!isTesting) {
    console.log('0');
}
rl.on('line', function (input) {
    var expressionParts = (0, helpers_1.cleanExpressionParts)(processExpression(input.trim()));
    lastPrinted = processExpressionParts(expressionParts, input);
    console.log(lastPrinted);
});
rl.on('close', function () {
    (0, helpers_1.saveLogToFile)(log, timestamp);
});
function processExpressionParts(expressionParts, input) {
    var logEntry = { input: "", output: 0, reason: "" };
    for (var _i = 0, expressionParts_1 = expressionParts; _i < expressionParts_1.length; _i++) {
        var part = expressionParts_1[_i];
        switch (true) {
            case part === 'c':
                clearCalculator();
                lastPrinted = 0;
                logEntry = {
                    input: input,
                    output: lastPrinted,
                    reason: 'Calculator cleared'
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
                    reason: "Operator \"".concat(part, "\" selected")
                };
                break;
            case part === '=':
                performOperation();
                lastPrinted = firstOperand;
                var output = lastPrinted;
                if (expressionParts.length === 2 && expressionParts[1] === '=') {
                    if (expressionParts[0].startsWith('*') || expressionParts[0].startsWith('/')) {
                        expressionParts[0] = "".concat(lastPrinted).concat(expressionParts[0]);
                    }
                    output = eval(expressionParts[0]);
                    lastPrinted = output;
                    firstOperand = output;
                }
                logEntry = {
                    input: input,
                    output: output || 0,
                    reason: 'Operation performed'
                };
                break;
            case !isNaN(Number(part)):
                var number = Number(part);
                if (!hasOperator || firstOperand === null) {
                    firstOperand = number;
                }
                else {
                    secondOperand = number;
                }
                lastPrinted = number;
                logEntry = {
                    input: input,
                    output: lastPrinted,
                    reason: 'Number entered'
                };
                break;
        }
        (0, helpers_1.printLogEntry)(logEntry);
        (0, helpers_1.addToLog)(logEntry.input, logEntry.output, logEntry.reason, log);
    }
    return lastPrinted;
}
function performOperation() {
    if (!hasOperator || secondOperand === null) {
        return;
    }
    switch (currentOperation) {
        case '+':
            if (firstOperand)
                firstOperand += secondOperand;
            break;
        case '-':
            if (firstOperand)
                firstOperand -= secondOperand;
            break;
        case '*':
            if (firstOperand)
                firstOperand *= secondOperand;
            break;
        case '/':
            if (firstOperand)
                firstOperand /= secondOperand;
            break;
    }
    secondOperand = null;
    hasOperator = false;
}
function clearCalculator() {
    currentOperation = '';
    firstOperand = null;
    secondOperand = null;
    hasOperator = false;
}
function processExpression(expression) {
    expression = expression.replace(/\s/g, '');
    if (expression.endsWith('=')) {
        var calculation = expression.slice(0, -1);
        var result = [];
        if (calculation[0] === '-') {
            result = __spreadArray(__spreadArray(['-'], processExpression(calculation.slice(1)), true), ['='], false);
        }
        else if (calculation[0] === '+') {
            result = __spreadArray(__spreadArray(['+'], processExpression(calculation.slice(1)), true), ['='], false);
        }
        else {
            result = [calculation, '='];
        }
        return result;
    }
    else {
        var numbers = expression.split(/[-+*/()]/);
        var operators = expression.split(/[0-9.]+/).filter(Boolean);
        var result = [];
        for (var i = 0; i < numbers.length; i++) {
            result.push(numbers[i]);
            if (i < operators.length)
                result.push(operators[i]);
        }
        return result;
    }
}
