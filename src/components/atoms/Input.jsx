import React from 'react';

const Input = ({ className = '', type = 'text', value, onChange, placeholder, required, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent ${className}`}
      required={required}
      {...props}
    />
  );
};

export default Input;
import React from 'react';

const Input = ({ className = '', type = 'text', value, onChange, placeholder, required, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent ${className}`}
      required={required}
      {...props}
    />
  );
};

export default Input;