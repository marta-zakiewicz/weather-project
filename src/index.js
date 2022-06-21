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
let dayss = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let day1 = dayss[now.getDay() + 1];
let day2 = dayss[now.getDay() + 2];
let day3 = dayss[now.getDay() + 3];
let day4 = dayss[now.getDay() + 4];
let day5 = dayss[now.getDay() + 5];
let day6 = dayss[now.getDay() + 6];
mainTime.innerHTML = `${day} ${hour}:${minute}`;
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
  let pressureData = document.querySelector("#pressure");
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);
  //let emoji = document.querySelector("#emoji-main");
  //emoji.setAttribute(
  //  "src",
  //  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  //);
  celTempData = Math.round(response.data.main.temp);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  pressureData.innerHTML = `${pressure} hPa`;
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
  let pressureData = document.querySelector("#pressure");
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);
  //let emoji = document.querySelector("#emoji-main");
  //emoji.setAttribute(
  //  "src",
  //  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  //);

  celTempData = Math.round(response.data.main.temp);
  degreeDisplayed.innerHTML = celTempData;
  h2.innerHTML = `${country}, ${city}`;
  feelsLikeData.innerHTML = `${feelsLike}°C`;
  humidityData.innerHTML = `${humidity}%`;
  pressureData.innerHTML = `${pressure} hPa`;
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
