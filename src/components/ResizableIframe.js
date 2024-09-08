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
import './ResizableIframe.css';
export function ResizableIframe(_a) {
    var src = _a.src, title = _a.title, onClose = _a.onClose;
    var _b = useState({ width: 800, height: 600 }), size = _b[0], setSize = _b[1];
    var handleResize = function (e, direction) {
        // Implement resizing logic
    };
    return (_jsxs("div", __assign({ className: "window resizable-iframe", style: { width: size.width, height: size.height } }, { children: [_jsxs("div", __assign({ className: "window-header" }, { children: [_jsx("span", { children: title }), _jsx("button", __assign({ onClick: onClose }, { children: "\u00D7" }))] })), _jsx("div", __assign({ className: "window-content" }, { children: _jsx("iframe", { src: src, title: title, width: "100%", height: "100%" }) })), _jsx("div", { className: "resize-handle", onMouseDown: function (e) { return handleResize(e, 'se'); } })] })));
}
