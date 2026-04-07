import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { StickyNote, Calendar, Info } from 'lucide-react';

export function NotesPanel({ currentDate, startDate, endDate }) {
  const [noteContent, setNoteContent] = useState('');

  // Determine the current context key
  const getStorageKey = () => {
    if (startDate && endDate) {
      return `notes_${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}`;
    }
    return `notes_month_${format(currentDate, 'yyyy-MM')}`;
  };

  const currentKey = getStorageKey();

  useEffect(() => {
    // Load note for current context
    const savedNote = localStorage.getItem(currentKey) || '';
    setNoteContent(savedNote);
  }, [currentKey]);

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setNoteContent(val);
    if (val.trim() === '') {
      localStorage.removeItem(currentKey);
    } else {
      localStorage.setItem(currentKey, val);
    }
  };

  const isRangeSelected = startDate && endDate;

  return (
    <div className="w-full md:w-80 lg:w-96 bg-amber-50 p-6 md:p-8 flex flex-col h-full rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl border-t md:border-t-0 md:border-l border-amber-200/50 shadow-inner">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200/60">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
          <StickyNote className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-900 leading-tight">
            Notes & Scribbles
          </h3>
          <p className="text-xs text-amber-700/70 mt-0.5 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {isRangeSelected 
              ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}` 
              : format(currentDate, 'MMMM yyyy')}
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col relative group">
        <textarea
          value={noteContent}
          onChange={handleNoteChange}
          placeholder={isRangeSelected 
            ? "Jot down plans for this selected trip/date range..." 
            : "Write down monthly goals, tasks, or general reminders..."}
          className="flex-1 w-full bg-transparent resize-none outline-none text-amber-900 placeholder:text-amber-700/40 text-[15px] leading-relaxed custom-scrollbar font-sans"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(217, 119, 6, 0.1) 31px, rgba(217, 119, 6, 0.1) 32px)",
            lineHeight: "32px",
            paddingTop: "6px"
          }}
        />
        
        {/* Subtle hint when hovering */}
        <div className="absolute -bottom-4 right-0 text-[10px] text-amber-600/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Info className="w-3 h-3" /> Auto-saved
        </div>
      </div>
    </div>
  );
}
