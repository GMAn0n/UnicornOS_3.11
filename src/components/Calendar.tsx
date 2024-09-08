import React, { useState, useEffect } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Calendar.css';

interface CalendarProps {
  onClose: () => void;
  isFullscreenOnMobile?: boolean;
}

interface CalendarEvent {
  date: string;
  title: string;
}

export default function Calendar({ onClose, isFullscreenOnMobile = true }: CalendarProps) {
  const [windowSize, setWindowSize] = useState({ width: '400px', height: '500px' });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const saveEvents = (updatedEvents: CalendarEvent[]) => {
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const addEvent = () => {
    if (selectedDate && newEventTitle) {
      const newEvent: CalendarEvent = { date: selectedDate, title: newEventTitle };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      setNewEventTitle('');
      setSelectedDate(null);
    }
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const hasEvent = events.some(event => event.date === date);
      days.push(
        <div 
          key={i} 
          className={`day ${hasEvent ? 'has-event' : ''} ${date === selectedDate ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const eventsForSelectedDate = selectedDate 
    ? events.filter(event => event.date === selectedDate)
    : [];

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && isFullscreenOnMobile) {
        setWindowSize({ width: '100vw', height: '100vh' });
      } else {
        setWindowSize({ width: '400px', height: '500px' });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isFullscreenOnMobile]);

  return (
    <ResizableWindow 
      title="Calendar" 
      onClose={onClose} 
      appName="calendar"
      initialWidth={windowSize.width}
      initialHeight={windowSize.height}
      isFullscreenOnMobile={isFullscreenOnMobile}
    >
      <div className="calendar">
        <div className="header">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>{'<'}</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>{'>'}</button>
        </div>
        <div className="days-of-week">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-of-week">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {renderCalendar()}
        </div>
        <div className="event-form">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Enter event title"
          />
          <button onClick={addEvent} disabled={!selectedDate || !newEventTitle}>Add Event</button>
        </div>
        {selectedDate && (
          <div className="events-list">
            <h3>Events for {selectedDate}:</h3>
            {eventsForSelectedDate.length > 0 ? (
              <ul>
                {eventsForSelectedDate.map((event, index) => (
                  <li key={index}>{event.title}</li>
                ))}
              </ul>
            ) : (
              <p>No events for this date.</p>
            )}
          </div>
        )}
      </div>
    </ResizableWindow>
  );
}