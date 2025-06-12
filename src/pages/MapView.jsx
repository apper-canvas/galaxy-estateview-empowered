import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import * as propertyService from '../services/api/propertyService'

const MapView = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }) // NYC default
  const [zoom, setZoom] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await propertyService.getAll()
      setProperties(result)
    } catch (err) {
      setError(err.message || 'Failed to load properties')
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handlePropertyClick = (property) => {
    setSelectedProperty(property)
    setMapCenter({ lat: property.latitude, lng: property.longitude })
  }

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`)
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load map</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProperties}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Map Controls */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-heading font-semibold text-primary">
              Map View
            </h1>
            <span className="text-sm text-gray-600">
              {properties.length} properties
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom(Math.min(18, zoom + 1))}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(Math.max(1, zoom - 1))}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ApperIcon name="Minus" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 flex">
        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Map Grid */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border-gray-200 border-l"
                  style={{ left: `${i * 5}%`, height: '100%' }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border-gray-200 border-t"
                  style={{ top: `${i * 5}%`, width: '100%' }}
                />
              ))}
            </div>

            {/* Property Markers */}
            {properties.map((property, index) => (
              <motion.button
                key={property.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePropertyClick(property)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedProperty?.id === property.id
                    ? 'z-20 bg-accent text-white'
                    : 'z-10 bg-white text-gray-900 hover:bg-gray-50'
                } px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium transition-colors min-w-max`}
                style={{
                  left: `${20 + (index % 8) * 10}%`,
                  top: `${20 + Math.floor(index / 8) * 15}%`
                }}
              >
                {formatPrice(property.price)}
              </motion.button>
            ))}

            {/* Map Center Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg"></div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        {/* Property Info Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {selectedProperty ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 overflow-y-auto"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full transition-colors"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <div className="text-xl font-bold text-accent mb-2">
                  {formatPrice(selectedProperty.price)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {selectedProperty.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedProperty.city}, {selectedProperty.state}
                </p>

                {/* Property Stats */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bed" className="w-4 h-4" />
                    <span>{selectedProperty.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bath" className="w-4 h-4" />
                    <span>{selectedProperty.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Square" className="w-4 h-4" />
                    <span>{selectedProperty.squareFeet.toLocaleString()}</span>
                  </div>
                </div>

                {/* Property Type */}
                <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mb-4">
                  {selectedProperty.propertyType}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {selectedProperty.description}
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleViewProperty(selectedProperty.id)}
                    className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    View Details
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Save Property
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <ApperIcon name="MapPin" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Select a Property</h3>
                <p className="text-sm text-gray-600">
                  Click on a price marker to view property details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MapView