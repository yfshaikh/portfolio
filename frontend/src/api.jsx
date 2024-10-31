const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/api'
  : 'https://yfshaikh.com/api';
  

export default API_BASE_URL;