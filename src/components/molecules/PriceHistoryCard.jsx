import React from 'react';
import Card from '@/components/atoms/Card';

const PriceHistoryCard = ({ price, squareFeet }) => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(p)
  }

  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Price History
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Listed Price</span>
          <span className="font-medium text-accent">{formatPrice(price)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price per sq ft</span>
          <span className="font-medium">{formatPrice(Math.round(price / squareFeet))}</span>
        </div>
      </div>
    </Card>
  );
};

export default PriceHistoryCard;
import React from 'react';
import Card from '@/components/atoms/Card';

const PriceHistoryCard = ({ price, squareFeet }) => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(p)
  }

  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Price History
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Listed Price</span>
          <span className="font-medium text-accent">{formatPrice(price)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price per sq ft</span>
          <span className="font-medium">{formatPrice(Math.round(price / squareFeet))}</span>
        </div>
      </div>
    </Card>
  );
};

export default PriceHistoryCard;