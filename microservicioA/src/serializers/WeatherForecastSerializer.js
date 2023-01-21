const BaseSerializer =  require('./BaseSerializer');

class WeatherForecastSerializer extends BaseSerializer{
    constructor(model){
        super('success', model);
    }
}

module.exports = WeatherForecastSerializer;