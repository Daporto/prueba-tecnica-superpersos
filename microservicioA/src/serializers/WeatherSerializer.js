const BaseSerializer =  require('./BaseSerializer');

class WeatherSerializer extends BaseSerializer{
    constructor(model){
        super('success', model);
    }
}

module.exports = WeatherSerializer;