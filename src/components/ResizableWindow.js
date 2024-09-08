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
import { useState, useEffect, useRef } from 'react';
import './ResizableWindow.css';
export function ResizableWindow(_a) {
    var title = _a.title, onClose = _a.onClose, appName = _a.appName, children = _a.children, initialWidth = _a.initialWidth, initialHeight = _a.initialHeight, _b = _a.initialX, initialX = _b === void 0 ? 50 : _b, // Add this line with a default value
    _c = _a.initialY, // Add this line with a default value
    initialY = _c === void 0 ? 50 : _c, // Add this line with a default value
    _d = _a.resizable // Add this line with a default value of true
    , // Add this line with a default value
    resizable = _d === void 0 ? true : _d // Add this line with a default value of true
    ;
    var _e = useState({ x: initialX, y: initialY }), position = _e[0], setPosition = _e[1]; // Use initialX and initialY here
    var _f = useState({ width: initialWidth, height: initialHeight }), size = _f[0], setSize = _f[1];
    var windowRef = useRef(null);
    var contentRef = useRef(null);
    var handleMouseDown = function (e) {
        var startX = e.pageX - position.x;
        var startY = e.pageY - position.y;
        var handleMouseMove = function (e) {
            setPosition({
                x: e.pageX - startX,
                y: e.pageY - startY
            });
        };
        var handleMouseUp = function () {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    useEffect(function () {
        var _a;
        var handleResize = function (e) {
            if (windowRef.current) {
                var newWidth = e.clientX - windowRef.current.getBoundingClientRect().left;
                var newHeight = e.clientY - windowRef.current.getBoundingClientRect().top;
                setSize({ width: newWidth, height: newHeight });
            }
        };
        var handleMouseUp = function () {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        var resizeHandle = (_a = windowRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('.resize-handle');
        var handleResizeStart = function (e) {
            e.preventDefault();
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', handleMouseUp);
        };
        resizeHandle === null || resizeHandle === void 0 ? void 0 : resizeHandle.addEventListener('mousedown', handleResizeStart);
        return function () {
            resizeHandle === null || resizeHandle === void 0 ? void 0 : resizeHandle.removeEventListener('mousedown', handleResizeStart);
        };
    }, []);
    useEffect(function () {
        var updateContentSize = function () {
            if (contentRef.current) {
                var headerHeight = 30; // Adjust this value based on your header height
                contentRef.current.style.height = "".concat(size.height - headerHeight, "px");
            }
        };
        updateContentSize();
    }, [size.height]);
    return (_jsxs("div", __assign({ ref: windowRef, className: "resizable-window ".concat(appName), style: {
            left: "".concat(position.x, "px"),
            top: "".concat(position.y, "px"),
            width: "".concat(size.width, "px"),
            height: "".concat(size.height, "px"),
        } }, { children: [_jsxs("div", __assign({ className: "resizable-window-header", onMouseDown: handleMouseDown }, { children: [_jsx("button", __assign({ className: "close-button", onClick: onClose }, { children: "\u00D7" })), _jsx("span", __assign({ className: "window-title" }, { children: title }))] })), _jsx("div", __assign({ ref: contentRef, className: "resizable-window-content" }, { children: typeof children === 'function' ? children(size) : children })), resizable && _jsx("div", { className: "resize-handle" }), " "] })));
}
