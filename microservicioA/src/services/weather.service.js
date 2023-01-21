const { WEATHER_API_URL, API_KEY } = process.env;
const { convertCityToCoordinates } = require('./geocoding.service');
const ApiError = require('../utils/errors/ApiError');

const axios = require('axios');

const getWeatherByCity = async (city, state, countryCode) => {
  try {
    const { lat, lon } = await convertCityToCoordinates(city, state, countryCode);
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const result = await axios.get(url,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
    const data = result.data;
    if (!data) throw new ApiError('TE-01');
    return data;
  } catch (error) {
    if (error.errorCode) {
      throw error
    } else {
      throw new ApiError('TE-01');
    }
  }
}


module.exports = { getWeatherByCity }