const BaseSerializer =  require('./BaseSerializer');

class WeatherForecastSerializer extends BaseSerializer{
    constructor(model){
        const serializedData = {
            list: model.list,
            city: model.city
        }
        super('success', serializedData);
    }
}

module.exports = WeatherForecastSerializer;