const { MICROSERVICE_B_URL } = process.env;
const axios = require('axios');
const ApiError = require('../utils/errors/ApiError');
const {generateRequesToEndpointLog} = require('../utils/logGenerator')

const getWeatherForecast = async (tranId, city, state, countryCode) => {
    try {
        const queries = `city=${city}&state=${state}&countryCode=${countryCode}`
        const url = `${MICROSERVICE_B_URL}?${queries}`
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
            throw new ApiError('TE-02');
        }
    }
}

module.exports = {
    getWeatherForecast
}