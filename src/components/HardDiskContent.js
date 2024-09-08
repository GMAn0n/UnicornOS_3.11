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
import './HardDiskContent.css';
export function HardDiskContent(_a) {
    var onAppClick = _a.onAppClick, onClose = _a.onClose;
    var apps = [
        { name: 'Calculator', icon: '🧮' },
        { name: 'Calendar', icon: '📅' },
        { name: 'Notepad', icon: '📝' },
        { name: 'Stickies', icon: '🗒️' },
        { name: 'Terminal', icon: '💻' },
        { name: 'Bluwumbuwurg', icon: '📈' },
        { name: 'UwUScape', icon: '🌐' },
        { name: 'Virtual Unicorn', icon: '🦄' },
    ];
    return (_jsxs("div", __assign({ className: "window hard-disk-window" }, { children: [_jsxs("div", __assign({ className: "window-header" }, { children: [_jsx("span", { children: "Hard Disk" }), _jsx("button", __assign({ onClick: onClose }, { children: "\u00D7" }))] })), _jsx("div", __assign({ className: "window-content" }, { children: _jsx("div", __assign({ className: "icon-grid" }, { children: apps.map(function (app) { return (_jsxs("button", __assign({ className: "app-icon", onClick: function () { return onAppClick(app.name.toLowerCase().replace(' ', '')); } }, { children: [_jsx("span", __assign({ className: "icon" }, { children: app.icon })), _jsx("span", __assign({ className: "name" }, { children: app.name }))] }), app.name)); }) })) }))] })));
}
