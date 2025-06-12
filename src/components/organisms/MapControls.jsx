import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const MapControls = ({ propertyCount, zoom, onZoomIn, onZoomOut }) => {
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-heading font-semibold text-primary">
            Map View
          </h1>
          <span className="text-sm text-gray-600">
            {propertyCount} properties
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={onZoomIn}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors bg-transparent"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </Button>
          <Button
            onClick={onZoomOut}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors bg-transparent"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapControls;