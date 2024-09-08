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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './GuestBuwuk.css';
export default function GuestBuwuk(_a) {
    var onClose = _a.onClose;
    var _b = useState(''), guestName = _b[0], setGuestName = _b[1];
    var _c = useState(''), guestMessage = _c[0], setGuestMessage = _c[1];
    var _d = useState([]), entries = _d[0], setEntries = _d[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (guestName && guestMessage) {
            setEntries(__spreadArray(__spreadArray([], entries, true), [{ name: guestName, message: guestMessage }], false));
            setGuestName('');
            setGuestMessage('');
        }
    };
    return (_jsx(ResizableWindow, __assign({ title: "Guest Buwuk", onClose: onClose, appName: "guestbuwuk", initialWidth: 500, initialHeight: 600 }, { children: _jsxs("div", __assign({ className: "guest-buwuk" }, { children: [_jsx("h2", { children: "Guest Buwuk" }), _jsxs("form", __assign({ onSubmit: handleSubmit }, { children: [_jsx("input", { type: "text", placeholder: "Your Name", value: guestName, onChange: function (e) { return setGuestName(e.target.value); }, required: true }), _jsx("textarea", { placeholder: "Your Message", value: guestMessage, onChange: function (e) { return setGuestMessage(e.target.value); }, required: true }), _jsx("button", __assign({ type: "submit" }, { children: "Submit" }))] })), _jsx("div", __assign({ className: "entries" }, { children: entries.map(function (entry, index) { return (_jsxs("div", __assign({ className: "entry" }, { children: [_jsx("h3", { children: entry.name }), _jsx("p", { children: entry.message })] }), index)); }) }))] })) })));
}
