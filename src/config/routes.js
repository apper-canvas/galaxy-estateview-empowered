import Browse from '../pages/Browse'
import PropertyDetail from '../pages/PropertyDetail'
import MapView from '../pages/MapView'
import SavedProperties from '../pages/SavedProperties'
import SearchAlerts from '../pages/SearchAlerts'

export const routes = {
  browse: {
    id: 'browse',
    label: 'Browse',
    path: '/browse',
    icon: 'Home',
    component: Browse
  },
  mapView: {
    id: 'mapView',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  },
  savedProperties: {
    id: 'savedProperties',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  },
  searchAlerts: {
    id: 'searchAlerts',
    label: 'Search Alerts',
    path: '/alerts',
    icon: 'Bell',
    component: SearchAlerts
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property Detail',
    path: '/property/:id',
    icon: 'Building',
    component: PropertyDetail
  }
}

export const routeArray = Object.values(routes)