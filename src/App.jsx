import React, { useState, useEffect } from 'react';
import { WallCalendar } from './components/WallCalendar';

export const ThemeContext = React.createContext({});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || false;
  });

  const [activeThemeColor, setActiveThemeColor] = useState('blue'); // default winter

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, activeThemeColor, setActiveThemeColor }}>
      <div className="wall-backdrop min-h-screen flex items-center justify-center p-4 sm:p-8 selection:bg-[color:var(--color-active-100)] selection:text-[color:var(--ink-900)] transition-colors duration-300">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.52),transparent_35%),radial-gradient(circle_at_90%_30%,rgba(136,153,172,0.12),transparent_38%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[860px]">
          <WallCalendar />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
