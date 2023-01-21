const { API_KEY } = process.env;
const axios = require('axios');
const ApiError = require('../utils/errors/ApiError');
const GEOCODING_API_URL = "https://testingmyapi.com";

const convertCityToCoordinates = async (city, state, countryCode) => {
    try {
        const cityLocation = `${city},${state},${countryCode}`;
        const url = `${GEOCODING_API_URL}?q=${cityLocation}&limit=1&appid=${API_KEY}`
        const result = await axios.get(url,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        console.log({result})
        const data = result.data;
        if(!data) throw new ApiError('TE-01');
        if (data && Array.isArray(data) && !data[0]) {
            throw new ApiError('BE-02');
        }else{
            const coordinates = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            return coordinates;
        }
    } catch (error) {
        if(error.errorCode){
            throw error
        }else{
            throw new ApiError('TE-01');
        }
    }
}

module.exports = {
    convertCityToCoordinates
}