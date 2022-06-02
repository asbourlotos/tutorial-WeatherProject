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
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in Paris is " + temp + " degrees Farenheit.</h1>");
            res.write("<p>It feels like " + feelsLike + " degrees Farenheit.</p>")
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});