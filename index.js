const express = require("express");
const app = express();
const https = require("https");
var router = express.Router();
const port = 3000;
const apiKey = "55735da7a1ae42e59fa122510231112";

const exp =
  "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=rajasthan";

const city = "kota";

// async function weatherData() {
//   const res = await fetch(exp);

//   const data = await res.json();

//   console.log(data);
// }

app.get("/", (req, res) => {
  req.https.get(exp, (apiResponse) => {
    const data = JSON.parse(apiResponse);

    console.log(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
