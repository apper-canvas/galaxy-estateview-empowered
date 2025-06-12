import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const PropertyStats = ({ bedrooms, bathrooms, squareFeet, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-6 text-gray-600 ${className}`}>
      {bedrooms !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Bed" className="w-5 h-5" />
          <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
        </div>
      )}
      {bathrooms !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Bath" className="w-5 h-5" />
          <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
        </div>
      )}
      {squareFeet !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Square" className="w-5 h-5" />
          <span>{squareFeet.toLocaleString()} sq ft</span>
        </div>
      )}
    </div>
  );
};

export default PropertyStats;
import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const PropertyStats = ({ bedrooms, bathrooms, squareFeet, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-6 text-gray-600 ${className}`}>
      {bedrooms !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Bed" className="w-5 h-5" />
          <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
        </div>
      )}
      {bathrooms !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Bath" className="w-5 h-5" />
          <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
        </div>
      )}
      {squareFeet !== undefined && (
        <div className="flex items-center space-x-2">
          <ApperIcon name="Square" className="w-5 h-5" />
          <span>{squareFeet.toLocaleString()} sq ft</span>
        </div>
      )}
    </div>
  );
};

export default PropertyStats;