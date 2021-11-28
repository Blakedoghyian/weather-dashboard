$(document).ready(function () {
    var lat = "";
    var lon = "";
    var cityName = "";


    // first weaather function to get api data
    function getWeatherOneAPI(a,b) {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

        //second api call to get the 5 day forecast
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //removes 5-day forecast before displaying the next city's data
            $(".card-deck").empty();

            //gets the weather icon and appends it the page
            var icon = response.current.weather[0].icon;
            var iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#city").append(iconImg);

            //if statement to update the background color of the UV Index
            var uvi = parseInt(response.current.uvi);
            if (uvi <= 2) {
                $(".color").css({ "background-color": "green", "color": "white" });
            } else if (uvi >= 3 && uvi <= 5) {
                $(".color").css({ "background-color": "yellow", "color": "black" });
            } else if (uvi >= 6 && uvi <= 7) {
                $(".color").css({ "background-color": "orange" });
            } else if (uvi >= 8 && uvi <= 10) {
                $(".color").css({ "background-color": "red", "color": "white" });
            } else if (uvi >= 11) {
                $(".color").css({ "background-color": "violet", "color": "white" });
            }

            //populates the corresponding html IDs with the current weather data
            $("#temp").text("Temperature: " + response.current.temp + "° F");
            $("#humidity").text("Humidity: " + response.current.humidity + "%");
            $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
            $(".color").text(response.current.uvi);

            //displays the html to the user
            $("#current").css({"display":"block"});

            //array for the daily response
            var daily = response.daily;

            //for loop to loop through the daily response array
            for (i = 1; i < daily.length - 2; i++) {
                //saves each response in a variable
                var dailyDate = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
                var dailyTemp = daily[i].temp.day;
                var dailyHum = daily[i].humidity;
                var dailyIcon = daily[i].weather[0].icon;

                //creates dynamic elements
                var dailyDiv = $("<div class='card text-white bg-primary p-2'>")
                var pTemp = $("<p>");
                var pHum = $("<p>");
                var imgIcon = $("<img>");
                var hDate = $("<h6>");

                //adds text and attributes to the dynamic elements
                hDate.text(dailyDate);
                imgIcon.attr("src", "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png")
                imgIcon.addClass("img-fluid");
                imgIcon.css({"width": "100%"});
                pTemp.text("Temp: " + dailyTemp + "° F");
                pHum.text("Humidity: " + dailyHum + "%");

                //appends the dynamic elements to the html
                dailyDiv.append(hDate);
                dailyDiv.append(imgIcon);
                dailyDiv.append(pTemp);
                dailyDiv.append(pHum);
                $(".card-deck").append(dailyDiv);

                //displays this html to the user
                $("#five-day").css({"display":"block"});
            }

        })
    }

})