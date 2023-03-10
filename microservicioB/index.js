require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const weatherRouter = require("./src/routes/weatherForecast.routes");
const indexRouter = require("./src/routes/index.routes");
const ApiError = require('./src/utils/errors/ApiError');
const ErrorSerializer = require('./src/serializers/ErrorSerializer');
const{generateLogError} = require('./src/utils/logGenerator');
const log = require('node-file-logger');
const loggerOptions = require('./src/config/logger.config');
const {registerServiceInConcil} = require('./src/config/consul.config');

const app = express();

log.SetUserOptions(loggerOptions);
registerServiceInConcil();

app.use(express.json());
app.use('/', indexRouter);
app.use('/weatherForecast', weatherRouter);

app.use((err, req, res, next) => {
  if (err && !err.errorCode) {
    const newError = new ApiError('TE-DEFAULT');
    generateLogError(req.tranId, newError);
    res.status(newError.statusCode);
    res.json(new ErrorSerializer(newError).toJSON());
  } else {
    generateLogError(req.tranId, err);
    res.status(err.statusCode);
    res.json(new ErrorSerializer(err).toJSON());
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})