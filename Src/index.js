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

function updateTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  console.log(currentTemperature);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = currentTemperature;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiKey = "3bo5e90a574b223f7cd8fteb0eb46b33";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&unit=metrics`;
  axios.get(apiUrl).then(updateTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Berlin");
