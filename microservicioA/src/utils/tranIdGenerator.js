const { v4: uuidv4 } = require('uuid');
const generateTranId = () => {
    return uuidv4();
}

module.exports = {generateTranId}