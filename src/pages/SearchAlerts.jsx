import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import * as savedSearchService from '../services/api/savedSearchService'

const SearchAlerts = () => {
  const [savedSearches, setSavedSearches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
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
  })

  useEffect(() => {
    loadSavedSearches()
  }, [])

  const loadSavedSearches = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await savedSearchService.getAll()
      setSavedSearches(result)
    } catch (err) {
      setError(err.message || 'Failed to load search alerts')
      toast.error('Failed to load search alerts')
    } finally {
      setLoading(false)
    }
  }

  const createSearchAlert = async (e) => {
    e.preventDefault()
    if (!newSearch.name.trim()) {
      toast.error('Please enter a name for your search alert')
      return
    }

    try {
      const searchAlert = await savedSearchService.create({
        ...newSearch,
        createdAt: new Date().toISOString()
      })
      setSavedSearches(prev => [searchAlert, ...prev])
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
      })
      setShowCreateForm(false)
      toast.success('Search alert created successfully')
    } catch (err) {
      toast.error('Failed to create search alert')
    }
  }

  const deleteSearchAlert = async (id) => {
    try {
      await savedSearchService.delete(id)
      setSavedSearches(prev => prev.filter(search => search.id !== id))
      toast.success('Search alert deleted')
    } catch (err) {
      toast.error('Failed to delete search alert')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getFilterSummary = (filters) => {
    const parts = []
    
    if (filters.location) {
      parts.push(`in ${filters.location}`)
    }
    
    if (filters.minPrice > 0 || filters.maxPrice < 2000000) {
      parts.push(`${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}`)
    }
    
    if (filters.minBeds > 0) {
      parts.push(`${filters.minBeds}+ beds`)
    }
    
    if (filters.propertyTypes.length > 0) {
      parts.push(filters.propertyTypes.join(', '))
    }

    return parts.length > 0 ? parts.join(' • ') : 'All properties'
  }

  const handleFilterChange = (key, value) => {
    setNewSearch(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value
      }
    }))
  }

  const togglePropertyType = (type) => {
    setNewSearch(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        propertyTypes: prev.filters.propertyTypes.includes(type)
          ? prev.filters.propertyTypes.filter(t => t !== type)
          : [...prev.filters.propertyTypes, type]
      }
    }))
  }

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
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load search alerts</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSavedSearches}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>New Alert</span>
        </button>
      </div>

      {/* Create Form Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCreateForm(false)}
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
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={createSearchAlert} className="space-y-6">
                    {/* Alert Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alert Name
                      </label>
                      <input
                        type="text"
                        value={newSearch.name}
                        onChange={(e) => setNewSearch(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Downtown Condos"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newSearch.filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="City, neighborhood, or address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={newSearch.filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                            placeholder="Min price"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          />
                        </div>
                        <span className="text-gray-500">to</span>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={newSearch.filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 2000000)}
                            placeholder="Max price"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Bedrooms
                      </label>
                      <select
                        value={newSearch.filters.minBeds}
                        onChange={(e) => handleFilterChange('minBeds', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      >
                        <option value={0}>Any</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                        <option value={5}>5+</option>
                      </select>
                    </div>

                    {/* Property Types */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Types
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => togglePropertyType(type)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              newSearch.filters.propertyTypes.includes(type)
                                ? 'bg-secondary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                      >
                        Create Alert
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Alerts List */}
      {savedSearches.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Bell" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No search alerts yet</h3>
          <p className="mt-2 text-gray-600">
            Create your first search alert to get notified about new properties
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="mt-6 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Create Search Alert
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {savedSearches.map((search, index) => (
            <motion.div
              key={search.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {search.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {getFilterSummary(search.filters)}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>Created {formatDate(search.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Bell" className="w-4 h-4" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => deleteSearchAlert(search.id)}
                    className="p-2 text-gray-400 hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchAlerts