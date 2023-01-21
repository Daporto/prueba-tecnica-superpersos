const { getForecastWeatherByCity } = require('../services/weatherForecast.service');
const ApiError = require('../utils/errors/ApiError');
const WeatherForecastSerializer = require('../serializers/WeatherForecastSerializer');

const getWeather = async (req, res, next) => {
    try {
        const { city, state, countryCode } = req.query;
        if (!(city && state && countryCode)) throw new ApiError('BE-01');
        const weatherForecast = await getForecastWeatherByCity(city, state, countryCode);
        return res.status(200).json(new WeatherForecastSerializer(weatherForecast).toJSON());
    } catch (error) {
        next(error)
    }
}

module.exports = { getWeather }