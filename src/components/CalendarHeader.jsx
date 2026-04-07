import React from 'react';

const CalendarHeader = () => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none relative h-[66px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="5" x2="0" y2="66" stroke="#ccb57c" strokeOpacity="0.82" strokeWidth="1.6" />
          <line x1="50" y1="5" x2="100" y2="66" stroke="#ccb57c" strokeOpacity="0.82" strokeWidth="1.6" />
        </svg>
        <div className="absolute left-1/2 top-[1px] -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-[#262629] shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
      </div>

      <div className="relative z-10 -mt-[4px] w-full h-[11px] rounded-none border-b border-[#d9caa3] bg-[linear-gradient(180deg,#efe1bf_0%,#e5d2ab_100%)] shadow-[0_1px_2px_rgba(67,53,33,0.18)]" />

      <div className="absolute inset-x-0 top-[76px] h-2 bg-gradient-to-b from-[#92754d]/14 to-transparent blur-[1px]" />

      <div className="relative z-0 -mt-[1px] h-[1px] w-full bg-[#eddcb6]/45" />
    </div>
  );
};

export default CalendarHeader;
