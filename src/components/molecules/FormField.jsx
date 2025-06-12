import React from 'react';

const FormField = ({ label, id, children, className = '' }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { id }) : child
      )}
    </div>
  );
};

export default FormField;
import React from 'react';

const FormField = ({ label, id, children, className = '' }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {React.Children.map(children, child =>
        // Ensure child is a valid React element before cloning
        React.isValidElement(child) ? React.cloneElement(child, { id }) : child
      )}
    </div>
  );
};

export default FormField;