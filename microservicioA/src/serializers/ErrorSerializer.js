const BaseSerializer = require('./BaseSerializer')

class ErrorSerializer extends BaseSerializer{
    constructor(error){
        super(error.message, null);
        this.errorCode = error.errorCode;
    }

    toJSON() {
        return {
            status: this.status,
            errorCode: this.errorCode
        };
    }
}

module.exports = ErrorSerializer;