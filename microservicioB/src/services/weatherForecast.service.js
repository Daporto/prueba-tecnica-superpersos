const { WEATHER_FORECAST_API_URL, API_KEY } = process.env;
const ApiError = require('../utils/errors/ApiError');
const {convertCityToCoordinates} = require('./geocoding.service');
const axios = require('axios');

const getForecastWeatherByCity = async (city, state, countryCode) => {
  try {
    const { lat, lon } = await convertCityToCoordinates(city, state, countryCode);
    const url = `${WEATHER_FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
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
      console.log(error)
      throw new ApiError('TE-01');
    }
  }
}


module.exports = { getForecastWeatherByCity }