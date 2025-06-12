import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import PropertySearchFilter from '@/components/organisms/PropertySearchFilter';
import PropertyListingGrid from '@/components/organisms/PropertyListingGrid';
import * as propertyService from '@/services/api/propertyService';

const BrowsePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 2000000,
    minBeds: 0,
    propertyTypes: [],
    sortBy: 'newest'
  });
  const [viewType, setViewType] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getAll();
      // Apply filters
      let filteredProperties = result.filter(property => {
        const matchesLocation = !filters.location || 
          property.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.location.toLowerCase());
        const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
        const matchesBeds = property.bedrooms >= filters.minBeds;
        const matchesType = filters.propertyTypes.length === 0 || 
          filters.propertyTypes.includes(property.propertyType);
        
        return matchesLocation && matchesPrice && matchesBeds && matchesType;
      });

      // Apply sorting
      filteredProperties.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'newest':
            return new Date(b.listingDate) - new Date(a.listingDate);
          case 'size':
            return b.squareFeet - a.squareFeet;
          default:
            return 0;
        }
      });

      setProperties(filteredProperties);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePropertyType = (type) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 2000000,
      minBeds: 0,
      propertyTypes: [],
      sortBy: 'newest'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  };

  const handleFavoriteToggle = async (propertyId) => {
    const propertyToUpdate = properties.find(p => p.id === propertyId);
    if (!propertyToUpdate) return;
    
    try {
      const updatedProperty = await propertyService.update(propertyId, {
        ...propertyToUpdate,
        isFavorite: !propertyToUpdate.isFavorite
      });
      setProperties(prev => prev.map(p => p.id === propertyId ? updatedProperty : p));
      toast.success(updatedProperty.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load properties</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProperties}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PropertySearchFilter 
        properties={properties} // Potentially not needed here, but kept from original structure
        filters={filters}
        showFilters={showFilters}
        onFilterChange={handleFilterChange}
        onTogglePropertyType={togglePropertyType}
        onClearFilters={clearFilters}
        onToggleFilters={setShowFilters}
        onNavigateToMap={() => navigate('/map')}
        formatPrice={formatPrice}
      />
      <PropertyListingGrid
        properties={properties}
        filters={filters}
        viewType={viewType}
        onFilterChange={handleFilterChange}
        onViewTypeChange={setViewType}
        onPropertyClick={(id) => navigate(`/property/${id}`)}
        onClearFilters={clearFilters}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

export default BrowsePage;