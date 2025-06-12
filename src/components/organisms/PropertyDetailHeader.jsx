import React from 'react';
import PropertyStats from '@/components/molecules/PropertyStats';

const PropertyDetailHeader = ({ title, address, city, state, zip, price, bedrooms, bathrooms, squareFeet, yearBuilt }) => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(p)
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-primary mb-2">
        {title}
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        {address}, {city}, {state} {zip}
      </p>
      <div className="text-3xl font-bold text-accent mb-4">
        {formatPrice(price)}
      </div>
      
      <PropertyStats 
        bedrooms={bedrooms} 
        bathrooms={bathrooms} 
        squareFeet={squareFeet} 
      />
      
      {yearBuilt && (
        <div className="flex items-center space-x-2 text-gray-600 mt-2">
          <span className="text-sm">Built {yearBuilt}</span>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailHeader;
import React from 'react';
import PropertyStats from '@/components/molecules/PropertyStats';

const PropertyDetailHeader = ({ title, address, city, state, zip, price, bedrooms, bathrooms, squareFeet, yearBuilt }) => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(p)
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-primary mb-2">
        {title}
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        {address}, {city}, {state} {zip}
      </p>
      <div className="text-3xl font-bold text-accent mb-4">
        {formatPrice(price)}
      </div>
      
      <PropertyStats 
        bedrooms={bedrooms} 
        bathrooms={bathrooms} 
        squareFeet={squareFeet} 
      />
      
      {yearBuilt && (
        <div className="flex items-center space-x-2 text-gray-600 mt-2">
          <span className="text-sm">Built {yearBuilt}</span>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailHeader;