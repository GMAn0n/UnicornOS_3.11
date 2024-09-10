import { jsx as _jsx } from "react/jsx-runtime";
import { ResizableWindow } from './ResizableWindow';
import './UwUScape.css';

var __assign = (this && this.__assign) || function () {
    // ... (rest of the __assign function)
};

export default function UwUScape(_a) {
    var onClose = _a.onClose;
    return (_jsx(ResizableWindow, __assign({ title: "UwUScape", onClose: onClose, appName: "uwuscape", initialWidth: 800, initialHeight: 600 }, { children: function (_a) {
            var width = _a.width, height = _a.height;
            return (_jsx("iframe", { src: "https://uwu.direct", title: "UwUScape", width: "100%", height: "100%", style: { border: 'none' } }));
        } })));
}
