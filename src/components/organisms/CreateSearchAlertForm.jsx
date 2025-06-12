import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import PriceRangeInputs from '@/components/molecules/PriceRangeInputs';
import PropertyTypeToggleButtons from '@/components/molecules/PropertyTypeToggleButtons';

const CreateSearchAlertForm = ({
  show,
  newSearch,
  onClose,
  onChangeName,
  onChangeFilter,
  onTogglePropertyType,
  onSubmit
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-primary">
                    Create Search Alert
                  </h2>
                  <Button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-transparent"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Alert Name */}
                  <FormField label="Alert Name" id="alert-name">
                    <Input
                      type="text"
                      value={newSearch.name}
                      onChange={(e) => onChangeName(e.target.value)}
                      placeholder="e.g., Downtown Condos"
                      required
                    />
                  </FormField>

                  {/* Location */}
                  <FormField label="Location" id="alert-location">
                    <Input
                      type="text"
                      value={newSearch.filters.location}
                      onChange={(e) => onChangeFilter('location', e.target.value)}
                      placeholder="City, neighborhood, or address"
                    />
                  </FormField>

                  {/* Price Range */}
                  <PriceRangeInputs
                    minPrice={newSearch.filters.minPrice}
                    maxPrice={newSearch.filters.maxPrice}
                    onMinPriceChange={(value) => onChangeFilter('minPrice', value)}
                    onMaxPriceChange={(value) => onChangeFilter('maxPrice', value)}
                    formatPrice={formatPrice}
                  />

                  {/* Bedrooms */}
                  <FormField label="Minimum Bedrooms" id="min-beds">
                    <Select
                      value={newSearch.filters.minBeds}
                      onChange={(e) => onChangeFilter('minBeds', parseInt(e.target.value))}
                    >
                      <option value={0}>Any</option>
                      <option value={1}>1+</option>
                      <option value={2}>2+</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                      <option value={5}>5+</option>
                    </Select>
                  </FormField>

                  {/* Property Types */}
                  <PropertyTypeToggleButtons
                    selectedTypes={newSearch.filters.propertyTypes}
                    onToggle={onTogglePropertyType}
                  />

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-secondary text-white hover:bg-secondary/90"
                    >
                      Create Alert
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateSearchAlertForm;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import PriceRangeInputs from '@/components/molecules/PriceRangeInputs';
import PropertyTypeToggleButtons from '@/components/molecules/PropertyTypeToggleButtons';

const CreateSearchAlertForm = ({
  show,
  newSearch,
  onClose,
  onChangeName,
  onChangeFilter,
  onTogglePropertyType,
  onSubmit
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-primary">
                    Create Search Alert
                  </h2>
                  <Button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-transparent"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Alert Name */}
                  <FormField label="Alert Name" id="alert-name">
                    <Input
                      type="text"
                      value={newSearch.name}
                      onChange={(e) => onChangeName(e.target.value)}
                      placeholder="e.g., Downtown Condos"
                      required
                    />
                  </FormField>

                  {/* Location */}
                  <FormField label="Location" id="alert-location">
                    <Input
                      type="text"
                      value={newSearch.filters.location}
                      onChange={(e) => onChangeFilter('location', e.target.value)}
                      placeholder="City, neighborhood, or address"
                    />
                  </FormField>

                  {/* Price Range */}
                  <PriceRangeInputs
                    minPrice={newSearch.filters.minPrice}
                    maxPrice={newSearch.filters.maxPrice}
                    onMinPriceChange={(value) => onChangeFilter('minPrice', value)}
                    onMaxPriceChange={(value) => onChangeFilter('maxPrice', value)}
                    formatPrice={formatPrice}
                  />

                  {/* Bedrooms */}
                  <FormField label="Minimum Bedrooms" id="min-beds">
                    <Select
                      value={newSearch.filters.minBeds}
                      onChange={(e) => onChangeFilter('minBeds', parseInt(e.target.value))}
                    >
                      <option value={0}>Any</option>
                      <option value={1}>1+</option>
                      <option value={2}>2+</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                      <option value={5}>5+</option>
                    </Select>
                  </FormField>

                  {/* Property Types */}
                  <PropertyTypeToggleButtons
                    selectedTypes={newSearch.filters.propertyTypes}
                    onToggle={onTogglePropertyType}
                  />

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-secondary text-white hover:bg-secondary/90"
                    >
                      Create Alert
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateSearchAlertForm;