import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SearchAlertCard = ({ search, index, onDelete }) => {
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

  const getFilterSummary = (filters) => {
    const parts = []
    
    if (filters.location) {
      parts.push(`in ${filters.location}`)
    }
    
    if (filters.minPrice > 0 || filters.maxPrice < 2000000) {
      parts.push(`${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}`)
    }
    
    if (filters.minBeds > 0) {
      parts.push(`${filters.minBeds}+ beds`)
    }
    
    if (filters.propertyTypes.length > 0) {
      parts.push(filters.propertyTypes.join(', '))
    }

    return parts.length > 0 ? parts.join(' • ') : 'All properties'
  }

  return (
    <motion.div
      key={search.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {search.name}
          </h3>
          <p className="text-gray-600 mb-3">
            {getFilterSummary(search.filters)}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>Created {formatDate(search.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Bell" className="w-4 h-4" />
              <span>Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            onClick={() => onDelete(search.id)}
            className="p-2 text-gray-400 hover:text-error hover:bg-error/5 bg-transparent rounded-lg transition-colors"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchAlertCard;
import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SearchAlertCard = ({ search, index, onDelete }) => {
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

  const getFilterSummary = (filters) => {
    const parts = []
    
    if (filters.location) {
      parts.push(`in ${filters.location}`)
    }
    
    if (filters.minPrice > 0 || filters.maxPrice < 2000000) {
      parts.push(`${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}`)
    }
    
    if (filters.minBeds > 0) {
      parts.push(`${filters.minBeds}+ beds`)
    }
    
    if (filters.propertyTypes.length > 0) {
      parts.push(filters.propertyTypes.join(', '))
    }

    return parts.length > 0 ? parts.join(' • ') : 'All properties'
  }

  return (
    <motion.div
      key={search.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {search.name}
          </h3>
          <p className="text-gray-600 mb-3">
            {getFilterSummary(search.filters)}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>Created {formatDate(search.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Bell" className="w-4 h-4" />
              <span>Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            onClick={() => onDelete(search.id)}
            className="p-2 text-gray-400 hover:text-error hover:bg-error/5 bg-transparent rounded-lg transition-colors"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchAlertCard;