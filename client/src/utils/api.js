// Base URL for all API calls to Meteo.lt
const METEO_API_BASE_URL = 'https://api.meteo.lt/v1';

// Function to fetch all available Lithuanian cities
export const fetchCities = async () => {
  try {
    // Make GET request to /places endpoint
    const response = await fetch(`${METEO_API_BASE_URL}/places`);
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const cities = await response.json();
    // Transform API response into format needed for react-select:
    // - value: city code for API calls
    // - label: city name for display
    // - coordinates: for potential map features
    // - country: always LT for Lithuania
    return cities.map(city => ({
      value: city.code,
      label: city.name,
      coordinates: city.coordinates,
      country: 'LT'
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Function to fetch detailed weather forecast for a specific city
export const fetchCityForecast = async (cityCode) => {
  try {
    // Make GET request to /places/{cityCode}/forecasts/long-term endpoint
    const response = await fetch(`${METEO_API_BASE_URL}/places/${cityCode}/forecasts/long-term`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Function to fetch detailed information about a specific city
export const fetchCityDetails = async (cityCode) => {
  try {
    // Make GET request to /places/{cityCode} endpoint
    const response = await fetch(`${METEO_API_BASE_URL}/places/${cityCode}`);
    if (!response.ok) {
      throw new Error('Failed to fetch city details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching city details:', error);
    throw error;
  }
};