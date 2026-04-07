import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';

export function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Layout: Desktop is flex-row with Left (Hero + Grid) and Right (Notes).
  // Mobile is flex-col.
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Decorative Wall Hanger element */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-4 sm:h-6 bg-slate-300 rounded-full flex justify-between items-center px-4 shadow-sm relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-slate-400 before:rounded-full before:left-3 after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-slate-400 after:rounded-full after:right-3">
            <div className="w-16 h-8 border-2 border-slate-300 border-b-0 rounded-t-xl absolute -top-[1.125rem] sm:-top-7 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl shadow-slate-200/50 min-h-[700px] border border-slate-100 overflow-hidden">
        
        {/* Left Column: Image and Calendar Grid */}
        <div className="flex-1 flex flex-col min-w-0">
          <HeroSection 
            currentDate={currentDate} 
          />
          <CalendarGrid 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>

        {/* Right Column: Notes Block */}
        <NotesPanel 
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
        />
        
      </div>
    </div>
  );
}
