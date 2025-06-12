import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import * as propertyService from '../services/api/propertyService'

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadSavedProperties()
  }, [])

  const loadSavedProperties = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await propertyService.getAll()
      // Filter only favorited properties
      const favorites = result.filter(property => property.isFavorite)
      setSavedProperties(favorites)
    } catch (err) {
      setError(err.message || 'Failed to load saved properties')
      toast.error('Failed to load saved properties')
    } finally {
      setLoading(false)
    }
  }

  const removeFromSaved = async (propertyId) => {
    try {
      const property = savedProperties.find(p => p.id === propertyId)
      if (property) {
        await propertyService.update(propertyId, {
          ...property,
          isFavorite: false
        })
        setSavedProperties(prev => prev.filter(p => p.id !== propertyId))
        toast.success('Property removed from saved list')
      }
    } catch (err) {
      toast.error('Failed to remove property')
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load saved properties</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSavedProperties}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (savedProperties.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Heart" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No saved properties yet</h3>
          <p className="mt-2 text-gray-600">
            Start browsing properties and save your favorites to see them here
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/browse')}
            className="mt-6 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Browse Properties
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-primary mb-2">
          Saved Properties
        </h1>
        <p className="text-gray-600">
          {savedProperties.length} propert{savedProperties.length !== 1 ? 'ies' : 'y'} saved
        </p>
      </div>

      {/* Properties Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {savedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromSaved(property.id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors group"
                >
                  <ApperIcon 
                    name="Heart" 
                    className="w-4 h-4 text-accent fill-current group-hover:text-gray-400 transition-colors" 
                  />
                </button>

                {/* Property Type Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {property.propertyType}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <div className="text-xl font-bold text-accent mb-2">
                  {formatPrice(property.price)}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {property.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                  {property.city}, {property.state}
                </p>

                {/* Property Stats */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bed" className="w-4 h-4" />
                    <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bath" className="w-4 h-4" />
                    <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Square" className="w-4 h-4" />
                    <span>{property.squareFeet.toLocaleString()} sq ft</span>
                  </div>
                </div>

                {/* Listing Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">
                    Listed {formatDate(property.listingDate)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="flex-1 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeFromSaved(property.id)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Additional Actions */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('/browse')}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Browse More Properties
        </button>
      </div>
    </div>
  )
}

export default SavedProperties