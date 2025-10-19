'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BentoGrid: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = "", children }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 max-w-7xl mx-auto p-4 ${className}`}
      style={{
        gridTemplateRows: "masonry",
      }}
    >
      {children}
    </div>
  );
};

export const BentoGridItem: React.FC<{
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}> = ({
  className = "",
  title,
  description,
  header,
  icon,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group relative col-span-1 row-span-1 rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition-all duration-300 hover:border-neutral-700 ${
        className
      }`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {header}
          {icon}
        </div>
        {title && (
          <h3 className="mt-4 font-semibold text-neutral-200 tracking-wide">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-2 text-sm text-neutral-400 tracking-normal leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  );
};