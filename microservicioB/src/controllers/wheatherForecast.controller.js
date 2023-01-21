const { getForecastWeatherByLatAndLon } = require('../services/weatherForecast.service')

const getWeather = async ( req, res ) =>{
    const { lat, lon } = req.query;
    if(!(lat && lon)) return res.status(400).json({message: 'Must supply a latitude and longitude'})
    const weather = await getForecastWeatherByLatAndLon(lat, lon);
    return res.status(200).json({weather})
}

module.exports = { getWeather }