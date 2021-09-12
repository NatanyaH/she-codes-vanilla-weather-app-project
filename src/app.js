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

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = Math.round(wind);
  descriptionElement.innerHTML = description;
}

let cityName = "Montreal";
let units = "metric";
let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
console.log(apiURL);

axios.get(apiURL).then(displayTemperature);
