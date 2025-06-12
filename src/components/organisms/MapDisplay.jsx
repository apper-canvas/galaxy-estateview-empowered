import React from 'react';
import MapPropertyMarker from '@/components/molecules/MapPropertyMarker';
import MapLegend from '@/components/molecules/MapLegend';

const MapDisplay = ({ properties, selectedProperty, onPropertyClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="flex-1 relative bg-gray-100 overflow-hidden">
      {/* Simulated Map */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Map Grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-line-${i}`}
              className="absolute border-gray-200 border-l"
              style={{ left: `${i * 5}%`, height: '100%' }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-line-${i}`}
              className="absolute border-gray-200 border-t"
              style={{ top: `${i * 5}%`, width: '100%' }}
            />
          ))}
        </div>

        {/* Property Markers */}
        {properties.map((property, index) => (
          <MapPropertyMarker
            key={property.id}
            property={property}
            index={index}
            isSelected={selectedProperty?.id === property.id}
            onClick={onPropertyClick}
            formatPrice={formatPrice}
          />
        ))}

        {/* Map Center Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg"></div>
      </div>

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
};

export default MapDisplay;