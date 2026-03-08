import React from 'react';

export const Badge = ({ children, color = 'var(--neon-cyan)' }) => {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.6rem',
      borderRadius: '8px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'var(--text-secondary)',
      backgroundColor: 'var(--bg-input-card)',
      border: `1px solid ${color}`,
      marginRight: '0.5rem',
      marginBottom: '0.5rem'
    }}>
      {children}
    </span>
  );
};
