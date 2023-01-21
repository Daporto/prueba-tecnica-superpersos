const { getWeatherByCity } = require('../services/weather.service');
const ApiError = require('../utils/errors/ApiError');
const WeatherSerializer = require('../serializers/WeatherSerializer')

const getWeather = async (req, res, next) => {
    try {
        const { city, state, countryCode } = req.query;
        if (!(city && state && countryCode)) throw new ApiError('BE-01');
        const weather = await getWeatherByCity(city, state, countryCode);
        return res.status(200).json(new WeatherSerializer(weather).toJSON())
    } catch (error) {
        next(error)
    }

}

module.exports = { getWeather }