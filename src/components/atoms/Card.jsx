import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;