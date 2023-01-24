const {getWeatherForecast} = require('../src/apiGateway/microserviceB.gateway')
const axios = require('axios');
const microserviceBGatewayResponse = require('./mocks/microserviceBGatewayResponse.json');

jest.mock('axios');

describe('testing geocoding.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    it('test success convertCityToCoordinates', async () => {
        axios.get.mockResolvedValue({
            data: microserviceBGatewayResponse
        });
        const microserviceBGatewayRes = await getWeatherForecast("medellin", "antioquia", "col");
        console.log({microserviceBGatewayRes})
        expect(microserviceBGatewayRes.data.list[0].main.temp).toBe(272.66);
    })
})