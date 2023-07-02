const { spawn } = require('child_process');
const fs = require('fs');

function runCode(inputs, callback) {
    const child = spawn('node', ['node-cli-calculator.js', '--testing']);

    let output = '';
    child.stdout.on('data', (data) => {
        output += data.toString();
    });

    child.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    child.on('close', () => {
        callback(output.trim());
    });

    inputs.forEach((input) => {
        child.stdin.write(input + '\n');
    });

    child.stdin.end();
}

const testCases = [
    { input: '2+45', expectedOutput: '455' },
    { input: '=', expectedOutput: '47' },
    { input: '*3=', expectedOutput: '141' },
    { input: '-8+12=', expectedOutput: '145' },
    { input: 'c', expectedOutput: '0' },
    { input: '2+2', expectedOutput: '2' },
    { input: '+18-12=', expectedOutput: '10' },
    { input: 'c', expectedOutput: '0' },
    { input: '2+2', expectedOutput: '2' },
    { input: '=', expectedOutput: '4' },
    { input: '+66', expectedOutput: '66' },
    { input: '=', expectedOutput: '70' },
    { input: '-5', expectedOutput: '5' },
    { input: '=', expectedOutput: '65' },
    { input: '-9', expectedOutput: '9' },
    { input: '=', expectedOutput: '56' },
    { input: '/3', expectedOutput: '3' },
    { input: '=', expectedOutput: '18.666666666666668' },
    { input: '*4', expectedOutput: '4' },
    { input: '=', expectedOutput: '74.66666666666667' },
    { input: '-0.66666666666667', expectedOutput: '0.66666666666667' },
    { input: '=', expectedOutput: '74' },
    { input: 'c', expectedOutput: '0' },
    { input: '1/2', expectedOutput: '2' },
    { input: '=', expectedOutput: '0.5' },
    { input: 'c', expectedOutput: '0' },
    { input: '3*10', expectedOutput: '10' },
    { input: '=', expectedOutput: '30' },
    { input: 'c', expectedOutput: '0' },
    { input: '3*10=', expectedOutput: '30' },
    { input: 'c', expectedOutput: '0' },
    { input: '22+33=', expectedOutput: '55' },
    { input: '-15', expectedOutput: '15' },
    { input: '=', expectedOutput: '40' },
    { input: '/3', expectedOutput: '3' },
    { input: '=', expectedOutput: '13.333333333333334' },
    { input: '*4=', expectedOutput: '53.333333333333336' },
    { input: '/3=', expectedOutput: '17.77777777777778' },
    { input: '*5=', expectedOutput: '88.88888888888889' },
    { input: '-2=', expectedOutput: '86.88888888888889' },
    { input: '+5=', expectedOutput: '91.88888888888889' },
 
];



const inputs = testCases.map((testCase) => testCase.input);

runCode(inputs, (output) => {
    const outputs = output.split('\n');
    testCases.forEach((testCase, index) => {
        const actualOutput = outputs[index];
        if (actualOutput === testCase.expectedOutput) {
            console.log(`Test case passed: Input "${testCase.input}", Output "${actualOutput}"`);
        } else {
            console.error(`Test case failed: Input "${testCase.input}", Expected "${testCase.expectedOutput}", Actual "${actualOutput}"`);
        }
    });
});