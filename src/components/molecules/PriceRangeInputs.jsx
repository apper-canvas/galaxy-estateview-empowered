import React from 'react';
import Input from '@/components/atoms/Input';

const PriceRangeInputs = ({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, formatPrice }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => onMinPriceChange(parseInt(e.target.value) || 0)}
          />
        </div>
        <span className="text-gray-500">to</span>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(parseInt(e.target.value) || 2000000)}
          />
        </div>
      </div>
      {formatPrice && (
        <div className="mt-2 text-sm text-gray-600">
          {formatPrice(minPrice)} - {formatPrice(maxPrice)}
        </div>
      )}
    </div>
  );
};

export default PriceRangeInputs;