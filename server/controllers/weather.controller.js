import { logCity, getRecentCities } from '../models/weather.model.js';

export const logWeatherSearch = async (req, res, next) => {
  try {
    const { cityName } = req.body;
    const userId = req.user.id;
    
    const log = await logCity(userId, cityName);
    
    res.status(201).json({
      status: 'success',
      data: log
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentSearches = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const cities = await getRecentCities(userId);
    
    res.status(200).json({
      status: 'success',
      data: cities
    });
  } catch (error) {
    next(error);
  }
}; 