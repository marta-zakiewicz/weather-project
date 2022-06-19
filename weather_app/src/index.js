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
  let temp = Math.round(response.data.main.temp);
  let degreeDisplayed = document.querySelector(".main-temp");
  degreeDisplayed.innerHTML = temp;
  let country = response.data.sys.country;
  let enterCity = document.querySelector("#enter-city-input");
  let city = enterCity.value;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${country}, ${city}`;
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
  let temp = Math.round(response.data.main.temp);
  let degreeDisplayed = document.querySelector(".main-temp");
  degreeDisplayed.innerHTML = temp;
  let country = response.data.sys.country;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${country}, ${city}`;
}
let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchCity);
let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", searchCity);
function degreeCel(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".main-temp");
  mainTemp.innerHTML = "6";
}
function degreeFar(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".main-temp");
  mainTemp.innerHTML = "43";
}
let degreeC = document.querySelector("#C");
let degreeF = document.querySelector("#F");
degreeC.addEventListener("click", degreeCel);
degreeF.addEventListener("click", degreeFar);
let currentLocBtn = document.querySelector("#current-loc-btn");
currentLocBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(getCurrentPosition)
);
