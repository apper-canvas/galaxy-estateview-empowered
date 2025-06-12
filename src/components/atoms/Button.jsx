import React from 'react';

const Button = ({ children, className = '', onClick, type = 'button', ...props }) => {
  const { icon, ...restProps } = props; // Filter out 'icon' if passed directly as prop

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg transition-colors font-medium ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;