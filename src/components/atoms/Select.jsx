import React from 'react';

const Select = ({ children, className = '', value, onChange, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
import React from 'react';

const Select = ({ children, className = '', value, onChange, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;