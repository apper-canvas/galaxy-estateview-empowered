import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ImageGallery from '@/components/molecules/ImageGallery';
import PropertyDetailHeader from '@/components/organisms/PropertyDetailHeader';
import PropertyFeaturesSection from '@/components/organisms/PropertyFeaturesSection';
import PropertyDetailsTable from '@/components/organisms/PropertyDetailsTable';
import PropertySidebar from '@/components/organisms/PropertySidebar';
import Button from '@/components/atoms/Button';
import * as propertyService from '@/services/api/propertyService';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false); // This state will be managed by PropertyFeaturesSection now

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Failed to load property');
      toast.error('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!property) return;
    
    try {
      const updatedProperty = await propertyService.update(property.id, {
        ...property,
        isFavorite: !property.isFavorite
      });
      setProperty(updatedProperty);
      toast.success(updatedProperty.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Property not found</h3>
          <p className="text-gray-600 mb-4">{error || 'The property you are looking for does not exist.'}</p>
          <Button
            onClick={() => navigate('/browse')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition-colors bg-transparent p-0"
      >
        <ApperIcon name="ArrowLeft" className="w-5 h-5" />
        <span>Back</span>
      </Button>

      <ImageGallery
        images={property.images}
        title={property.title}
        currentImageIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
        onFavoriteToggle={toggleFavorite}
        isFavorite={property.isFavorite}
      />

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyDetailHeader
            title={property.title}
            address={property.address}
            city={property.city}
            state={property.state}
            zip={property.zip}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            yearBuilt={property.yearBuilt}
          />

          {/* Description */}
          <div>
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          <PropertyFeaturesSection features={property.features} />

          <PropertyDetailsTable property={property} />
        </div>

        {/* Sidebar */}
        <PropertySidebar property={property} />
      </div>
    </div>
  );
};

export default PropertyDetailPage;