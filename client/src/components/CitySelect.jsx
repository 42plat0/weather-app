import React from 'react';
import Select from 'react-select';
import { useCities } from '../hooks/useCities';

/**
 * CitySelect Component
 * 
 * A React component that provides a searchable dropdown for city selection
 * and displays the most frequently viewed cities.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCitySelect - Callback function called when a city is selected
 */
export const CitySelect = ({ onCitySelect }) => {
  // This hook provides:
  // - cities: array of all available cities
  // - loading: boolean indicating if cities are being fetched
  // - error: any error that occurred during fetching
  // - mostViewedCities: array of up to 3 most viewed cities
  // - updateMostViewed: function to update most viewed cities list
  const { cities, loading, error, mostViewedCities, updateMostViewed } = useCities();

  /**
   * Handler for city selection events
   * Called when a city is selected from either the dropdown or most viewed chips
   * 
   * @param {Object} selectedOption - The selected city object
   */
  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      // Update the most viewed cities list in localStorage
      updateMostViewed(selectedOption);
      // Call the parent component's handler with the selected city
      onCitySelect(selectedOption);
    }
  };

  // Show loading state while fetching cities
  if (loading) return <div>Loading cities...</div>;
  // Show error message if cities fetch failed
  if (error) return <div>Error loading cities: {error}</div>;

  // Render the component
  return (
    <div className="city-select-container">
      {/* Searchable dropdown for city selection */}
      <Select
        options={cities}
        onChange={handleCityChange}
        placeholder="Search for a city..."
        isSearchable
        className="city-select"
      />
      
      {/* Most viewed cities section - only shown if there are most viewed cities */}
      {mostViewedCities.length > 0 && (
        <div className="most-viewed-cities">
          <h4>Most Viewed Cities</h4>
          <div className="city-chips">
            {/* Map through most viewed cities and create clickable chips */}
            {mostViewedCities.map(city => (
              <button
                key={city.value} // React requires unique key for list items
                className="city-chip"
                onClick={() => handleCityChange(city)}
              >
                {city.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 