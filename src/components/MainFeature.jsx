import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from './ApperIcon'

const MainFeature = ({
  properties,
  filters,
  viewType,
  showFilters,
  onFilterChange,
  onTogglePropertyType,
  onClearFilters,
  onViewTypeChange,
  onToggleFilters,
  onPropertyClick,
  formatPrice
}) => {
  const navigate = useNavigate()

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa']
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'size', label: 'Size: Largest First' }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const PropertyCard = ({ property, index }) => (
    <motion.div
      key={property.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onPropertyClick(property.id)}
    >
      {/* Property Image */}
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Toggle favorite functionality would go here
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
        >
          <ApperIcon 
            name="Heart" 
            className={`w-4 h-4 ${property.isFavorite ? 'text-accent fill-current' : 'text-gray-600'}`} 
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          {property.propertyType}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-accent text-white px-3 py-1 rounded-lg font-bold text-sm">
          {formatPrice(property.price)}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {property.address}, {property.city}, {property.state}
        </p>

        {/* Property Stats */}
        <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Listed {formatDate(property.listingDate)}
          </span>
          <span className="text-xs text-gray-500">
            Built {property.yearBuilt}
          </span>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                showFilters
                  ? 'bg-secondary text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name="Filter" className="w-4 h-4 inline mr-2" />
              Filters
            </button>
            <button
              onClick={() => navigate('/map')}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ApperIcon name="Map" className="w-4 h-4 inline mr-2" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min price"
                      value={filters.minPrice}
                      onChange={(e) => onFilterChange('minPrice', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max price"
                      value={filters.maxPrice}
                      onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value) || 2000000)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Bedrooms
                </label>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5].map(beds => (
                    <button
                      key={beds}
                      onClick={() => onFilterChange('minBeds', beds)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filters.minBeds === beds
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {beds === 0 ? 'Any' : `${beds}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => onTogglePropertyType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filters.propertyTypes.includes(type)
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
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={onClearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => onToggleFilters(false)}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {properties.length} Propert{properties.length !== 1 ? 'ies' : 'y'} Found
          </h2>
          {filters.location && (
            <p className="text-sm text-gray-600">in {filters.location}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewTypeChange('grid')}
              className={`px-3 py-2 transition-colors ${
                viewType === 'grid'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewTypeChange('list')}
              className={`px-3 py-2 transition-colors ${
                viewType === 'list'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or clearing filters
          </p>
          <button
            onClick={onClearFilters}
            className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewType === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default MainFeature