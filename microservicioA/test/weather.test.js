import { describe, expect, it } from 'vitest'
const rewire = require('rewire')
const geocodingService = rewire('../src/services/geocoding.service.js');
const weatherService = rewire('../src/services/weather.service.js');
const weatherServiceResponse = require('./mocks/weatherServiceResponse.json')
const geocodingServiceResponse = require('./mocks/geocodingServiceResponse.json')

describe('testing geocoding.service', () => {
    it('test success convertCityToCoordinates', async () => {
        // given
        const axios = {
            get: () => {
                return {
                    data: geocodingServiceResponse
                }
            }
        }
        const revertMock = geocodingService.__set__('axios', axios)

        // when
        const coordinates = await geocodingService.convertCityToCoordinates("cartagena", "Bolivar", "col");
        revertMock();
        // then
        expect(coordinates.lat).toEqual(10.4195841);
        expect(coordinates.lon).toEqual(-75.5271224);
    });
});

describe('testing weather.service.js', () => {
    it('test success getWeatherByCity', async () => {
        // given

        const convertCityToCoordinates = () => {
            return {
                lon: -74.0059,
                lat: 40.7128
            }
        }
        weatherService.__set__('convertCityToCoordinates', convertCityToCoordinates);

        const axios = {
            get: () => {
                return {
                    data: weatherServiceResponse
                }
            }
        }

        const revertMock = weatherService.__set__('axios', axios);

        // when
        const weather = await weatherService.getWeatherByCity("cartagena", "Bolivar", "col");
        revertMock();
        // then
        expect(weather.main.temp).toEqual(277.42);
        expect(weather.main.feels_like).toEqual(273.2);
    });
})