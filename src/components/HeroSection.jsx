import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const MONTH_IMAGES = {
  0: "/winter.png", // Jan
  1: "/winter.png", // Feb
  2: "/spring.png", // Mar
  3: "/spring.png", // Apr
  4: "/spring.png", // May
  5: "/summer.png", // Jun
  6: "/summer.png", // Jul
  7: "/summer.png", // Aug
  8: "/autumn.png", // Sep
  9: "/autumn.png", // Oct
  10: "/autumn.png", // Nov
  11: "/winter.png"  // Dec
};

export function HeroSection({ currentDate }) {
  const monthIndex = currentDate.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none shadow-sm bg-slate-200">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt={`Scene for ${format(currentDate, 'MMMM')}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-white drop-shadow-md">
        <motion.h1 
          className="text-4xl sm:text-5xl font-light tracking-tight"
          key={`month-${monthIndex}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {format(currentDate, 'MMMM')}
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl font-medium text-white/80"
          key={`year-${currentDate.getFullYear()}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {format(currentDate, 'yyyy')}
        </motion.p>
      </div>
    </div>
  );
}
