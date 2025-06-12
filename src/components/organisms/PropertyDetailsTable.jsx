import React from 'react';

const PropertyDetailsTable = ({ property }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold text-primary mb-4">
        Property Details
      </h2>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Property Type:</span>
            <span className="font-medium">{property.propertyType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Square Footage:</span>
            <span className="font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Year Built:</span>
            <span className="font-medium">{property.yearBuilt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Listed:</span>
            <span className="font-medium">{formatDate(property.listingDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bedrooms:</span>
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bathrooms:</span>
            <span className="font-medium">{property.bathrooms}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsTable;