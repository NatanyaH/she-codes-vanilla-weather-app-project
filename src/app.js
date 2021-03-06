function formatDate(timeStamp) {
  console.log(timeStamp);
  let date = new Date(timeStamp * 1000);

  let day = formatDaysOfWeek(timeStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let timeOfDay = "";

  // calculate am or pm
  if (hours < 12) {
    timeOfDay = "am";
  } else {
    timeOfDay = "pm";
  }

  // calculate hours less than 10
  if (hours < 1) {
    hours = "12";
  } else if (hours > 0 && hours < 10) {
    hours = "0" + hours;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  // calculate mins less than 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day}, ${hours}:${minutes} ${timeOfDay}`;
}

function displayTemperature(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  let wind = response.data.wind.speed;
  let temperature = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector("#date");
  let imgIconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = Math.round(wind);
  descriptionElement.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.dt);
  imgIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  imgIconElement.setAttribute("alt", description);

  displayCoordinates(response.data.coord);
}
function displayCoordinates(coordinates) {
  console.log(coordinates.lon);
  console.log(coordinates);

  let units = "metric";
  let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;

  console.log(apiURL);

  axios.get(apiURL).then(displayForecast);
}

function search(cityName) {
  let units = "metric";
  let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  console.log(apiURL);

  axios.get(apiURL).then(displayTemperature);
}

function searchFunctionality() {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInputTxtField");
  search(searchInput.value);
}

function displayFahrenheitTemperature(event) {
  // alert("");
  event.preventDefault();

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");
}

////

function formatDaysOfWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${daysOfWeek[day]}`;
}
function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">
          ${formatDaysOfWeek(forecastDay.dt)}</div>
          <img
                src= "http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="${forecastDay.weather[0].description}"
                id="weather-forecast-icon"
              />
          <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}<span>??C</span></span>
              | <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}<span>??C</span></span>
        </div>   
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

search("Jamaica");
//displayForecast();

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchFunctionality);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemperature);
