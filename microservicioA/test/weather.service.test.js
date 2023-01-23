let { convertCityToCoordinates } = require('../src/services/geocoding.service.js');
const { getWeatherByCity } = require('../src/services/weather.service.js');
const weatherApiResponse = require('./mocks/weatherApiResponse.json')
const axios = require('axios');

jest.mock('axios');
jest.mock('../src/services/geocoding.service.js');

describe('testing weather.service.js', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('test success getWeatherByCity', async () => {
        // given
        axios.get.mockResolvedValue({
            data: weatherApiResponse
        });
        convertCityToCoordinates.mockResolvedValue({
            lat: 44.34,
            lon: 10.99
        });

        // when
        const weather = await getWeatherByCity("cartagena", "Bolivar", "col");
        
        // then
        expect(weather.main.temp).toEqual(277.42);
        expect(weather.main.feels_like).toEqual(273.2);
    });
})