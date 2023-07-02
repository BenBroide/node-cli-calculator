"use strict";
exports.__esModule = true;
exports.getTimestamp = exports.getShowInteractiveLogsFlag = exports.consoleLog = exports.saveLogToFile = exports.cleanExpressionParts = exports.printLogEntry = exports.addToLog = void 0;
var fs = require("fs");
var path = require("path");
function printLogEntry(logEntry) {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    consoleLog('--- Log Entry ---');
    consoleLog("Input: ".concat(logEntry.input, ", Output: ").concat(logEntry.output, ", Reason: ").concat(logEntry.reason));
}
exports.printLogEntry = printLogEntry;
function cleanExpressionParts(expressionParts) {
    expressionParts = expressionParts.filter(function (value) {
        var isNotEmpty = value !== '' && value !== ' ';
        return isNotEmpty;
    });
    if (expressionParts.every(function (part) { return part === '='; })) {
        expressionParts = ['='];
    }
    return expressionParts;
}
exports.cleanExpressionParts = cleanExpressionParts;
function saveLogToFile(log, timestamp) {
    var logFolder = 'logs';
    var logFileName = "calculator-".concat(timestamp, ".log");
    var logFilePath = path.join(logFolder, logFileName);
    var logContent = '';
    for (var _i = 0, log_1 = log; _i < log_1.length; _i++) {
        var entry = log_1[_i];
        logContent += "Input: ".concat(entry.input, ", Output: ").concat(entry.output, ", Reason: ").concat(entry.reason, "\n");
    }
    fs.mkdir(logFolder, { recursive: true }, function (err) {
        if (err) {
            console.error('Error creating log folder:', err);
        }
        else {
            fs.appendFile(logFilePath, logContent, function (err) {
                if (err) {
                    console.error('Error writing log file:', err);
                }
            });
        }
    });
}
exports.saveLogToFile = saveLogToFile;
function consoleLog(string) {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    console.log(string);
}
exports.consoleLog = consoleLog;
function addToLog(input, output, reason, log) {
    var logEntry = {
        input: input,
        output: output,
        reason: reason
    };
    log.push(logEntry);
}
exports.addToLog = addToLog;
function getShowInteractiveLogsFlag() {
    return process.argv.includes('--show-interactive-logs');
}
exports.getShowInteractiveLogsFlag = getShowInteractiveLogsFlag;
function getTimestamp() {
    var date = new Date();
    return date.toISOString().replace(/[-:.]/g, '');
}
exports.getTimestamp = getTimestamp;
