import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import PropertyStats from '@/components/molecules/PropertyStats';

const MapPropertyInfoPanel = ({ selectedProperty, onViewDetails, onClosePanel }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {selectedProperty ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 overflow-y-auto"
        >
          {/* Property Image */}
          <div className="relative">
            <img
              src={selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-full h-48 object-cover"
            />
            <Button
              onClick={onClosePanel}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full transition-colors bg-transparent"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>

          {/* Property Details */}
          <div className="p-4">
            <div className="text-xl font-bold text-accent mb-2">
              {formatPrice(selectedProperty.price)}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {selectedProperty.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedProperty.city}, {selectedProperty.state}
            </p>

            {/* Property Stats */}
            <PropertyStats
              bedrooms={selectedProperty.bedrooms}
              bathrooms={selectedProperty.bathrooms}
              squareFeet={selectedProperty.squareFeet}
              className="mb-4 text-sm"
            />

            {/* Property Type */}
            <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mb-4">
              {selectedProperty.propertyType}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {selectedProperty.description}
            </p>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                onClick={() => onViewDetails(selectedProperty.id)}
                className="w-full bg-secondary text-white py-2 px-4 hover:bg-secondary/90"
              >
                View Details
              </Button>
              <Button className="w-full border border-gray-300 text-gray-700 py-2 px-4 hover:bg-gray-50 bg-transparent">
                Save Property
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <ApperIcon name="MapPin" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Select a Property</h3>
            <p className="text-sm text-gray-600">
              Click on a price marker to view property details
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPropertyInfoPanel;