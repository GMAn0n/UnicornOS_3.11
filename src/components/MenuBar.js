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
import './MenuBar.css';
export function MenuBar(_a) {
    var onFileExplorerClick = _a.onFileExplorerClick, isWalletConnected = _a.isWalletConnected, onWalletToggle = _a.onWalletToggle, isStickiesOpen = _a.isStickiesOpen, onNewStickyClick = _a.onNewStickyClick, version = _a.version;
    var _b = useState(false), isFileMenuOpen = _b[0], setIsFileMenuOpen = _b[1];
    return (_jsxs("div", __assign({ className: "menu-bar" }, { children: [_jsxs("div", __assign({ className: "menu-item" }, { children: [_jsx("button", __assign({ onClick: function () { return setIsFileMenuOpen(!isFileMenuOpen); } }, { children: "\uD83C\uDF4A File" })), isFileMenuOpen && (_jsx("div", __assign({ className: "dropdown-menu" }, { children: _jsx("button", __assign({ onClick: onFileExplorerClick }, { children: "\uD83D\uDCC1 File Explorer" })) })))] })), _jsx("button", __assign({ onClick: onWalletToggle }, { children: isWalletConnected ? '🔓 Disconnect Wallet' : '🔒 Connect Wallet' })), isStickiesOpen && (_jsx("button", __assign({ onClick: onNewStickyClick }, { children: "\uD83D\uDCDD New Sticky" }))), _jsxs("span", __assign({ className: "version" }, { children: ["UnicornOS ", version] }))] })));
}
