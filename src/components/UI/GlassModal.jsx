import React from 'react';

export const GlassModal = ({ title, children, onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 999, backdropFilter: 'blur(4px)'
    }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          &times;
        </button>
        {title && <h2 className="glow-text" style={{ marginBottom: '1.5rem' }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};
