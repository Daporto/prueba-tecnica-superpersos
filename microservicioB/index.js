require('dotenv').config();
const express = require('express');
const weatherRouter = require("./src/routes/weatherForecast.routes");
const app = express();
const port = 3001;

app.use(express.json());
app.use('/weatherForecast', weatherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})