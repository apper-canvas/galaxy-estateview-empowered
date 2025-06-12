import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-8"
        >
          <ApperIcon name="Home" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
          Property Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="space-y-4">
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/browse')}
            className="w-full px-6 py-3 bg-secondary text-white hover:bg-secondary/90"
          >
            Browse Properties
          </Button>
          
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;