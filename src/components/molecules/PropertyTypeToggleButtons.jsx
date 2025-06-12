import React from 'react';
import Button from '@/components/atoms/Button';

const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'];

const PropertyTypeToggleButtons = ({ selectedTypes, onToggle }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Property Types</label>
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map(type => (
          <Button
            key={type}
            type="button"
            onClick={() => onToggle(type)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              selectedTypes.includes(type)
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeToggleButtons;