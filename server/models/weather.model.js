import sql from '../db/index.js';

export const logCity = async (userId, cityName) => {
  const [log] = await sql`
    INSERT INTO weather_logs (city_name, user_id)
    VALUES (${cityName}, ${userId})
    RETURNING *
  `;
  return log;
};

export const getRecentCities = async (userId) => {
  const cities = await sql`
    SELECT DISTINCT ON (city_name) city_name, created_at
    FROM weather_logs
    WHERE user_id = ${userId}
    ORDER BY city_name, created_at DESC
    LIMIT 3
  `;
  return cities;
}; 