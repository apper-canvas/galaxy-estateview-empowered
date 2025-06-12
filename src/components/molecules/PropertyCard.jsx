import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyStats from '@/components/molecules/PropertyStats';

const PropertyCard = ({ property, index, onClick, onFavoriteToggle, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      key={property.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      {/* Property Image */}
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(property.id);
            }}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <ApperIcon 
              name="Heart" 
              className={`w-4 h-4 ${property.isFavorite ? 'text-accent fill-current' : 'text-gray-600'}`} 
            />
          </button>
        )}

        {/* Remove Button for Saved Properties */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(property.id);
            }}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors group"
          >
            <ApperIcon 
              name="Heart" 
              className="w-4 h-4 text-accent fill-current group-hover:text-gray-400 transition-colors" 
            />
          </button>
        )}

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          {property.propertyType}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-accent text-white px-3 py-1 rounded-lg font-bold text-sm">
          {formatPrice(property.price)}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {property.address}, {property.city}, {property.state}
        </p>

        {/* Property Stats */}
        <PropertyStats 
          bedrooms={property.bedrooms} 
          bathrooms={property.bathrooms} 
          squareFeet={property.squareFeet} 
          className="mb-3 text-sm"
        />

        {/* Listing Date */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Listed {formatDate(property.listingDate)}
          </span>
          <span className="text-xs text-gray-500">
            Built {property.yearBuilt}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;