const { MICROSERVICE_B_SERVICE_NAME, MICROSERVICE_B_FORECAST_PATH } = process.env;
const axios = require('axios');
const ApiError = require('../utils/errors/ApiError');
const { generateRequesToEndpointLog } = require('../utils/logGenerator')
const { getConsulClient } = require('../config/consul.config')
const consulClient = getConsulClient();

const getWeatherForecast = async (tranId, city, state, countryCode) => {
    try {
        const availableInstances = await consulClient.health.service({
            service: MICROSERVICE_B_SERVICE_NAME,
            passing: true
        });
        const ipAddress = availableInstances[0].Service.Address;
        const port = availableInstances[0].Service.Port;
        const queries = `city=${city}&state=${state}&countryCode=${countryCode}`
        const url = `http://${ipAddress}:${port}${MICROSERVICE_B_FORECAST_PATH}?${queries}`
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "tranId": tranId
        };
        generateRequesToEndpointLog("Request to MicroserviceB endpoint", tranId, queries, headers);
        const result = await axios.get(url,
            {
                headers
            });
        const data = result.data;
        if (!data) throw new ApiError('TE-02');
        if (data.status != "success" && data.errorCode) {
            throw new ApiError(data.errorCode);
        } else if (data.data) {
            return data.data
        }
    } catch (error) {
        if (error.errorCode) {
            throw error
        } else {
            console.log(error)
            throw new ApiError('TE-02');
        }
    }
}

module.exports = {
    getWeatherForecast
}