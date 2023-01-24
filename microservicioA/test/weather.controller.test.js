const {getWeather} = require('../src/controllers/wheather.controller');
const {getWeatherByCity} = require('../src/services/weather.service');
const {getWeatherForecast} = require('../src/apiGateway/microserviceB.gateway')
const weatherApiResponse = require('./mocks/weatherApiResponse.json');
const microserviceBGatewayResponse = require('./mocks/microserviceBGatewayResponse.json');

jest.mock('../src/services/weather.service');
jest.mock('../src/apiGateway/microserviceB.gateway');

describe('wheather.controller test', () => {
    it('success response without forecast ', async () => {
        const request = {
            query: {
                city:"cartagena", 
                state: "Bolívar", 
                countryCode: "Col", 
                withForecast: "false"
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
        getWeatherByCity.mockResolvedValue(weatherApiResponse);

        const weatherResponse = await getWeather(request, response);
        expect(weatherResponse.statusCode).toBe(200);
        expect(weatherResponse.status).toBe('success');
        expect(weatherResponse.data.main.temp).toBe(277.42);
    });

    it('success response with forecast ', async () => {
        const request = {
            query: {
                city:"cartagena", 
                state: "Bolívar", 
                countryCode: "Col", 
                withForecast: "true"
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
        getWeatherForecast.mockResolvedValue(microserviceBGatewayResponse);

        const weatherResponse = await getWeather(request, response);
        expect(weatherResponse.statusCode).toBe(200);
        expect(weatherResponse.status).toBe('success');
        expect(weatherResponse.data.list[0].main.temp).toBe(272.66);
    });
});