import React from 'react';

export const Card = ({ children, className = '', hoverable = true, glow = false, style = {} }) => {
  return (
    <div className={`glass-panel ${hoverable ? 'hoverable' : ''} ${glow ? 'glow' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
};
