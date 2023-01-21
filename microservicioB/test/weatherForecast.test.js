import { describe, expect, it } from 'vitest'

const rewire = require('rewire')
const weatherForecastService = rewire('../src/services/weatherForecast.service.js');

const forecastServiceResponse = require('./mocks/forecastServiceResponse.json');

describe('testing weatherForecast.service', () => {
    it('test success getForecastWeatherByLatAndLon', async () => {
        
        const convertCityToCoordinates = () => {
            return {
                lat: 44.34,
                lon: 10.99
            }
        }
        const revertMockCoor = weatherForecastService.__set__('convertCityToCoordinates', convertCityToCoordinates);

        const axios = {
            get: () => {
                return {
                    data: forecastServiceResponse
                }
            }
        };

        const revertMock = weatherForecastService.__set__('axios', axios)
        const forecast = await weatherForecastService.getForecastWeatherByCity("medellin", "antioquia", "col");
        revertMock();
        revertMockCoor();
        expect(forecast.list[0].main.temp).toEqual(272.66);
        expect(forecast.list[0].main.feels_like).toEqual(269.62);
    })
})