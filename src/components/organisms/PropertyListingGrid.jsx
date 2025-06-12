import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import PropertyCard from '@/components/molecules/PropertyCard';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'size', label: 'Size: Largest First' }
];

const PropertyListingGrid = ({
  properties,
  filters,
  viewType,
  onFilterChange,
  onViewTypeChange,
  onPropertyClick,
  onClearFilters,
  onFavoriteToggle,
  onRemoveProperty // for saved properties page
}) => {
  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {properties.length} Propert{properties.length !== 1 ? 'ies' : 'y'} Found
          </h2>
          {filters?.location && (
            <p className="text-sm text-gray-600">in {filters.location}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <Select
            value={filters?.sortBy || 'newest'}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              onClick={() => onViewTypeChange('grid')}
              className={`px-3 py-2 ${
                viewType === 'grid'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50 bg-transparent'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onViewTypeChange('list')}
              className={`px-3 py-2 ${
                viewType === 'list'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50 bg-transparent'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or clearing filters
          </p>
          {onClearFilters && (
            <Button
              onClick={onClearFilters}
              className="px-6 py-3 bg-secondary text-white hover:bg-secondary/90"
            >
              Clear Filters
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewType === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                onClick={onPropertyClick}
                onFavoriteToggle={onFavoriteToggle}
                onRemove={onRemoveProperty}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default PropertyListingGrid;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import PropertyCard from '@/components/molecules/PropertyCard';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'size', label: 'Size: Largest First' }
];

const PropertyListingGrid = ({
  properties,
  filters,
  viewType,
  onFilterChange,
  onViewTypeChange,
  onPropertyClick,
  onClearFilters,
  onFavoriteToggle,
  onRemoveProperty // for saved properties page
}) => {
  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {properties.length} Propert{properties.length !== 1 ? 'ies' : 'y'} Found
          </h2>
          {filters?.location && (
            <p className="text-sm text-gray-600">in {filters.location}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <Select
            value={filters?.sortBy || 'newest'}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              onClick={() => onViewTypeChange('grid')}
              className={`px-3 py-2 ${
                viewType === 'grid'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50 bg-transparent'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onViewTypeChange('list')}
              className={`px-3 py-2 ${
                viewType === 'list'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50 bg-transparent'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or clearing filters
          </p>
          {onClearFilters && (
            <Button
              onClick={onClearFilters}
              className="px-6 py-3 bg-secondary text-white hover:bg-secondary/90"
            >
              Clear Filters
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewType === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                onClick={onPropertyClick}
                onFavoriteToggle={onFavoriteToggle}
                onRemove={onRemoveProperty}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default PropertyListingGrid;