import React, { useState, useRef, useContext } from 'react';
import html2canvas from 'html2canvas';
import { HeroSection } from './HeroSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { Camera, Moon, Search, Sun } from 'lucide-react';
import { ThemeContext } from '../App';

const MONTH_IMAGES = {
  0: '/winter.png',
  1: '/winter.png',
  2: '/spring.png',
  3: '/spring.png',
  4: '/spring.png',
  5: '/summer.png',
  6: '/summer.png',
  7: '/summer.png',
  8: '/autumn.png',
  9: '/autumn.png',
  10: '/autumn.png',
  11: '/winter.png'
};

export function WallCalendar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [imagePalette, setImagePalette] = useState(null);
  const calendarRef = useRef(null);

  const handleJumpToToday = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleExportImage = async () => {
    if (!calendarRef.current) return;
    try {
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ChronoCanvas-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export calendar', err);
    }
  };

  const getSeasonInfo = (date) => {
    const month = date.getMonth();
    if (month === 11 || month === 0 || month === 1) return 'winter';
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    return 'autumn';
  };

  const currentSeason = getSeasonInfo(currentDate);

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div 
        ref={calendarRef} 
        data-season={currentSeason}
        style={imagePalette || undefined}
        className="calendar-sheet w-full flex flex-col"
      >
        <div className="spiral-wrap">
          <div className="spiral-hook" />
          <div className="spiral-line" />
          <div className="spiral-rings" />
        </div>

        <div className="sheet-panel overflow-hidden rounded-b-[8px] rounded-t-[3px] border border-[#cfc7be] dark:border-slate-700 bg-[#f6f2ee] dark:bg-slate-800">
          <div className="sheet-topbar px-4 sm:px-6 h-11 flex items-center justify-between border-b border-[#dfd7cd] dark:border-slate-700/80 bg-[#f5f1ec] dark:bg-slate-800/95">
            <div className="sheet-brand dark:text-slate-100">ChronoCanvas</div>
            <div className="flex items-center gap-1.5">
              <button onClick={toggleDarkMode} className="sheet-icon-btn" aria-label="Toggle theme">
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button onClick={handleExportImage} className="sheet-icon-btn" aria-label="Export image">
                <Camera className="w-3.5 h-3.5" />
              </button>
              <button className="sheet-icon-btn" aria-label="Search">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-[#f7f3ee] dark:bg-slate-800">
            <HeroSection 
              currentDate={currentDate} 
              onPaletteExtract={setImagePalette}
            />

            <div className="grid lg:grid-cols-[1fr_230px] gap-0 px-4 sm:px-5 py-3.5 sm:py-4.5">
              <CalendarGrid 
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onJumpToToday={handleJumpToToday}
                onClearSelection={handleClearSelection}
                hasSelection={!!startDate}
              />

              <NotesPanel 
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>

          <div className="h-24 sm:h-28 border-t border-[#d8d0c7] dark:border-slate-700/60 bg-cover bg-center" style={{ backgroundImage: `url(${MONTH_IMAGES[currentDate.getMonth()]})` }} />
        </div>
      </div>
    </div>
  );
}
