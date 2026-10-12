import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // In a real app, this would be your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API calls for demonstration
export const mockApi = {
  getWeather: async (lat: number, lon: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      temp: 28,
      humidity: 65,
      rainProb: 20,
      condition: 'Sunny',
      forecast: [
        { day: 'Mon', temp: 29, condition: 'Sunny' },
        { day: 'Tue', temp: 27, condition: 'Cloudy' },
        { day: 'Wed', temp: 26, condition: 'Rain' },
      ]
    };
  },
  getCropRecommendation: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      recommendedCrop: 'Wheat',
      confidence: 92,
      reason: 'Based on your soil pH of 6.5 and the upcoming winter season, Wheat is the most suitable crop for your region.'
    };
  },
  getMarketPrices: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { crop: 'Wheat', price: '2100', trend: 'up' },
      { crop: 'Rice', price: '1950', trend: 'down' },
      { crop: 'Corn', price: '1800', trend: 'stable' },
    ];
  },
  getMarketTrends: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { day: 'Mon', Wheat: 2050, Rice: 1980, Corn: 1780 },
      { day: 'Tue', Wheat: 2070, Rice: 1970, Corn: 1790 },
      { day: 'Wed', Wheat: 2060, Rice: 1960, Corn: 1800 },
      { day: 'Thu', Wheat: 2085, Rice: 1955, Corn: 1805 },
      { day: 'Fri', Wheat: 2100, Rice: 1950, Corn: 1800 },
      { day: 'Sat', Wheat: 2110, Rice: 1945, Corn: 1810 },
      { day: 'Sun', Wheat: 2125, Rice: 1940, Corn: 1815 },
    ];
  }
};

export default api;
