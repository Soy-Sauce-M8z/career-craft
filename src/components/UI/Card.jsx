import React from 'react';

export const Card = ({ children, className = '', hoverable = true, glow = false }) => {
  return (
    <div className={`glass-panel ${hoverable ? 'hoverable' : ''} ${glow ? 'glow' : ''} ${className}`} style={{
      /* Inline styles to supplement generic css for this specific card instance if needed */
    }}>
      {children}
    </div>
  );
};
