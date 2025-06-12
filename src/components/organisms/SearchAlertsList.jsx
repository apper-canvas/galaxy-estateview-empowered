import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchAlertCard from '@/components/molecules/SearchAlertCard';

const SearchAlertsList = ({ savedSearches, onDeleteAlert, onCreateAlertClick }) => {
  return (
    <>
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
            onClick={onCreateAlertClick}
            className="mt-6 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Create Search Alert
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {savedSearches.map((search, index) => (
            <SearchAlertCard 
              key={search.id} 
              search={search} 
              index={index} 
              onDelete={onDeleteAlert} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchAlertsList;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchAlertCard from '@/components/molecules/SearchAlertCard';

const SearchAlertsList = ({ savedSearches, onDeleteAlert, onCreateAlertClick }) => {
  return (
    <>
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
            onClick={onCreateAlertClick}
            className="mt-6 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Create Search Alert
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {savedSearches.map((search, index) => (
            <SearchAlertCard 
              key={search.id} 
              search={search} 
              index={index} 
              onDelete={onDeleteAlert} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchAlertsList;