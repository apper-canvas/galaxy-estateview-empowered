import React from 'react';
import ContactCard from '@/components/molecules/ContactCard';
import MapPreviewCard from '@/components/molecules/MapPreviewCard';
import PriceHistoryCard from '@/components/molecules/PriceHistoryCard';

const PropertySidebar = ({ property }) => {
  return (
    <div className="space-y-6">
      <ContactCard />
      <MapPreviewCard 
        address={property.address} 
        city={property.city} 
        state={property.state} 
        zip={property.zip} 
      />
      <PriceHistoryCard 
        price={property.price} 
        squareFeet={property.squareFeet} 
      />
    </div>
  );
};

export default PropertySidebar;