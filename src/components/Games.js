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
import './Games.css';
export default function Games(_a) {
    var onClose = _a.onClose;
    return (_jsxs("div", __assign({ className: "window games" }, { children: [_jsxs("div", __assign({ className: "window-header" }, { children: [_jsx("span", { children: "Games" }), _jsx("button", __assign({ onClick: onClose }, { children: "\u00D7" }))] })), _jsx("div", __assign({ className: "window-content" }, { children: _jsx("iframe", { src: "https://unicornio.meme/", title: "Games", width: "100%", height: "100%", frameBorder: "0", allowFullScreen: true }) }))] })));
}
