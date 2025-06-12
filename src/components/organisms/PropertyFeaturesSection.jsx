import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PropertyFeaturesSection = ({ features }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const displayedFeatures = features.slice(0, showAllFeatures ? features.length : 8);

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold text-primary mb-4">
        Features & Amenities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Check" className="w-4 h-4 text-success" />
            <span className="text-gray-700">{feature}</span>
          </motion.div>
        ))}
      </div>
      {features.length > 8 && (
        <Button
          onClick={() => setShowAllFeatures(!showAllFeatures)}
          className="mt-4 text-secondary hover:text-secondary/80 font-medium bg-transparent p-0"
        >
          {showAllFeatures ? 'Show Less' : `Show All ${features.length} Features`}
        </Button>
      )}
    </div>
  );
};

export default PropertyFeaturesSection;