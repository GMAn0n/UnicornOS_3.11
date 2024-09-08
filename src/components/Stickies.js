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
import { useState, useEffect } from 'react';
import './Stickies.css';
export default function Stickies(_a) {
    var onClose = _a.onClose, onNewSticky = _a.onNewSticky;
    var _b = useState([]), stickies = _b[0], setStickies = _b[1];
    var _c = useState(''), lastColor = _c[0], setLastColor = _c[1];
    useEffect(function () {
        loadStickies();
    }, []);
    useEffect(function () {
        onNewSticky(addSticky);
    }, [onNewSticky]);
    var loadStickies = function () {
        var savedStickies = localStorage.getItem('stickies');
        if (savedStickies) {
            setStickies(JSON.parse(savedStickies));
        }
        else {
            // If no stickies exist, create a new one
            addSticky();
        }
    };
    var saveStickiesToLocalStorage = function (updatedStickies) {
        localStorage.setItem('stickies', JSON.stringify(updatedStickies));
    };
    var getRandomPosition = function () {
        var x = Math.random() * (window.innerWidth - 200);
        var y = Math.random() * (window.innerHeight - 200);
        return { x: x, y: y };
    };
    var getRandomPastelColor = function () {
        var hue = Math.floor(Math.random() * 360);
        var saturation = 70 + Math.random() * 10; // 70-80%
        var lightness = 80 + Math.random() * 10; // 80-90%
        var newColor = "hsl(".concat(hue, ", ").concat(saturation, "%, ").concat(lightness, "%)");
        if (newColor === lastColor) {
            return getRandomPastelColor(); // Recursively try again if it's the same as the last color
        }
        setLastColor(newColor);
        return newColor;
    };
    var addSticky = function () {
        var newSticky = {
            id: Date.now(),
            content: '',
            color: getRandomPastelColor(),
            position: getRandomPosition(),
        };
        var updatedStickies = __spreadArray(__spreadArray([], stickies, true), [newSticky], false);
        setStickies(updatedStickies);
        saveStickiesToLocalStorage(updatedStickies);
    };
    var updateSticky = function (id, content) {
        var updatedStickies = stickies.map(function (sticky) {
            return sticky.id === id ? __assign(__assign({}, sticky), { content: content }) : sticky;
        });
        setStickies(updatedStickies);
        saveStickiesToLocalStorage(updatedStickies);
    };
    var moveSticky = function (id, position) {
        var updatedStickies = stickies.map(function (sticky) {
            return sticky.id === id ? __assign(__assign({}, sticky), { position: position }) : sticky;
        });
        setStickies(updatedStickies);
        saveStickiesToLocalStorage(updatedStickies);
    };
    var deleteSticky = function (id) {
        var updatedStickies = stickies.filter(function (sticky) { return sticky.id !== id; });
        setStickies(updatedStickies);
        saveStickiesToLocalStorage(updatedStickies);
    };
    return (_jsx("div", __assign({ className: "stickies-container" }, { children: stickies.map(function (sticky) { return (_jsxs("div", __assign({ className: "sticky", style: {
                backgroundColor: sticky.color,
                left: sticky.position.x,
                top: sticky.position.y,
            }, draggable: true, onDragEnd: function (e) { return moveSticky(sticky.id, { x: e.clientX, y: e.clientY }); } }, { children: [_jsx("textarea", { value: sticky.content, onChange: function (e) { return updateSticky(sticky.id, e.target.value); } }), _jsx("button", __assign({ className: "delete-sticky", onClick: function () { return deleteSticky(sticky.id); } }, { children: "\u00D7" }))] }), sticky.id)); }) })));
}
