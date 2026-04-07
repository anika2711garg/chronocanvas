import React from 'react';
import { WallCalendar } from './components/WallCalendar';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-blue-200">
      {/* Background wallpaper effect to mimic a wall */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-cover bg-center" 
        style={{ backgroundImage: 'radial-gradient(circle at center, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />
      
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800 tracking-tight">
            ChronoCanvas
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Interactive Wall Calendar</p>
        </div>
        
        <WallCalendar />
      </div>
    </div>
  );
}

export default App;
