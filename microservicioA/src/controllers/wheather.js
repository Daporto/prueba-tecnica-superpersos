const { getWeatherByCity } = require('../services/weather.service')

const getWeather = async ( req, res ) =>{
    const { city, state, countryCode } = req.query;
    if(!(city &&  state && countryCode)) return res.status(400).json({message: 'Must supply a city, state and country'})
    const weather = await getWeatherByCity(city, state, countryCode);
    return res.status(200).json({weather})
}

module.exports = { getWeather }