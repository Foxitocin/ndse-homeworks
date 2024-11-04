const https = require("https");
const { DEF_API_KEY, DEF_CITY } = require("./config");

const API_KEY = process.env.WEATHER_API_KEY || DEF_API_KEY;
const CITY = process.argv[2] || DEF_CITY;
const URL = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY}`;

https
  .get(URL, (resp) => {
    const { statusCode } = resp;
    if (statusCode !== 200) {
      resp.resume();
      return;
    }
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      const parsedData = JSON.parse(data);
      console.log(
        `
    Current temperature in ${CITY} is ${parsedData.current.temperature} degrees C.
    It feels like ${parsedData.current.feelslike} degrees.
    Humidity is ${parsedData.current.humidity}%.
    Cloud cover is ${parsedData.current.cloudcover}%.
    Pressure is ${parsedData.current.pressure} hPa.
    Wind speed is ${parsedData.current.wind_speed} km/h.
    Wind direction is ${parsedData.current.wind_dir}.
    Weather description is ${parsedData.current.weather_descriptions[0]}.
    UV index is ${parsedData.current.uv_index}.
    Visibility is ${parsedData.current.visibility} km.
    `
      );
    });
  })
  .on("error", (err) => {
    console.error("Error: " + err.message);
  });
