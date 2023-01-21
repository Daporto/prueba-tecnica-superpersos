const { WEATHER_API_URL, API_KEY } = process.env;
const axios = require('axios');

const getForecastWeatherByLatAndLon = async (lat, lon) => {
  try {
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const result = await axios.get(url,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
    return result.data;
  } catch (error) {
    console.log(error);
  }
}


module.exports = { getForecastWeatherByLatAndLon }