import axios from 'axios';

const API_BASE_URL = 'https://cs-411-backend-717249317257.us-central1.run.app';

// Development mode flag - set to true to use mock data when API fails
const USE_MOCK_DATA_ON_ERROR = true;

// Create axios instance with CORS-friendly configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Add withCredentials if your backend supports it
  withCredentials: false,
});

// Add request interceptor to handle CORS preflight
api.interceptors.request.use(
  (config) => {
    // Add CORS headers to request
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export const fetchData = async (query) => {
  try {
    console.log(`Fetching data with query: ${query}`);
    
    const response = await api.get('/', {
      params: { query },
      // Add additional headers that might help with CORS
      headers: {
        'Origin': window.location.origin,
        'X-Requested-With': 'XMLHttpRequest',
      }
    });
    
    console.log('API Response:', response.data);
    return response.data.data || [];
  } catch (error) {
    console.error('API Error:', error);
    
    // If we're in development mode and should use mock data on error
    if (USE_MOCK_DATA_ON_ERROR) {
      console.log('Using mock data due to API error');
      return getMockData(query);
    }
    
    // Provide more specific error messages
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
    } else if (error.response?.status === 403) {
      throw new Error('Access forbidden: The server rejected the request. This might be a CORS issue.');
    } else if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Please check the backend URL.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error: The backend server is experiencing issues. Please try again later.');
    } else {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
};

// Alternative fetch method using native fetch API (sometimes works better with CORS)
export const fetchDataWithFetch = async (query) => {
  try {
    console.log(`Fetching data with fetch API: ${query}`);
    
    const response = await fetch(`${API_BASE_URL}/?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors', // Explicitly set CORS mode
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetch API Response:', data);
    return data.data || [];
  } catch (error) {
    console.error('Fetch API Error:', error);
    
    // If we're in development mode and should use mock data on error
    if (USE_MOCK_DATA_ON_ERROR) {
      console.log('Using mock data due to fetch API error');
      return getMockData(query);
    }
    
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

// Mock data for development/testing when API is not available
export const getMockData = (query) => {
  const mockData = {
    specs: [
      {
        ModelName: 'iPhone 14 Pro',
        BrandName: 'Apple',
        Price: 999,
        Rating: 4.5,
        Storage: 128,
        RAM: 6,
        ScreenSize: 6.1,
        Resolution: '2556 x 1179',
        BatteryCapacity: 3200,
        Processor: 'A16 Bionic'
      },
      {
        ModelName: 'Samsung Galaxy S23',
        BrandName: 'Samsung',
        Price: 799,
        Rating: 4.3,
        Storage: 128,
        RAM: 8,
        ScreenSize: 6.1,
        Resolution: '2340 x 1080',
        BatteryCapacity: 3900,
        Processor: 'Snapdragon 8 Gen 2'
      },
      {
        ModelName: 'Google Pixel 7',
        BrandName: 'Google',
        Price: 599,
        Rating: 4.4,
        Storage: 128,
        RAM: 8,
        ScreenSize: 6.3,
        Resolution: '2400 x 1080',
        BatteryCapacity: 4355,
        Processor: 'Google Tensor G2'
      },
      {
        ModelName: 'OnePlus 11',
        BrandName: 'OnePlus',
        Price: 699,
        Rating: 4.2,
        Storage: 128,
        RAM: 8,
        ScreenSize: 6.7,
        Resolution: '3216 x 1440',
        BatteryCapacity: 5000,
        Processor: 'Snapdragon 8 Gen 2'
      },
      {
        ModelName: 'Xiaomi 13',
        BrandName: 'Xiaomi',
        Price: 649,
        Rating: 4.1,
        Storage: 128,
        RAM: 8,
        ScreenSize: 6.36,
        Resolution: '2400 x 1080',
        BatteryCapacity: 4500,
        Processor: 'Snapdragon 8 Gen 2'
      }
    ],
    top5: [
      { BrandName: 'Apple', Num_Models: 15, Avg_Rating: 4.6 },
      { BrandName: 'Samsung', Num_Models: 20, Avg_Rating: 4.4 },
      { BrandName: 'Google', Num_Models: 8, Avg_Rating: 4.3 },
      { BrandName: 'OnePlus', Num_Models: 12, Avg_Rating: 4.2 },
      { BrandName: 'Xiaomi', Num_Models: 18, Avg_Rating: 4.1 }
    ],
    highRatings: [
      { ModelName: 'iPhone 14 Pro', Rating: 4.5, Num_Features: 25 },
      { ModelName: 'Samsung Galaxy S23', Rating: 4.3, Num_Features: 22 },
      { ModelName: 'Google Pixel 7', Rating: 4.4, Num_Features: 20 },
      { ModelName: 'OnePlus 11', Rating: 4.2, Num_Features: 18 },
      { ModelName: 'Xiaomi 13', Rating: 4.1, Num_Features: 16 }
    ],
    used: [
      { ModelName: 'iPhone 13', ListingPrice: 699, NewPrice: 799, ListingID: 'USED001' },
      { ModelName: 'Samsung Galaxy S22', ListingPrice: 599, NewPrice: 699, ListingID: 'USED002' },
      { ModelName: 'Google Pixel 6', ListingPrice: 449, NewPrice: 599, ListingID: 'USED003' },
      { ModelName: 'OnePlus 10', ListingPrice: 549, NewPrice: 699, ListingID: 'USED004' }
    ],
    scamUsed: [
      { ModelName: 'iPhone 12', ListingPrice: 899, NewPrice: 699, ListingID: 'SCAM001' },
      { ModelName: 'Samsung Galaxy S21', ListingPrice: 799, NewPrice: 599, ListingID: 'SCAM002' }
    ],
    largeDiff: [
      { ModelName: 'iPhone 13', Num_Listings: 5, Avg_Used_Price: 650, Min_Used_Price: 550, Price_Difference: 100 },
      { ModelName: 'Samsung Galaxy S22', Num_Listings: 3, Avg_Used_Price: 580, Min_Used_Price: 480, Price_Difference: 100 },
      { ModelName: 'Google Pixel 6', Num_Listings: 4, Avg_Used_Price: 420, Min_Used_Price: 350, Price_Difference: 70 }
    ]
  };

  return mockData[query] || [];
};

export const apiQueries = {
  TOP_5_BRANDS: 'top5',
  SCAM_USED: 'scamUsed',
  LARGE_DIFF: 'largeDiff',
  HIGH_RATINGS: 'highRatings',
  BRANDS: 'brands',
  FEATURES: 'features',
  SPECS: 'specs',
  PHONE_FEATURES: 'phoneFeatures',
  PROCESSORS: 'processors',
  USED: 'used'
};

export default api; 