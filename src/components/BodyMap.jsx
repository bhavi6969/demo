import React, { useState } from 'react';

const BodyMap = ({ onSelectPart, selectedPart }) => {
  const parts = [
    { id: 'head', title: 'Head / Face', d: 'M150 10 C 130 10, 130 50, 150 50 C 170 50, 170 10, 150 10 Z' },
    { id: 'chest', title: 'Chest / Torso', d: 'M130 60 L 170 60 L 175 140 L 125 140 Z' },
    { id: 'leftArm', title: 'Left Arm', d: 'M120 60 L 90 120 L 105 125 L 125 70 Z' },
    { id: 'rightArm', title: 'Right Arm', d: 'M180 60 L 210 120 L 195 125 L 175 70 Z' },
    { id: 'leftLeg', title: 'Left Leg', d: 'M125 145 L 110 240 L 130 240 L 145 145 Z' },
    { id: 'rightLeg', title: 'Right Leg', d: 'M175 145 L 190 240 L 170 240 L 155 145 Z' },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Select Body Region</p>
      <div className="relative w-48 h-64 bg-slate-50/50 rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center p-4">
        <svg viewBox="0 0 300 260" className="w-full h-full drop-shadow-md">
          {parts.map((part) => (
            <path
              key={part.id}
              d={part.d}
              onClick={() => onSelectPart(part.title)}
              onMouseEnter={(e) => { e.currentTarget.style.fill = '#86cdc1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.fill = selectedPart === part.title ? '#52a2a2' : '#e2e8f0'; }}
              fill={selectedPart === part.title ? '#52a2a2' : '#e2e8f0'}
              stroke="#cbd5e1"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-300 hover:scale-105 origin-center"
              style={{ transformOrigin: 'center' }}
            >
              <title>{part.title}</title>
            </path>
          ))}
        </svg>
      </div>
      {selectedPart && (
        <div className="mt-3 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-200 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
          Selected: {selectedPart}
        </div>
      )}
    </div>
  );
};

export default BodyMap;
