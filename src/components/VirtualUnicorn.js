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
import './VirtualUnicorn.css';
export default function VirtualUnicorn(_a) {
    var onClose = _a.onClose;
    return (_jsx(ResizableWindow, __assign({ title: "Virtual Unicorn", onClose: onClose, appName: "virtualunicorn", initialWidth: 800, initialHeight: 600 }, { children: function (_a) {
            var width = _a.width, height = _a.height;
            return (_jsx("iframe", { src: "https://unicorn.meme", title: "Virtual Unicorn", width: width, height: height - 30, style: { border: 'none' } }));
        } })));
}
