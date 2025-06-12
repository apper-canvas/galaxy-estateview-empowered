import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import * as propertyService from '../services/api/propertyService'

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await propertyService.getById(id)
      setProperty(result)
    } catch (err) {
      setError(err.message || 'Failed to load property')
      toast.error('Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    if (!property) return
    
    try {
      const updatedProperty = await propertyService.update(property.id, {
        ...property,
        isFavorite: !property.isFavorite
      })
      setProperty(updatedProperty)
      toast.success(updatedProperty.isFavorite ? 'Added to favorites' : 'Removed from favorites')
    } catch (err) {
      toast.error('Failed to update favorite status')
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
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
    )
  }

  if (error || !property) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Property not found</h3>
          <p className="text-gray-600 mb-4">{error || 'The property you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/browse')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Browse
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ApperIcon name="ArrowLeft" className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-xl"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                disabled={currentImageIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(Math.min(property.images.length - 1, currentImageIndex + 1))}
                disabled={currentImageIndex === property.images.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <ApperIcon 
              name="Heart" 
              className={`w-6 h-6 ${property.isFavorite ? 'text-accent fill-current' : 'text-gray-600'}`} 
            />
          </button>

          {/* Image Counter */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {property.images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto scrollbar-hide">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex ? 'border-secondary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
            <div className="text-3xl font-bold text-accent mb-4">
              {formatPrice(property.price)}
            </div>
            
            {/* Key Stats */}
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Bed" className="w-5 h-5" />
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Bath" className="w-5 h-5" />
                <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Square" className="w-5 h-5" />
                <span>{property.squareFeet.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" className="w-5 h-5" />
                <span>Built {property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Features & Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.features.slice(0, showAllFeatures ? property.features.length : 8).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Check" className="w-4 h-4 text-success" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
            {property.features.length > 8 && (
              <button
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="mt-4 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                {showAllFeatures ? 'Show Less' : `Show All ${property.features.length} Features`}
              </button>
            )}
          </div>

          {/* Property Details Table */}
          <div>
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Property Details
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Square Footage:</span>
                  <span className="font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-medium">{formatDate(property.listingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-heading font-semibold text-primary mb-4">
              Contact Agent
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-secondary text-white py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium">
                Call Agent
              </button>
              <button className="w-full bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/90 transition-colors font-medium">
                Send Message
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Schedule Tour
              </button>
            </div>
          </div>

          {/* Map Preview */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
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
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
            <button
              onClick={() => navigate('/map')}
              className="mt-3 text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
            >
              View on Map →
            </button>
          </div>

          {/* Price History */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-heading font-semibold text-primary mb-4">
              Price History
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Listed Price</span>
                <span className="font-medium text-accent">{formatPrice(property.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price per sq ft</span>
                <span className="font-medium">{formatPrice(Math.round(property.price / property.squareFeet))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail