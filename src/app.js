function formatDate(timeStamp) {
  console.log(timeStamp);
  let date = new Date(timeStamp * 1000);

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(date);
  console.log(date.getDay());
  console.log(date.getHours());
  console.log(date.getMinutes());
  console.log(date.getMonth());

  let day = daysOfWeek[date.getDay()];
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
  if (hours < 10) {
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

  let wind = response.data.wind.speed;
  let temperature = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let description = response.data.weather[0].description;

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector("#date");

  console.log(dateElement);

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = Math.round(wind);
  descriptionElement.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.dt);
}

let cityName = "Montreal";
let units = "metric";
let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
console.log(apiURL);

axios.get(apiURL).then(displayTemperature);
