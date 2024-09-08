var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Calcuwulator.css';
export default function Calcuwulator(_a) {
    var onClose = _a.onClose;
    var _b = useState('0'), display = _b[0], setDisplay = _b[1];
    var _c = useState(null), firstOperand = _c[0], setFirstOperand = _c[1];
    var _d = useState(null), operator = _d[0], setOperator = _d[1];
    var _e = useState(false), waitingForSecondOperand = _e[0], setWaitingForSecondOperand = _e[1];
    var _f = useState('simple'), mode = _f[0], setMode = _f[1];
    var inputDigit = function (digit) {
        if (waitingForSecondOperand) {
            setDisplay(digit);
            setWaitingForSecondOperand(false);
        }
        else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };
    var inputDecimal = function () {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };
    var clear = function () {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };
    var performOperation = function (nextOperator) {
        var inputValue = parseFloat(display);
        if (firstOperand === null) {
            setFirstOperand(inputValue);
        }
        else if (operator) {
            var result = calculate(firstOperand, inputValue, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        }
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };
    var calculate = function (firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    };
    var handleEquals = function () {
        if (firstOperand !== null && operator) {
            var result = calculate(firstOperand, parseFloat(display), operator);
            setDisplay(String(result));
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(true);
        }
    };
    var handleScientificOperation = function (operation) {
        var currentValue = parseFloat(display);
        var result;
        switch (operation) {
            case 'sin':
                result = Math.sin(currentValue);
                break;
            case 'cos':
                result = Math.cos(currentValue);
                break;
            case 'tan':
                result = Math.tan(currentValue);
                break;
            case 'log':
                result = Math.log10(currentValue);
                break;
            case 'ln':
                result = Math.log(currentValue);
                break;
            case 'sqrt':
                result = Math.sqrt(currentValue);
                break;
            case 'pow2':
                result = Math.pow(currentValue, 2);
                break;
            case 'pow3':
                result = Math.pow(currentValue, 3);
                break;
            default:
                return;
        }
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
    };
    var handleFinancialOperation = function (operation) {
        // Implement financial operations here
        console.log("Financial operation: ".concat(operation));
    };
    var renderButtons = function () {
        var commonButtons = (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: "main-grid" }, { children: [_jsxs("div", __assign({ className: "number-pad" }, { children: [_jsx("button", __assign({ onClick: function () { return inputDigit('7'); } }, { children: "7" })), _jsx("button", __assign({ onClick: function () { return inputDigit('8'); } }, { children: "8" })), _jsx("button", __assign({ onClick: function () { return inputDigit('9'); } }, { children: "9" })), _jsx("button", __assign({ onClick: function () { return inputDigit('4'); } }, { children: "4" })), _jsx("button", __assign({ onClick: function () { return inputDigit('5'); } }, { children: "5" })), _jsx("button", __assign({ onClick: function () { return inputDigit('6'); } }, { children: "6" })), _jsx("button", __assign({ onClick: function () { return inputDigit('1'); } }, { children: "1" })), _jsx("button", __assign({ onClick: function () { return inputDigit('2'); } }, { children: "2" })), _jsx("button", __assign({ onClick: function () { return inputDigit('3'); } }, { children: "3" })), _jsx("button", __assign({ onClick: function () { return inputDigit('0'); }, className: "zero" }, { children: "0" })), _jsx("button", __assign({ onClick: inputDecimal }, { children: "." }))] })), _jsxs("div", __assign({ className: "operations" }, { children: [_jsx("button", __assign({ onClick: function () { return performOperation('/'); } }, { children: "/" })), _jsx("button", __assign({ onClick: function () { return performOperation('*'); } }, { children: "*" })), _jsx("button", __assign({ onClick: function () { return performOperation('-'); } }, { children: "-" })), _jsx("button", __assign({ onClick: function () { return performOperation('+'); } }, { children: "+" })), _jsx("button", __assign({ onClick: handleEquals }, { children: "=" }))] }))] })) }));
        switch (mode) {
            case 'scientific':
                return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: "top-row" }, { children: [_jsx("button", __assign({ onClick: function () { return handleScientificOperation('sin'); } }, { children: "sin" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('cos'); } }, { children: "cos" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('tan'); } }, { children: "tan" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('log'); } }, { children: "log" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('ln'); } }, { children: "ln" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('sqrt'); } }, { children: "\u221A" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('pow2'); } }, { children: "x\u00B2" })), _jsx("button", __assign({ onClick: function () { return handleScientificOperation('pow3'); } }, { children: "x\u00B3" }))] })), commonButtons] }));
            case 'financial':
                return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: "top-row" }, { children: [_jsx("button", __assign({ onClick: function () { return handleFinancialOperation('compound'); } }, { children: "Compound" })), _jsx("button", __assign({ onClick: function () { return handleFinancialOperation('simple'); } }, { children: "Simple" })), _jsx("button", __assign({ onClick: function () { return handleFinancialOperation('mortgage'); } }, { children: "Mortgage" })), _jsx("button", __assign({ onClick: function () { return handleFinancialOperation('roi'); } }, { children: "ROI" }))] })), commonButtons] }));
            default:
                return (_jsx("div", __assign({ className: "simple-calculator" }, { children: commonButtons })));
        }
    };
    return (_jsx(ResizableWindow, __assign({ title: "Calcuwulator", onClose: onClose, appName: "calcuwulator", initialWidth: 500, initialHeight: 600 }, { children: _jsxs("div", __assign({ className: "calcuwulator ".concat(mode) }, { children: [_jsx("div", __assign({ className: "display" }, { children: display })), _jsxs("div", __assign({ className: "mode-switcher" }, { children: [_jsx("button", __assign({ onClick: function () { return setMode('simple'); } }, { children: "Simple" })), _jsx("button", __assign({ onClick: function () { return setMode('scientific'); } }, { children: "Scientific" })), _jsx("button", __assign({ onClick: function () { return setMode('financial'); } }, { children: "Financial" }))] })), _jsxs("div", __assign({ className: "calcuwulator-buttons" }, { children: [_jsx("button", __assign({ onClick: clear }, { children: "C" })), renderButtons()] }))] })) })));
}
