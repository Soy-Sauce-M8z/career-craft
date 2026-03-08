import React from 'react';

export const ProgressBar = ({ current, max, label, color = 'var(--neon-cyan)', height = '8px' }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div style={{ width: '100%', marginBottom: '1rem' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>{label}</span>
          <span>{current} / {max}</span>
        </div>
      )}
      <div style={{ 
        width: '100%', 
        height: height, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.5s ease-in-out',
          borderRadius: '4px'
        }} />
      </div>
    </div>
  );
};
