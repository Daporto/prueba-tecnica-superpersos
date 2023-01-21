const { WEATHER_API_URL, API_KEY } = process.env;
const { convertCityToCoordinates } = require('./geocoding.service');
const ApiError = require('../utils/errors/ApiError');

const axios = require('axios');

const getWeatherByCity = async (city, state, countryCode) => {
  try {
    const { lat, lon } = await convertCityToCoordinates(city, state, countryCode);
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    /*Las consultas a servicios externos como este llamado de axios, en el caso de Node.js se manejan como no bloqueantes,
      ya que por la naturaleza del lenguaje, este continua con su flujo y espera a que un evento le notifique la respuesta
      de esta consulta
    */
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