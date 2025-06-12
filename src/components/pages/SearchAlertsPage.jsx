import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CreateSearchAlertForm from '@/components/organisms/CreateSearchAlertForm';
import SearchAlertsList from '@/components/organisms/SearchAlertsList';
import * as savedSearchService from '@/services/api/savedSearchService';

const SearchAlertsPage = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSearch, setNewSearch] = useState({
    name: '',
    filters: {
      location: '',
      minPrice: 0,
      maxPrice: 2000000,
      minBeds: 0,
      propertyTypes: [],
      sortBy: 'newest'
    }
  });

  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await savedSearchService.getAll();
      setSavedSearches(result);
    } catch (err) {
      setError(err.message || 'Failed to load search alerts');
      toast.error('Failed to load search alerts');
    } finally {
      setLoading(false);
    }
  };

  const createSearchAlert = async (e) => {
    e.preventDefault();
    if (!newSearch.name.trim()) {
      toast.error('Please enter a name for your search alert');
      return;
    }

    try {
      const searchAlert = await savedSearchService.create({
        ...newSearch,
        createdAt: new Date().toISOString()
      });
      setSavedSearches(prev => [searchAlert, ...prev]);
      setNewSearch({
        name: '',
        filters: {
          location: '',
          minPrice: 0,
          maxPrice: 2000000,
          minBeds: 0,
          propertyTypes: [],
          sortBy: 'newest'
        }
      });
      setShowCreateForm(false);
      toast.success('Search alert created successfully');
    } catch (err) {
      toast.error('Failed to create search alert');
    }
  };

  const deleteSearchAlert = async (id) => {
    try {
      await savedSearchService.delete(id);
      setSavedSearches(prev => prev.filter(search => search.id !== id));
      toast.success('Search alert deleted');
    } catch (err) {
      toast.error('Failed to delete search alert');
    }
  };

  const handleFilterChange = (key, value) => {
    setNewSearch(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value
      }
    }));
  };

  const togglePropertyType = (type) => {
    setNewSearch(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        propertyTypes: prev.filters.propertyTypes.includes(type)
          ? prev.filters.propertyTypes.filter(t => t !== type)
          : [...prev.filters.propertyTypes, type]
      }
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load search alerts</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={loadSavedSearches}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary mb-2">
            Search Alerts
          </h1>
          <p className="text-gray-600">
            Get notified when new properties match your criteria
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>New Alert</span>
        </Button>
      </div>

      <CreateSearchAlertForm
        show={showCreateForm}
        newSearch={newSearch}
        onClose={() => setShowCreateForm(false)}
        onChangeName={(name) => setNewSearch(prev => ({ ...prev, name }))}
        onChangeFilter={handleFilterChange}
        onTogglePropertyType={togglePropertyType}
        onSubmit={createSearchAlert}
      />

      <SearchAlertsList
        savedSearches={savedSearches}
        onDeleteAlert={deleteSearchAlert}
        onCreateAlertClick={() => setShowCreateForm(true)}
      />
    </div>
  );
};

export default SearchAlertsPage;