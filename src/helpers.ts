import * as fs from 'fs';
import * as path from 'path';


interface LogEntry {
    input: string;
    output: string;
    reason: string;
}

function printLogEntry(logEntry: LogEntry): void {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    consoleLog('--- Log Entry ---');
    consoleLog(`Input: ${logEntry.input}, Output: ${logEntry.output}, Reason: ${logEntry.reason}`);
}

function cleanExpressionParts(expressionParts: string[]): string[] {
    expressionParts = expressionParts.filter((value) => {
        const isNotEmpty = value !== '' && value !== ' ';
        return isNotEmpty;
    });

    if (expressionParts.every((part) => part === '=')) {
        expressionParts = ['='];
    }

    return expressionParts;
}

function saveLogToFile(log: LogEntry[], timestamp: string): void {
    const logFolder = 'logs';
    const logFileName = `calculator-${timestamp}.log`;
    const logFilePath = path.join(logFolder, logFileName);

    let logContent = '';

    for (const entry of log) {
        logContent += `Input: ${entry.input}, Output: ${entry.output}, Reason: ${entry.reason}\n`;
    }

    fs.mkdir(logFolder, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating log folder:', err);
        } else {
            fs.appendFile(logFilePath, logContent, (err) => {
                if (err) {
                    console.error('Error writing log file:', err);
                }
            });
        }
    });
}

function consoleLog(string: string): void {
    if (!getShowInteractiveLogsFlag()) {
        return;
    }
    console.log(string);
}

function addToLog(input: string, output: string, reason: string, log: LogEntry[]): void {
    const logEntry: LogEntry = {
        input: input,
        output: output,
        reason: reason
    };
    log.push(logEntry);
}

function getShowInteractiveLogsFlag(): boolean {
    return process.argv.includes('--show-interactive-logs');
}

function getTimestamp(): string {
    const date = new Date();
    return date.toISOString().replace(/[-:.]/g, '');
}

export {
    addToLog,
    printLogEntry,
    cleanExpressionParts,
    saveLogToFile,
    consoleLog,
    getShowInteractiveLogsFlag,
    getTimestamp
};
