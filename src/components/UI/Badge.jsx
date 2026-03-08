import React from 'react';

export const Badge = ({ children, color = 'var(--neon-cyan)' }) => {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.4)',
      border: `1px solid ${color}`,
      boxShadow: `0 0 5px ${color}40`,
      marginRight: '0.5rem',
      marginBottom: '0.5rem'
    }}>
      {children}
    </span>
  );
};
