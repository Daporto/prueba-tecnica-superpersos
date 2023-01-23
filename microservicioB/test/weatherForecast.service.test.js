let {getForecastWeatherByCity} = require('../src/services/weatherForecast.service.js');
let {convertCityToCoordinates} = require('../src/services/geocoding.service.js');
let forecastApiResponse = require('./mocks/forecastApiResponse.json');
const axios = require('axios');

jest.mock('axios');
jest.mock('../src/services/geocoding.service.js');

describe('testing weatherForecast.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    it('test success getForecastWeatherByCity', async () => {
        axios.get.mockResolvedValue({
            data: forecastApiResponse
        });
        convertCityToCoordinates.mockResolvedValue({
            lat: 44.34,
            lon: 10.99
        })
        const forecast = await getForecastWeatherByCity("medellin", "antioquia", "col");
        expect(forecast.list[0].main.temp).toEqual(272.66);
        expect(forecast.list[0].main.feels_like).toEqual(269.62);
    })
})