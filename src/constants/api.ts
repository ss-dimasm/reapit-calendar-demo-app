export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'api-version': '2020-01-31',
}

export const URLS = {
  CONFIGURATION_APPOINTMENT_TYPES: '/configuration/appointmentTypes',
  CONFIGURATION_PROPERTIES_LIST: '/properties/',
  CONFIGURATION_PROPERTY_IMAGES: '/propertyImages/',
  COMPANIES: {
    ALL: '/companies',
    SINGLE_COMPANY: '/companies/',
  },
  PROPERTIES: {
    SINGLE: '/properties/',
    PAGED: '/properties',
  },
  PROPERTY_IMAGES: {
    PAGED: '/propertyImages/',
  },
  APPOINTMENT: {
    PAGED: '/appointments',
  },
  NEGOTIATOR: {
    SINGLE: '/negotiators/',
    PAGED: '/negotiators',
  },
}
