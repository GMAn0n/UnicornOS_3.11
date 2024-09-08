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
import './Notepad.css';
export default function Notepad(_a) {
    var onClose = _a.onClose;
    var _b = useState(''), content = _b[0], setContent = _b[1];
    useEffect(function () {
        var savedContent = localStorage.getItem('notepadContent');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);
    var handleChange = function (e) {
        setContent(e.target.value);
        localStorage.setItem('notepadContent', e.target.value);
    };
    return (_jsx(ResizableWindow, __assign({ title: "Notepad", onClose: onClose, appName: "notepad", initialWidth: 400, initialHeight: 500 }, { children: _jsx("div", __assign({ className: "notepad" }, { children: _jsx("textarea", { value: content, onChange: handleChange, placeholder: "Type your notes here..." }) })) })));
}
