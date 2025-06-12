import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ImageGallery = ({ images, title, currentImageIndex, onImageChange, onFavoriteToggle, isFavorite }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-96 object-cover rounded-xl"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <Button
              onClick={() => onImageChange(Math.max(0, currentImageIndex - 1))}
              disabled={currentImageIndex === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronLeft" className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onImageChange(Math.min(images.length - 1, currentImageIndex + 1))}
              disabled={currentImageIndex === images.length - 1}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronRight" className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <Button
            onClick={onFavoriteToggle}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ApperIcon 
              name="Heart" 
              className={`w-6 h-6 ${isFavorite ? 'text-accent fill-current' : 'text-gray-600'}`} 
            />
          </Button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <Button
              key={index}
              onClick={() => onImageChange(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 p-0 ${
                index === currentImageIndex ? 'border-secondary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ImageGallery = ({ images, title, currentImageIndex, onImageChange, onFavoriteToggle, isFavorite }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-96 object-cover rounded-xl"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <Button
              onClick={() => onImageChange(Math.max(0, currentImageIndex - 1))}
              disabled={currentImageIndex === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronLeft" className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onImageChange(Math.min(images.length - 1, currentImageIndex + 1))}
              disabled={currentImageIndex === images.length - 1}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronRight" className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <Button
            onClick={onFavoriteToggle}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ApperIcon 
              name="Heart" 
              className={`w-6 h-6 ${isFavorite ? 'text-accent fill-current' : 'text-gray-600'}`} 
            />
          </Button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <Button
              key={index}
              onClick={() => onImageChange(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 p-0 ${
                index === currentImageIndex ? 'border-secondary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;