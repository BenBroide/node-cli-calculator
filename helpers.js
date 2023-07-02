const fs = require('fs');

let logFileName = null;
let logFileInitialized = false;

function printLogEntry(logEntry) {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    consoleLog('--- Log Entry ---');
    consoleLog(`Input: ${logEntry.input}, Output: ${logEntry.output}, Reason: ${logEntry.reason}`);
}

function cleanExpressionParts(expressionParts) {
    expressionParts = expressionParts.filter((value) => {
        const isNotEmpty = value !== '' && value !== ' ';
        return isNotEmpty;
    });

    if (expressionParts.every((part) => part === '=')) {
        expressionParts = ['='];
    }

    return expressionParts;
}

function saveLogToFile(log, timestamp) {
    if (!logFileInitialized) {
       logFileName = `calculator-${timestamp}.log`;
        logFileInitialized = true;
    }

    let logContent = '';

    for (const entry of log) {
        logContent += `Input: ${entry.input}, Output: ${entry.output}, Reason: ${entry.reason}\n`;
    }

    fs.appendFile(logFileName, logContent, (err) => {
        if (err) {
            console.error('Error writing log file:', err);
        }
    });
}

function consoleLog(string) {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    console.log(string);
}

function addToLog(input, output, reason, log) {
    const logEntry = {
        input: input,
        output: output,
        reason: reason
    };
    log.push(logEntry);
}

function getShowInteractiveLogsFlag() {
    return process.argv.includes('--show-interactive-logs');
}

function getTimestamp() {
    const date = new Date();
    return date.toISOString().replace(/[-:.]/g, '');
}

module.exports = {
    addToLog,
    printLogEntry,
    cleanExpressionParts,
    saveLogToFile,
    consoleLog,
    getShowInteractiveLogsFlag,
    getTimestamp
};
