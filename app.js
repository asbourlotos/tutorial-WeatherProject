const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=b021defb5a0f61c8aefcc00ad0a38a29&q=paris&units=imperial";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            console.log(description);
            console.log(temp);
            console.log("It feels like " + feelsLike + " degrees outside.");
        });
    });
    res.send("Server is up and running.");
});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});