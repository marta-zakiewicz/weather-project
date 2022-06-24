let now = new Date();
let hour = now.getHours();
let minute = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let mainTime = document.querySelector(".time-main");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
mainTime.innerHTML = `${day} ${hour}:${minute}`;
/*
let dayss = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day1 = dayss[now.getDay() + 1];
let day2 = dayss[now.getDay() + 2];
let day3 = dayss[now.getDay() + 3];
let day4 = dayss[now.getDay() + 4];
let day5 = dayss[now.getDay() + 5];
let day6 = dayss[now.getDay() + 6];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

dayNr = now.getDate();
dayNr1 = now.getDate() + 1;
dayNr2 = now.getDate() + 2;
dayNr3 = now.getDate() + 3;
dayNr4 = now.getDate() + 4;
dayNr5 = now.getDate() + 5;
dayNr6 = now.getDate() + 6;
tmrw = document.querySelector("#day-1");
day2After = document.querySelector("#day-2");
day3After = document.querySelector("#day-3");
day4After = document.querySelector("#day-4");
day5After = document.querySelector("#day-5");
day6After = document.querySelector("#day-6");

tmrw.innerHTML = `${month} ${dayNr1}, ${day1}`;
day2After.innerHTML = `${month} ${dayNr2}, ${day2}`;
day3After.innerHTML = `${month} ${dayNr3}, ${day3}`;
day4After.innerHTML = `${month} ${dayNr4}, ${day4}`;
day5After.innerHTML = `${month} ${dayNr5}, ${dayss[0]}`;
day6After.innerHTML = `${month} ${dayNr6}, ${dayss[1]}`;
*/
function displayForecast() {
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="card week week1">
                <div class="card-body card-forecast">
                  <p class="day-week" id="day-1">Dec 23, ${day}</p>
                  <div class="temp-week" id="temp-1">4°C</div>
                  <div class="emoji-week" id="emoji-1">🌥</div>
                </div>
              </div>
            </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let weatherDisc = document.querySelector(".weather-disc");
  let weather = response.data.weather[0].description;
  weatherDisc.innerHTML = weather;
  celTempData = Math.round(response.data.main.temp);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  windData.innerHTML = `${wind} km/h`;
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
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let weatherDisc = document.querySelector(".weather-disc");
  let weather = response.data.weather[0].description;
  weatherDisc.innerHTML = weather;
  celTempData = Math.round(response.data.main.temp);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  windData.innerHTML = `${wind} km/h`;
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

displayForecast();
