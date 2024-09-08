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
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Bluwumbuwurg.css';
export default function Bluwumbuwurg(_a) {
    var onClose = _a.onClose;
    var _b = useState({ width: 800, height: 600 }), windowSize = _b[0], setWindowSize = _b[1];
    var _c = useState({ x: 100, y: 100 }), initialPosition = _c[0], setInitialPosition = _c[1];
    useEffect(function () {
        var updateSize = function () {
            var maxWidth = window.innerWidth - 100;
            var maxHeight = window.innerHeight - 100;
            setWindowSize({
                width: Math.min(800, maxWidth),
                height: Math.min(600, maxHeight)
            });
            // Set a reasonable initial position
            setInitialPosition({
                x: Math.min(100, window.innerWidth / 2 - 400),
                y: Math.min(100, window.innerHeight / 2 - 300)
            });
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return function () { return window.removeEventListener('resize', updateSize); };
    }, []);
    return (_jsx(ResizableWindow, __assign({ title: "Bluwumbuwurg", onClose: onClose, appName: "bluwumbuwurg", initialWidth: windowSize.width, initialHeight: windowSize.height, initialX: initialPosition.x, initialY: initialPosition.y }, { children: function (_a) {
            var width = _a.width, height = _a.height;
            return (_jsx("iframe", { src: "https://uwu.pro", title: "Bluwumbuwurg", width: "100%", height: "100%", style: { border: 'none' } }));
        } })));
}
