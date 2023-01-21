const businessErrors = require('./business-errors.json');
const technicalErrors = require('./technical-errors.json');

const errors = {
    ...businessErrors,
    ...technicalErrors
}

module.exports = errors;