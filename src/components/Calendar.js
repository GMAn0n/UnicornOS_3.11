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
import { ResizableWindow } from './ResizableWindow';
import './Calendar.css';
export default function Calendar(_a) {
    var onClose = _a.onClose;
    var _b = useState(new Date()), currentDate = _b[0], setCurrentDate = _b[1];
    var _c = useState([]), events = _c[0], setEvents = _c[1];
    var _d = useState(''), newEventTitle = _d[0], setNewEventTitle = _d[1];
    var _e = useState(null), selectedDate = _e[0], setSelectedDate = _e[1];
    useEffect(function () {
        var savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);
    var daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    var saveEvents = function (updatedEvents) {
        localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    };
    var addEvent = function () {
        if (selectedDate && newEventTitle) {
            var newEvent = { date: selectedDate, title: newEventTitle };
            var updatedEvents = __spreadArray(__spreadArray([], events, true), [newEvent], false);
            setEvents(updatedEvents);
            saveEvents(updatedEvents);
            setNewEventTitle('');
            setSelectedDate(null);
        }
    };
    var renderCalendar = function () {
        var days = [];
        for (var i = 0; i < firstDayOfMonth; i++) {
            days.push(_jsx("div", { className: "empty-day" }, "empty-".concat(i)));
        }
        var _loop_1 = function (i) {
            var date = "".concat(currentDate.getFullYear(), "-").concat((currentDate.getMonth() + 1).toString().padStart(2, '0'), "-").concat(i.toString().padStart(2, '0'));
            var hasEvent = events.some(function (event) { return event.date === date; });
            days.push(_jsx("div", __assign({ className: "day ".concat(hasEvent ? 'has-event' : '', " ").concat(date === selectedDate ? 'selected' : ''), onClick: function () { return setSelectedDate(date); } }, { children: i }), i));
        };
        for (var i = 1; i <= daysInMonth; i++) {
            _loop_1(i);
        }
        return days;
    };
    var eventsForSelectedDate = selectedDate
        ? events.filter(function (event) { return event.date === selectedDate; })
        : [];
    return (_jsx(ResizableWindow, __assign({ title: "Calendar", onClose: onClose, appName: "calendar", initialWidth: 400, initialHeight: 600 }, { children: _jsxs("div", __assign({ className: "calendar" }, { children: [_jsxs("div", __assign({ className: "header" }, { children: [_jsx("button", __assign({ onClick: function () { return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); } }, { children: '<' })), _jsx("h2", { children: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }), _jsx("button", __assign({ onClick: function () { return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); } }, { children: '>' }))] })), _jsx("div", __assign({ className: "days-of-week" }, { children: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (day) { return (_jsx("div", __assign({ className: "day-of-week" }, { children: day }), day)); }) })), _jsx("div", __assign({ className: "days-grid" }, { children: renderCalendar() })), _jsxs("div", __assign({ className: "event-form" }, { children: [_jsx("input", { type: "text", value: newEventTitle, onChange: function (e) { return setNewEventTitle(e.target.value); }, placeholder: "Enter event title" }), _jsx("button", __assign({ onClick: addEvent, disabled: !selectedDate || !newEventTitle }, { children: "Add Event" }))] })), selectedDate && (_jsxs("div", __assign({ className: "events-list" }, { children: [_jsxs("h3", { children: ["Events for ", selectedDate, ":"] }), eventsForSelectedDate.length > 0 ? (_jsx("ul", { children: eventsForSelectedDate.map(function (event, index) { return (_jsx("li", { children: event.title }, index)); }) })) : (_jsx("p", { children: "No events for this date." }))] })))] })) })));
}
