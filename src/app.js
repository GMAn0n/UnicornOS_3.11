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
import { useState, useCallback } from 'react';
import { MenuBar } from './components/MenuBar';
import { FileExplorer } from './components/FileExplorer';
import './App.css';
// Import all your application components here
import Calcuwulator from './components/Calcuwulator';
import Calendar from './components/Calendar';
import Notepad from './components/Notepad';
import Stickies from './components/Stickies';
import Terminal from './components/Terminal';
import Paint from './components/Paint';
import VirtualUnicorn from './components/VirtualUnicorn';
import MemojiMinesweeper from './components/MemojiMinesweeper';
import Bluwumbuwurg from './components/Bluwumbuwurg';
import UwUScape from './components/UwUScape';
import BlackMarketBeta from './components/BlackMarketBeta';
import BlackMarketV2 from './components/BlackMarketV2';
import BlackMarketV3 from './components/BlackMarketV3';
import BlackMarketLiquidity from './components/BlackMarketLiquidity';
import PurityFinance from './components/PurityFinance';
import BuwutCamp from './components/BuwutCamp';
function App() {
    var _a = useState([]), openApps = _a[0], setOpenApps = _a[1];
    var _b = useState(false), isFileExplorerOpen = _b[0], setIsFileExplorerOpen = _b[1];
    var _c = useState(null), addNewSticky = _c[0], setAddNewSticky = _c[1];
    var openApp = function (appName) {
        if (!openApps.includes(appName)) {
            setOpenApps(__spreadArray(__spreadArray([], openApps, true), [appName], false));
        }
    };
    var closeApp = function (appName) {
        setOpenApps(openApps.filter(function (app) { return app !== appName; }));
    };
    var handleNewSticky = useCallback(function () {
        if (addNewSticky) {
            addNewSticky();
        }
    }, [addNewSticky]);
    var renderApp = function (appName) {
        switch (appName.toLowerCase()) {
            case 'calcuwulator':
                return _jsx(Calcuwulator, { onClose: function () { return closeApp('Calcuwulator'); } }, appName);
            case 'calendar':
                return _jsx(Calendar, { onClose: function () { return closeApp('Calendar'); } }, appName);
            case 'notepad':
                return _jsx(Notepad, { onClose: function () { return closeApp('Notepad'); } }, appName);
            case 'stickies':
                return (_jsx(Stickies, { onClose: function () { return closeApp('Stickies'); }, onNewSticky: function (callback) { return setAddNewSticky(function () { return callback; }); } }, appName));
            case 'terminal':
                return _jsx(Terminal, { onClose: function () { return closeApp('Terminal'); } }, appName);
            case 'paint':
                return _jsx(Paint, { onClose: function () { return closeApp('Paint'); } }, appName);
            case 'virtual unicorn':
                return _jsx(VirtualUnicorn, { onClose: function () { return closeApp('Virtual Unicorn'); } }, appName);
            case 'memoji minesweeper':
                return _jsx(MemojiMinesweeper, { onClose: function () { return closeApp('Memoji Minesweeper'); } }, appName);
            case 'bluwumbuwurg':
                return _jsx(Bluwumbuwurg, { onClose: function () { return closeApp('Bluwumbuwurg'); } }, appName);
            case 'uwuscape':
                return _jsx(UwUScape, { onClose: function () { return closeApp('UwUScape'); } }, appName);
            case 'black market beta':
                return _jsx(BlackMarketBeta, { onClose: function () { return closeApp('Black Market Beta'); } }, appName);
            case 'black market v2':
                return _jsx(BlackMarketV2, { onClose: function () { return closeApp('Black Market V2'); } }, appName);
            case 'black market v3':
                return _jsx(BlackMarketV3, { onClose: function () { return closeApp('Black Market V3'); } }, appName);
            case 'black market liquidity':
                return _jsx(BlackMarketLiquidity, { onClose: function () { return closeApp('Black Market Liquidity'); } }, appName);
            case 'purity finance':
                return _jsx(PurityFinance, { onClose: function () { return closeApp('Purity Finance'); } }, appName);
            case 'buwut camp':
                return _jsx(BuwutCamp, { onClose: function () { return closeApp('Buwut Camp'); } }, appName);
            default: return null;
        }
    };
    return (_jsxs("div", __assign({ className: "App" }, { children: [_jsx(MenuBar, { onFileExplorerClick: function () { return setIsFileExplorerOpen(true); }, isWalletConnected: false, onWalletToggle: function () { }, isStickiesOpen: openApps.includes('Stickies'), onNewStickyClick: handleNewSticky, version: "3.1" // Add this line to display the version number
             }), _jsx("div", __assign({ className: "desktop" }, { children: _jsxs("div", __assign({ className: "icon hard-disk", onClick: function () { return setIsFileExplorerOpen(true); } }, { children: [_jsx("span", __assign({ className: "icon-emoji" }, { children: "\uD83D\uDCBE" })), _jsx("span", __assign({ className: "icon-text" }, { children: "Hard Disk" }))] })) })), isFileExplorerOpen && (_jsx(FileExplorer, { onAppClick: openApp, onClose: function () { return setIsFileExplorerOpen(false); } })), openApps.map(function (app) { return renderApp(app); })] })));
}
export default App;
