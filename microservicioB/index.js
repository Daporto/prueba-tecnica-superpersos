require('dotenv').config();
const express = require('express');
const weatherRouter = require("./src/routes/weatherForecast.routes");
const ApiError = require('./src/utils/errors/ApiError');
const ErrorSerializer = require('./src/serializers/ErrorSerializer');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/weatherForecast', weatherRouter);

app.use((err, req, res, next) => {
  if (err && !err.errorCode) {
    const newError = new ApiError('TE-DEFAULT');
    res.status(newError.statusCode);
    res.json(new ErrorSerializer(newError).toJSON());
  } else {
    res.status(err.statusCode);
    res.json(new ErrorSerializer(err).toJSON());
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})