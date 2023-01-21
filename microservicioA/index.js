require('dotenv').config();
const express = require('express');
const log = require('node-file-logger');
const loggerOptions = require('./src/config/logger.config');
const weatherRouter = require('./src/routes/weather.routes');
const ErrorSerializer = require('./src/serializers/ErrorSerializer');
const ApiError = require('./src/utils/errors/ApiError');
const{generateLogError} = require('./src/utils/logGenerator');
const app = express();
const port = 3000;

log.SetUserOptions(loggerOptions);

app.use(express.json());
app.use('/weather', weatherRouter);

app.use((err, req, res, next) => {
   if(err && !err.errorCode){
    const newError = new ApiError('TE-DEFAULT');
    generateLogError(req.tranId, newError);
    res.status(newError.statusCode);
    res.json(new ErrorSerializer(newError).toJSON());
  }else{
    generateLogError(req.tranId, err);
    res.status(err.statusCode);
    res.json(new ErrorSerializer(err).toJSON());
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
