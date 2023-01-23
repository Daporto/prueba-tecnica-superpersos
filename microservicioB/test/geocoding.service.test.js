let {convertCityToCoordinates} = require('../src/services/geocoding.service.js');
let geocodingApiResponse = require('./mocks/geocodingApiResponse.json');
const axios = require('axios');

jest.mock('axios');

describe('testing geocoding.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    it('test success convertCityToCoordinates', async () => {
        axios.get.mockResolvedValue({
            data: geocodingApiResponse
        });
        const coordinates = await convertCityToCoordinates("medellin", "antioquia", "col");
        expect(coordinates.lat).toEqual(10.4195841);
        expect(coordinates.lon).toEqual(-75.5271224);
    })
})