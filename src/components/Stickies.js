import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Stickies.css';

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

export default function Stickies(_a) {
    var onClose = _a.onClose, onNewSticky = _a.onNewSticky;
    var _b = useState([]), stickies = _b[0], setStickies = _b[1];
    useEffect(function () {
        var savedStickies = localStorage.getItem('stickies');
        if (savedStickies) {
            setStickies(JSON.parse(savedStickies));
        }
    }, []);
    useEffect(function () {
        localStorage.setItem('stickies', JSON.stringify(stickies));
    }, [stickies]);
    var addSticky = function () {
        var newSticky = {
            id: Date.now(),
            content: '',
            position: { x: Math.random() * 200, y: Math.random() * 200 },
            size: { width: 200, height: 200 },
        };
        setStickies(__spreadArray(__spreadArray([], stickies, true), [newSticky], false));
    };
    var updateSticky = function (id, updates) {
        setStickies(stickies.map(function (sticky) { return sticky.id === id ? __assign(__assign({}, sticky), updates) : sticky; }));
    };
    var deleteSticky = function (id) {
        setStickies(stickies.filter(function (sticky) { return sticky.id !== id; }));
    };
    useEffect(function () {
        if (onNewSticky) {
            onNewSticky(addSticky);
        }
    }, [onNewSticky]);
    return (_jsx(ResizableWindow, __assign({ title: "Stickies", onClose: onClose, appName: "stickies", initialWidth: 300, initialHeight: 400 }, { children: _jsxs("div", __assign({ className: "stickies-container" }, { children: [_jsx("button", __assign({ onClick: addSticky }, { children: "Add Sticky" })), stickies.map(function (sticky) { return (_jsx(Sticky, { sticky: sticky, updateSticky: updateSticky, deleteSticky: deleteSticky }, sticky.id)); })] })) })));
}
function Sticky(_a) {
    var sticky = _a.sticky, updateSticky = _a.updateSticky, deleteSticky = _a.deleteSticky;
    return (_jsxs("div", __assign({ className: "sticky", style: {
            left: sticky.position.x,
            top: sticky.position.y,
            width: sticky.size.width,
            height: sticky.size.height,
        } }, { children: [_jsx("textarea", { value: sticky.content, onChange: function (e) { return updateSticky(sticky.id, { content: e.target.value }); } }), _jsx("button", __assign({ onClick: function () { return deleteSticky(sticky.id); } }, { children: "Delete" }))] })));
}
