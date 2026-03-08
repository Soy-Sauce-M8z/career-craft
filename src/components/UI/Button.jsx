import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-neon';
      case 'secondary': return 'btn-neon-purple';
      case 'ghost': return 'btn-ghost';
      default: return 'btn-neon';
    }
  };

  return (
    <button 
      className={`${getVariantClass()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
