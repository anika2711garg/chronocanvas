import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, 
  isToday, isAfter, isBefore, addMonths, subMonths,
  isWeekend
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function CalendarGrid({ 
  currentDate, setCurrentDate, 
  startDate, setStartDate, 
  endDate, setEndDate 
}) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfGrid = startOfWeek(monthStart);
  const endDateOfGrid = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDateOfGrid,
    end: endDateOfGrid
  });

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day) => {
    // If no start date, or both start and end exist, start a new selection
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } 
    // If start date exists but no end date
    else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        // Reverse selection: clicked day becomes start, old start becomes end
        setEndDate(startDate);
        setStartDate(day);
      } else if (isSameDay(day, startDate)) {
        // Reset if clicking the same date
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(day);
      }
    }
  };

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    return (isAfter(day, startDate) || isSameDay(day, startDate)) && 
           (isBefore(day, endDate) || isSameDay(day, endDate));
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-b-2xl md:rounded-bl-2xl md:rounded-br-none shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-slate-400 py-2 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-grow auto-rows-fr">
        {days.map((day, idx) => {
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isHighlighted = isInRange(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const weekend = isWeekend(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                "relative flex items-center justify-center rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 border border-transparent",
                // Current month vs outside month
                !isCurrentMonth && "text-slate-300 pointer-events-none",
                isCurrentMonth && "text-slate-700 hover:border-slate-200 hover:bg-slate-50",
                isCurrentMonth && weekend && !isHighlighted && "text-rose-500",
                
                // Selection states
                isHighlighted && "bg-blue-100 text-blue-900 border-none",
                (isSelectedStart || isSelectedEnd) && "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:border-blue-700",
                
                // Connecting logic for rounded corners when in range
                isHighlighted && !isSelectedStart && !isSelectedEnd && "rounded-none",
                isHighlighted && isSelectedStart && !isSelectedEnd && endDate && "rounded-r-none",
                isHighlighted && isSelectedEnd && "rounded-l-none"
              )}
            >
              {isToday(day) && !isSelectedStart && !isSelectedEnd && !isHighlighted && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              )}
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
