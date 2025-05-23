export const API_BASE_URL = 'http://localhost:8080'

export const API_ROUTES = {
  AUTH :  `${API_BASE_URL}/api/v1/auth`,
  USER: `${API_BASE_URL}/api/v1/user`,
  RESTAURANT : `${API_BASE_URL}/api/v1/restaurant`,
  CATEGORY : `${API_BASE_URL}/api/v1/category`,
  FOOD : `${API_BASE_URL}/api/v1/food`,
  ORDERS : `${API_BASE_URL}/api/v1/orders`
}

// export const API_ENDPOINTS = {
//   REGISTER: `${API_ROUTES.AUTH}/register`,
//   LOGIN: `${API_ROUTES.AUTH}/login`,
//   // USER_PROFILE: `${API_ROUTES.USER}/profile`,
//   // etc.
//   RESTAURANT: `${API_ROUTES.RESTAURANT}/restaurant`
// };