import { describe, expect, it } from 'vitest'
const rewire = require('rewire')
const geocodingService = rewire('../src/services/geocoding.service.js');
const weatherService = rewire('../src/services/weather.service.js');

describe('testing geocoding.service', () => {
    it('test success convertCityToCoordinates', async () => {
        // given
        const geocodingData = [
            {
                "name": "Cartagena",
                "local_names": {
                    "en": "Cartagena",
                    "fr": "Carthagène",
                    "hu": "Cartagena",
                    "mk": "Картахена",
                    "ru": "Картахена",
                    "uk": "Картахена",
                    "es": "Cartagena de Indias"
                },
                "lat": 10.4195841,
                "lon": -75.5271224,
                "country": "CO",
                "state": "Bolívar"
            }
        ];
        const axios = {
            get: () => {
                return {
                    data: geocodingData
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

        const weatherData = {
            "coord": {
                "lon": -74.0059,
                "lat": 40.7128
            },
            "weather": [
                {
                    "id": 701,
                    "main": "Mist",
                    "description": "mist",
                    "icon": "50n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 277.42,
                "feels_like": 273.2,
                "temp_min": 276.01,
                "temp_max": 278.8,
                "pressure": 1003,
                "humidity": 91
            },
            "visibility": 9656,
            "wind": {
                "speed": 5.81,
                "deg": 360,
                "gust": 8.05
            },
            "clouds": {
                "all": 40
            },
            "dt": 1674215391,
            "sys": {
                "type": 2,
                "id": 2039034,
                "country": "US",
                "sunrise": 1674216929,
                "sunset": 1674251886
            },
            "timezone": -18000,
            "id": 5128581,
            "name": "New York",
            "cod": 200
        };

        const axios = {
            get: () => {
                return {
                    data: weatherData
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