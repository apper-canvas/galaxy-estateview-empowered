import React from 'react';
import { motion } from 'framer-motion';

const MapPropertyMarker = ({ property, index, isSelected, onClick, formatPrice }) => {
  return (
    <motion.button
      key={property.id}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(property)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        isSelected
          ? 'z-20 bg-accent text-white'
          : 'z-10 bg-white text-gray-900 hover:bg-gray-50'
      } px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium transition-colors min-w-max`}
      style={{
        left: `${20 + (index % 8) * 10}%`,
        top: `${20 + Math.floor(index / 8) * 15}%`
      }}
    >
      {formatPrice(property.price)}
    </motion.button>
  );
};

export default MapPropertyMarker;
import React from 'react';
import { motion } from 'framer-motion';

const MapPropertyMarker = ({ property, index, isSelected, onClick, formatPrice }) => {
  return (
    <motion.button
      key={property.id}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(property)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        isSelected
          ? 'z-20 bg-accent text-white'
          : 'z-10 bg-white text-gray-900 hover:bg-gray-50'
      } px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium transition-colors min-w-max`}
      style={{
        left: `${20 + (index % 8) * 10}%`,
        top: `${20 + Math.floor(index / 8) * 15}%`
      }}
    >
      {formatPrice(property.price)}
    </motion.button>
  );
};

export default MapPropertyMarker;