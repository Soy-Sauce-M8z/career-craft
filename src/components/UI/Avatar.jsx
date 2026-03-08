import React from 'react';

export const Avatar = ({ src, alt, size = '60px', border = 'var(--neon-cyan)', glow = true }) => {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `2px solid ${border}`,
      boxShadow: glow ? `0 0 10px ${border}` : 'none',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-dark)'
    }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: border }}>{alt ? alt.charAt(0).toUpperCase() : '?'}</span>
      )}
    </div>
  );
};
