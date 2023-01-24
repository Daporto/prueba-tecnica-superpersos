const {getWeather} = require('../src/controllers/wheatherForecast.controller');
const {getForecastWeatherByCity} = require('../src/services/weatherForecast.service');
const forecastApiResponse = require('./mocks/forecastApiResponse.json');

jest.mock('../src/services/weatherForecast.service');

describe('wheather.controller test', () => {
    it('success response without forecast ', async () => {
        const request = {
            query: {
                city:"cartagena", 
                state: "Bolívar", 
                countryCode: "Col"
            },
            _parsedUrl:{
                query:""
            }, 
            headers:{}, 
            body:{}
        };
        const response = {
            status: jest.fn().mockImplementation((statusCode) => {
                return {
                    statusCode,
                    json: jest.fn().mockImplementation((result) => {
                        return {
                            statusCode,
                            ...result
                        }
                    })
                }
            })
        };
        getForecastWeatherByCity.mockResolvedValue(forecastApiResponse);

        const weatherResponse = await getWeather(request, response);
        expect(weatherResponse.statusCode).toBe(200);
        expect(weatherResponse.status).toBe('success');
        expect(weatherResponse.data.list[0].main.temp).toBe(272.66);
    });
});