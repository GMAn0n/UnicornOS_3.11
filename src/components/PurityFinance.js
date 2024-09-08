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
import { ResizableWindow } from './ResizableWindow';
import './PurityFinance.css';
export default function PurityFinance(_a) {
    var onClose = _a.onClose;
    return (_jsx(ResizableWindow, __assign({ title: "Purity Finance", onClose: onClose, appName: "purityfinance", initialWidth: 800, initialHeight: 600 }, { children: function (_a) {
            var width = _a.width, height = _a.height;
            return (_jsx("iframe", { src: "https://purity.finance", title: "Purity Finance", width: "100%", height: "100%", style: { border: 'none' } }));
        } })));
}
