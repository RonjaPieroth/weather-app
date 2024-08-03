let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

function capitalizeWords(stringToCapitalize) {
  const words = stringToCapitalize.split(" ");

  let capitalizedString = "";

  words.forEach((word) => {
    const newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    capitalizedString += `${newWord} `;
  });

  return capitalizedString.trim();
}

let city = prompt("Enter a city");
city = city.toLowerCase();
city = city.trim();

let temperature = weather[city].temp;
let fahrenheit = (weather[city].temp * 9) / 5 + 32;

if (
  city === "paris" ||
  city === "tokyo" ||
  city === "lisbon" ||
  city === "san francisco" ||
  city === "oslo"
) {
  alert(
    `It is currently ${Math.round(temperature)}°C (${Math.round(
      fahrenheit
    )}°F) in ${capitalizeWords(city)} with a humidity of ${
      weather[city].humidity
    }%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

// write your code here
