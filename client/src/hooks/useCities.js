import { useState, useEffect } from 'react';
import { fetchCities } from '../utils/api';

const MOST_VIEWED_CITIES_KEY = 'mostViewedCities';
const MAX_MOST_VIEWED = 3;

/**
 * Custom React Hook: useCities
 * 
 * This hook manages the state and logic for:
 * 1. Fetching and storing available cities
 * 2. Tracking most viewed cities in localStorage
 * 3. Loading and error states
 * 
 * @returns {Object} An object containing:
 *   - cities: Array of all available cities
 *   - loading: Boolean indicating if cities are being fetched
 *   - error: Any error that occurred during fetching
 *   - mostViewedCities: Array of most viewed cities
 *   - updateMostViewed: Function to update most viewed cities
 */
export const useCities = () => {
  // State for storing all available cities
  // useState hook creates a state variable and its setter function
  const [cities, setCities] = useState([]);

  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  // State for storing any errors that occur
  const [error, setError] = useState(null);

  // State for most viewed cities
  // Initialize with data from localStorage using a function
  // This function only runs once when the component mounts
  const [mostViewedCities, setMostViewedCities] = useState(() => {
    const stored = localStorage.getItem(MOST_VIEWED_CITIES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // useEffect hook runs side effects in component
  // Empty dependency array [] means this only runs once when component mounts
  useEffect(() => {
    // Async function to load cities
    const loadCities = async () => {
      try {
        // Fetch cities from API
        const citiesData = await fetchCities();
        // Update cities state with fetched data
        setCities(citiesData);
        // Set loading to false as data is loaded
        setLoading(false);
      } catch (err) {
        // If error occurs, store it in error state
        setError(err.message);
        // Set loading to false as operation is complete
        setLoading(false);
      }
    };

    // Call the async function
    loadCities();
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Updates the most viewed cities list
   * 
   * @param {Object} city - The city to add to most viewed list
   */
  const updateMostViewed = (city) => {
    // Use functional update pattern for state updates
    // This ensures we always have the latest state
    setMostViewedCities(prev => {
      // Remove the city if it already exists
      const filtered = prev.filter(c => c.value !== city.value);
      
      // Add the new city to the beginning
      const updated = [city, ...filtered];
      
      // Keep only the top N most viewed cities
      const trimmed = updated.slice(0, MAX_MOST_VIEWED);
      
      // Save to localStorage for persistence
      localStorage.setItem(MOST_VIEWED_CITIES_KEY, JSON.stringify(trimmed));
      
      return trimmed;
    });
  };

  // Return all the necessary values and functions
  // This is what components using this hook will receive
  return {
    cities,
    loading,
    error,
    mostViewedCities,
    updateMostViewed
  };
}; 