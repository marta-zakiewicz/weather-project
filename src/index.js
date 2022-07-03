function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="card week week1">
                <div class="card-body card-forecast">
                  <p class="day-week" id="day">Dec 23, ${formatDay(
                    forecastDay.dt
                  )}</p>
                  <div class="temp-week" id="temp">${Math.round(
                    forecastDay.temp.day
                  )}°</div>
                  <div class="emoji-week" id="emoji">  
                    <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=""
                        width="50"

                      />           
                  </div>
                </div>
              </div>
            </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `6668a73a7d1f87813026a65c47730579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${enterCity.value}`;
  getPosition();
}
function getPosition() {
  let apiKey = `6668a73a7d1f87813026a65c47730579`;
  let unit = "metric";
  let enterCity = document.querySelector("#enter-city-input");
  let city = enterCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);
}
function getTemperature(response) {
  let degreeDisplayed = document.querySelector(".main-temp");
  let country = response.data.sys.country;
  let enterCity = document.querySelector("#enter-city-input");
  let city = enterCity.value;
  let h2 = document.querySelector("h2");
  let feelsLikeData = document.querySelector("#feels-like-temp");
  let humidityData = document.querySelector("#humidity");
  let windData = document.querySelector("#wind-speed");
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let emoji = document.querySelector("#emoji-main");
  let dateElement = document.querySelector(".time-main");
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let weatherDisc = document.querySelector(".weather-disc");
  let weather = response.data.weather[0].description;
  weatherDisc.innerHTML = weather;
  celTempData = Math.round(response.data.main.temp);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  windData.innerHTML = `${wind} km/h`;
  getForecast(city);
}
function getCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `6668a73a7d1f87813026a65c47730579`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCurrentTemperature);
}
function getCurrentTemperature(response) {
  let degreeDisplayed = document.querySelector(".main-temp");
  let country = response.data.sys.country;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  let feelsLikeData = document.querySelector("#feels-like-temp");
  let humidityData = document.querySelector("#humidity");
  let windData = document.querySelector("#wind-speed");
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let emoji = document.querySelector("#emoji-main");
  let dateElement = document.querySelector(".time-main");

  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let weatherDisc = document.querySelector(".weather-disc");
  let weather = response.data.weather[0].description;
  weatherDisc.innerHTML = weather;
  celTempData = Math.round(response.data.main.temp);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  windData.innerHTML = `${wind} km/h`;
  getForecast(response.data.coord);
}
let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchCity);
let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", searchCity);

function degreeCel(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".main-temp");
  mainTemp.innerHTML = Math.round(celTempData);
}
function degreeFar(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".main-temp");
  let farTempFormula = celTempData * 1.8 + 32;
  mainTemp.innerHTML = Math.round(farTempFormula);
}
let celTempData = null;
let degreeC = document.querySelector("#C");
let degreeF = document.querySelector("#F");
degreeC.addEventListener("click", degreeCel);
degreeF.addEventListener("click", degreeFar);
let currentLocBtn = document.querySelector("#current-loc-btn");
currentLocBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(getCurrentPosition)
);
