import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Card from '@/components/atoms/Card';
import PriceRangeInputs from '@/components/molecules/PriceRangeInputs';
import PropertyTypeToggleButtons from '@/components/molecules/PropertyTypeToggleButtons';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'size', label: 'Size: Largest First' }
];

const PropertySearchFilter = ({
  filters,
  showFilters,
  onFilterChange,
  onTogglePropertyType,
  onClearFilters,
  onToggleFilters,
  onNavigateToMap,
  formatPrice
}) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onToggleFilters(!showFilters)}
              className={`px-4 py-3 ${
                showFilters
                  ? 'bg-secondary text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent'
              }`}
            >
              <ApperIcon name="Filter" className="w-4 h-4 inline mr-2" />
              Filters
            </Button>
            <Button
              onClick={onNavigateToMap}
              className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <ApperIcon name="Map" className="w-4 h-4 inline mr-2" />
              Map
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="p-6">
              <div className="space-y-6">
                {/* Price Range */}
                <PriceRangeInputs
                  minPrice={filters.minPrice}
                  maxPrice={filters.maxPrice}
                  onMinPriceChange={(value) => onFilterChange('minPrice', value)}
                  onMaxPriceChange={(value) => onFilterChange('maxPrice', value)}
                  formatPrice={formatPrice}
                />

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Minimum Bedrooms
                  </label>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4, 5].map(beds => (
                      <Button
                        key={beds}
                        onClick={() => onFilterChange('minBeds', beds)}
                        className={`px-4 py-2 ${
                          filters.minBeds === beds
                            ? 'bg-secondary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 bg-transparent'
                        }`}
                      >
                        {beds === 0 ? 'Any' : `${beds}+`}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Property Types */}
                <PropertyTypeToggleButtons
                  selectedTypes={filters.propertyTypes}
                  onToggle={onTogglePropertyType}
                />

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <Button
                    onClick={onClearFilters}
                    className="text-gray-600 hover:text-gray-800 bg-transparent p-0"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => onToggleFilters(false)}
                    className="px-6 py-2 bg-secondary text-white hover:bg-secondary/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertySearchFilter;