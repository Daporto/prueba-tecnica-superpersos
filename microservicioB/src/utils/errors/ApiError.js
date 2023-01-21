const errors = require('./errors')

class ApiError extends Error {
    constructor(errorCode){
        super(errors[errorCode].message);
        this.statusCode = errors[errorCode].statusCode
        this.errorCode = errorCode;
    }
}

module.exports = ApiError;