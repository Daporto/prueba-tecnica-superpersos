const { getWeatherByCity } = require('../services/weather.service');
const ApiError = require('../utils/errors/ApiError');
const WeatherSerializer = require('../serializers/WeatherSerializer')
const WeatherForecastSerializer = require('../serializers/WeatherForecastSerializer');
const {getWeatherForecast} = require('../apiGateway/microserviceB.gateway')
const {generateTranId} = require('../utils/tranIdGenerator');
const {generateRequestLog, generateRequesToEndpointLog} = require('../utils/logGenerator')

const getWeather = async (req, res, next) => {
    try {
        const tranId = generateTranId();
        req.tranId = tranId;
        generateRequesToEndpointLog("Request to MicroserviceA endpoint", tranId, req._parsedUrl.query, req.headers, req.body);
        const { city, state, countryCode, withForecast } = req.query;
        if (!(city && state && countryCode)) throw new ApiError('BE-01');
        if(withForecast && withForecast==='true'){
            const weatherForecast = await getWeatherForecast(tranId, city, state, countryCode);
            return res.status(200).json(new WeatherForecastSerializer(weatherForecast).toJSON());
        }else{
            const weather = await getWeatherByCity(city, state, countryCode);
            return res.status(200).json(new WeatherSerializer(weather).toJSON());
        }
    } catch (error) {
        next(error)
    }

}

module.exports = { getWeather }