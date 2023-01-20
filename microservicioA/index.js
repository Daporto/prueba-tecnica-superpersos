require('dotenv').config();
const express = require('express');
const weatherRouter = require("./src/routes/weather.routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use('/weather', weatherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})