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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './Calculator.css';
export function Calculator(_a) {
    var onClose = _a.onClose;
    var _b = useState('0'), display = _b[0], setDisplay = _b[1];
    var _c = useState(null), firstOperand = _c[0], setFirstOperand = _c[1];
    var _d = useState(null), operator = _d[0], setOperator = _d[1];
    var _e = useState(false), waitingForSecondOperand = _e[0], setWaitingForSecondOperand = _e[1];
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
    return (_jsxs("div", __assign({ className: "window calculator" }, { children: [_jsxs("div", __assign({ className: "window-header" }, { children: [_jsx("span", { children: "Calculator" }), _jsx("button", __assign({ onClick: onClose }, { children: "\u00D7" }))] })), _jsxs("div", __assign({ className: "window-content" }, { children: [_jsx("div", __assign({ className: "calculator-display" }, { children: display })), _jsxs("div", __assign({ className: "calculator-buttons" }, { children: [['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(function (btn) { return (_jsx("button", __assign({ className: "calculator-button", onClick: function () {
                                    if (btn === '=') {
                                        performOperation('=');
                                    }
                                    else if (['+', '-', '*', '/'].includes(btn)) {
                                        performOperation(btn);
                                    }
                                    else if (btn === '.') {
                                        inputDecimal();
                                    }
                                    else {
                                        inputDigit(btn);
                                    }
                                } }, { children: btn }), btn)); }), _jsx("button", __assign({ className: "calculator-button", onClick: clear }, { children: "C" }))] }))] }))] })));
}
