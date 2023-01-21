const log = require('node-file-logger');

const generateRequesToEndpointLog = (message, tranid, queries, headers, body = null) => {
    log.Info(`${message} | tranId=${tranid} | queries=${queries} | headers=${JSON.stringify(headers)} | body=${JSON.stringify(body)}`);
}

const generateLogError = (tranId, error) => {
    log.Error(`tranId=${tranId} | ApiError=${JSON.stringify(error)}`)
}

module.exports = {
    generateRequesToEndpointLog,
    generateLogError
}