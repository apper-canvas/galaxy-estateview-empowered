import BrowsePage from '@/components/pages/BrowsePage'
import PropertyDetailPage from '@/components/pages/PropertyDetailPage'
import MapViewPage from '@/components/pages/MapViewPage'
import SavedPropertiesPage from '@/components/pages/SavedPropertiesPage'
import SearchAlertsPage from '@/components/pages/SearchAlertsPage'

export const routes = {
  browse: {
    id: 'browse',
    label: 'Browse',
    path: '/browse',
    icon: 'Home',
component: BrowsePage
  },
  mapView: {
    id: 'mapView',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
component: MapViewPage
  },
  savedProperties: {
    id: 'savedProperties',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
component: SavedPropertiesPage
  },
  searchAlerts: {
    id: 'searchAlerts',
    label: 'Search Alerts',
    path: '/alerts',
    icon: 'Bell',
component: SearchAlertsPage
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property Detail',
    path: '/property/:id',
    icon: 'Building',
component: PropertyDetailPage
  }
}

export const routeArray = Object.values(routes)