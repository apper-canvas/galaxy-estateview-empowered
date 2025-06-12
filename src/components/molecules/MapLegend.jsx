import React from 'react';

const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
        <span>Available</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-accent rounded"></div>
        <span>Selected</span>
      </div>
    </div>
  );
};

export default MapLegend;
import React from 'react';

const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
        <span>Available</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-accent rounded"></div>
        <span>Selected</span>
      </div>
    </div>
  );
};

export default MapLegend;