import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import MapControls from '@/components/organisms/MapControls';
import MapDisplay from '@/components/organisms/MapDisplay';
import MapPropertyInfoPanel from '@/components/organisms/MapPropertyInfoPanel';
import Button from '@/components/atoms/Button';
import * as propertyService from '@/services/api/propertyService';

const MapViewPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // NYC default
  const [zoom, setZoom] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getAll();
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setMapCenter({ lat: property.latitude, lng: property.longitude });
  };

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load map</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={loadProperties}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <MapControls 
        propertyCount={properties.length} 
        zoom={zoom} 
        onZoomIn={() => setZoom(Math.min(18, zoom + 1))} 
        onZoomOut={() => setZoom(Math.max(1, zoom - 1))} 
      />

      <div className="flex-1 flex">
        <MapDisplay 
          properties={properties} 
          selectedProperty={selectedProperty} 
          onPropertyClick={handlePropertyClick} 
        />
        <MapPropertyInfoPanel 
          selectedProperty={selectedProperty} 
          onViewDetails={handleViewProperty} 
          onClosePanel={() => setSelectedProperty(null)} 
        />
      </div>
    </div>
  );
};

export default MapViewPage;