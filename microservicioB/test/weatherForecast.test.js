import { describe, expect, it } from 'vitest'

const rewire = require('rewire')
const weatherForecastService = rewire('../src/services/weatherForecast.service.js');

describe('testing weatherForecast.service', ()=> {
    it('test success getForecastWeatherByLatAndLon', async () => {
        const forecastData = {
            "cod": "200",
            "message": 0,
            "cnt": 40,
            "list": [
                {
                    "dt": 1674226800,
                    "main": {
                        "temp": 272.66,
                        "feels_like": 269.62,
                        "temp_min": 271.97,
                        "temp_max": 272.66,
                        "pressure": 1009,
                        "sea_level": 1009,
                        "grnd_level": 921,
                        "humidity": 89,
                        "temp_kf": 0.69
                    },
                    "weather": [
                        {
                            "id": 600,
                            "main": "Snow",
                            "description": "light snow",
                            "icon": "13d"
                        }
                    ],
                    "clouds": {
                        "all": 100
                    },
                    "wind": {
                        "speed": 2.43,
                        "deg": 353,
                        "gust": 5.06
                    },
                    "visibility": 2893,
                    "pop": 0.44,
                    "snow": {
                        "3h": 1.47
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2023-01-20 15:00:00"
                }
            ],
            "city": {
                "id": 3163858,
                "name": "Zocca",
                "coord": {
                    "lat": 44.34,
                    "lon": 10.99
                },
                "country": "IT",
                "population": 4593,
                "timezone": 3600,
                "sunrise": 1674197143,
                "sunset": 1674230866
            }
        }

        const axios = {
            get: () => {
                return {
                    data: forecastData
                }
            }
        }
        const revertMock = weatherForecastService.__set__('axios', axios)
        const forecast = await weatherForecastService.getForecastWeatherByLatAndLon(44.34, 10.99)
        revertMock();
        expect(forecast.list[0].main.temp).toEqual(272.66);
        expect(forecast.list[0].main.feels_like).toEqual(269.62);
    })
})