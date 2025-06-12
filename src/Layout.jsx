import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './components/ApperIcon'
import { routes } from './config/routes'

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigationItems = [
    routes.browse,
    routes.mapView,
    routes.savedProperties,
    routes.searchAlerts
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/browse" className="flex items-center space-x-2">
                <div className="bg-primary p-2 rounded-lg">
                  <ApperIcon name="Building" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-heading font-bold text-primary">
                  EstateView
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-secondary bg-secondary/10'
                        : 'text-gray-600 hover:text-secondary hover:bg-secondary/5'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="w-6 h-6" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-secondary bg-secondary/10'
                          : 'text-gray-600 hover:text-secondary hover:bg-secondary/5'
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-secondary'
                    : 'text-gray-600 hover:text-secondary'
                }`
              }
            >
              <ApperIcon name={item.icon} className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Layout