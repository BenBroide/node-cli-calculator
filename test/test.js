"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var child_process_1 = require("child_process");
function runCode(inputs) {
    return new Promise(function (resolve, reject) {
        var child = (0, child_process_1.spawn)('node', ['src/index.js', '--testing']);
        var output = '';
        child.stdout.on('data', function (data) {
            output += data.toString();
        });
        child.stderr.on('data', function (data) {
            console.error(data.toString());
        });
        child.on('close', function () {
            resolve(output.trim().split('\n'));
        });
        inputs.forEach(function (input) {
            child.stdin.write(input + '\n');
        });
        child.stdin.end();
    });
}
var testCases = [
    { input: '2+45', expectedOutput: '45' },
    { input: '=', expectedOutput: '47' },
    { input: '*3=', expectedOutput: '141' },
    { input: '-8+12=', expectedOutput: '145' },
    { input: 'c', expectedOutput: '0' },
    { input: '2+2', expectedOutput: '2' },
    { input: '+18-12=', expectedOutput: '10' },
    { input: 'c', expectedOutput: '0' },
    { input: '2+2', expectedOutput: '2' },
    { input: '=', expectedOutput: '4' },
    { input: '+ 66', expectedOutput: '66' },
    { input: '=', expectedOutput: '70' },
    { input: '-5', expectedOutput: '5' },
    { input: '=', expectedOutput: '65' },
    { input: '-9', expectedOutput: '9' },
    { input: '=', expectedOutput: '56' },
    { input: '/ 3', expectedOutput: '3' },
    { input: '=', expectedOutput: '18.666666666666668' },
    { input: '*4', expectedOutput: '4' },
    { input: '=', expectedOutput: '74.66666666666667' },
    { input: '-0.66666666666667', expectedOutput: '0.66666666666667' },
    { input: '=', expectedOutput: '74' },
    { input: 'c', expectedOutput: '0' },
    { input: '1/ 2', expectedOutput: '2' },
    { input: '=', expectedOutput: '0.5' },
    { input: 'c', expectedOutput: '0' },
    { input: '3 * 10', expectedOutput: '10' },
    { input: '=', expectedOutput: '30' },
    { input: 'c', expectedOutput: '0' },
    { input: '3*10=', expectedOutput: '30' },
    { input: 'c', expectedOutput: '0' },
    { input: '22+33=', expectedOutput: '55' },
    { input: '-15', expectedOutput: '15' },
    { input: '=', expectedOutput: '40' },
    { input: '/ 3', expectedOutput: '3' },
    { input: '=', expectedOutput: '13.333333333333334' },
    { input: '*4=', expectedOutput: '53.333333333333336' },
    { input: '/3=', expectedOutput: '17.77777777777778' },
    { input: '*5=', expectedOutput: '88.88888888888889' },
    { input: '-2=', expectedOutput: '86.88888888888889' },
    { input: '+5=', expectedOutput: '91.88888888888889' },
];
describe('Calculator Tests', function () {
    var results;
    // Before all tests run the inputs and get the results
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var inputs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputs = testCases.map(function (testCase) { return testCase.input; });
                    return [4 /*yield*/, runCode(inputs)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    testCases.forEach(function (testCase, index) {
        test("Input \"".concat(testCase.input, "\" should return ").concat(testCase.expectedOutput), function () {
            var actualOutput = results[index];
            expect(actualOutput).toEqual(testCase.expectedOutput);
        });
    });
});
