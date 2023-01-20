const { GEOCODING_API_URL, API_KEY } = process.env;
const axios = require('axios');

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
        const data = result.data;
        if (data && data[0]) {
            const coordinates = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            return coordinates;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    convertCityToCoordinates
}