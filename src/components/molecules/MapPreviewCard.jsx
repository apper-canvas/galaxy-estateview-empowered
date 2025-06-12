import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const MapPreviewCard = ({ address, city, state, zip }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Location
      </h3>
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="MapPin" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Map View</p>
          <p className="text-xs text-gray-400">Interactive map coming soon</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {address}, {city}, {state} {zip}
      </p>
      <Button
        onClick={() => navigate('/map')}
        className="mt-3 text-secondary hover:text-secondary/80 text-sm font-medium bg-transparent p-0"
      >
        View on Map →
      </Button>
    </Card>
  );
};

export default MapPreviewCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const MapPreviewCard = ({ address, city, state, zip }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Location
      </h3>
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="MapPin" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Map View</p>
          <p className="text-xs text-gray-400">Interactive map coming soon</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {address}, {city}, {state} {zip}
      </p>
      <Button
        onClick={() => navigate('/map')}
        className="mt-3 text-secondary hover:text-secondary/80 text-sm font-medium bg-transparent p-0"
      >
        View on Map →
      </Button>
    </Card>
  );
};

export default MapPreviewCard;