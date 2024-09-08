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
import { useRef, useEffect, useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Paint.css';
export default function Paint(_a) {
    var onClose = _a.onClose;
    var canvasRef = useRef(null);
    var _b = useState(false), isDrawing = _b[0], setIsDrawing = _b[1];
    var _c = useState('#000000'), color = _c[0], setColor = _c[1];
    var _d = useState(5), lineWidth = _d[0], setLineWidth = _d[1];
    useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var context = canvas.getContext('2d');
        if (!context)
            return;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        // Load saved canvas state
        var savedCanvas = localStorage.getItem('paintCanvas');
        if (savedCanvas) {
            var img_1 = new Image();
            img_1.onload = function () {
                context.drawImage(img_1, 0, 0);
            };
            img_1.src = savedCanvas;
        }
    }, [color, lineWidth]);
    var startDrawing = function (e) {
        setIsDrawing(true);
        draw(e);
    };
    var stopDrawing = function () {
        setIsDrawing(false);
        var canvas = canvasRef.current;
        if (canvas) {
            localStorage.setItem('paintCanvas', canvas.toDataURL());
        }
    };
    var draw = function (e) {
        if (!isDrawing)
            return;
        var canvas = canvasRef.current;
        var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
        if (!canvas || !context)
            return;
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        var x, y;
        if ('touches' in e) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        }
        else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    };
    var clearCanvas = function () {
        var canvas = canvasRef.current;
        var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            localStorage.removeItem('paintCanvas');
        }
    };
    return (_jsx(ResizableWindow, __assign({ title: "Paint", onClose: onClose, appName: "paint", initialWidth: 800, initialHeight: 600 }, { children: _jsxs("div", __assign({ className: "paint" }, { children: [_jsxs("div", __assign({ className: "paint-controls" }, { children: [_jsx("input", { type: "color", value: color, onChange: function (e) { return setColor(e.target.value); } }), _jsx("input", { type: "range", min: "1", max: "20", value: lineWidth, onChange: function (e) { return setLineWidth(parseInt(e.target.value)); } }), _jsx("button", __assign({ onClick: clearCanvas }, { children: "Clear" }))] })), _jsx("canvas", { ref: canvasRef, width: 800, height: 550, onMouseDown: startDrawing, onMouseMove: draw, onMouseUp: stopDrawing, onMouseOut: stopDrawing, onTouchStart: startDrawing, onTouchMove: draw, onTouchEnd: stopDrawing })] })) })));
}
