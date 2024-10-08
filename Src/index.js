// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// function capitalizeWords(stringToCapitalize) {
//   const words = stringToCapitalize.split(" ");

//   let capitalizedString = "";

//   words.forEach((word) => {
//     const newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//     capitalizedString += `${newWord} `;
//   });

//   return capitalizedString.trim();
// }

// let city = prompt("Enter a city");
// city = city.toLowerCase();
// city = city.trim();

// let temperature = weather[city].temp;
// let fahrenheit = (weather[city].temp * 9) / 5 + 32;

// if (
//   city === "paris" ||
//   city === "tokyo" ||
//   city === "lisbon" ||
//   city === "san francisco" ||
//   city === "oslo"
// ) {
//   alert(
//     `It is currently ${Math.round(temperature)}°C (${Math.round(
//       fahrenheit
//     )}°F) in ${capitalizeWords(city)} with a humidity of ${
//       weather[city].humidity
//     }%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// // write your code here

function updateWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let currentTemperature = response.data.temperature.current;
  console.log(currentTemperature);
  let cityElement = document.querySelector("#current-city");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind-speed");
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  currentDateELement.innerHTML = formatDate(currentDate);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3bo5e90a574b223f7cd8fteb0eb46b33";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metrics`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3bo5e90a574b223f7cd8fteb0eb46b33";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metrics`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<li class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°C</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
          </li>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Berlin");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
