import { jsx as _jsx } from "react/jsx-runtime";
import { ResizableWindow } from './ResizableWindow';
import './BlackMarketBeta.css';

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

export default function BlackMarketBeta(_a) {
    var onClose = _a.onClose;
    return (_jsx(ResizableWindow, __assign({ title: "Black Market Beta", onClose: onClose, appName: "blackmarketbeta", initialWidth: 800, initialHeight: 600 }, { children: function (_a) {
            var width = _a.width, height = _a.height;
            return (_jsx("iframe", { src: "https://uwublkmktalphatestpreviewhos.uwu-direct.pages.dev/", title: "Black Market Beta", width: "100%", height: "100%", style: { border: 'none' } }));
        } })));
}
