const apiKey = "e097aae1e2472b33a9b55ad9140c3aee";
const iconMappings = {
  "01d": "01d.svg",
  "01n": "01n.svg",
  "02d": "02d.svg",
  "02n": "02n.svg",
  "03d": "03d.svg",
  "03n": "03n.svg",
  "04d": "04d.svg",
  "04n": "04n.svg",
  "09d": "09d.svg",
  "09n": "09n.svg",
  "10d": "10d.svg",
  "10n": "10n.svg",
  "11d": "11d.svg",
  "11n": "11n.svg",
  "13d": "13d.svg",
  "13n": "13n.svg",
  "50d": "50d.svg",
  "50n": "50n.svg",
};

function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value;
  if (!city) {
    alert("Provide the city name for accurate results.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      appendWeather(data);
      cityInput.value = "";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "Kindly ensure accurate entry of the city or country name. Please try again."
      );
    });
}

function appendWeather(data) {
  const weatherInfoContainer = document.getElementById("weather-info");
  const weatherIconCode = data.weather[0].icon;
  const weatherIconPath = iconMappings[weatherIconCode] || "default.svg";
  const isDarkMode = document.body.classList.contains("dark-mode");
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const uvIndex = data.uv;

  const weatherInfoHTML = `
    <div class="weather-card ${isDarkMode ? "dark-mode" : ""}">
      <img src="./assets/images/icons/${weatherIconPath}" alt="${
    data.weather[0].description
  }" />
      <p class="temperature">${Math.round(data.main.temp)}°C</p>
      <p class="description">${data.weather[0].description}</p>
      <p class="humidity">Humidity: ${humidity}%</p>
      <p class="sunrise">Sunrise: ${sunriseTime}</p> 
      <p class="sunset">Sunset: ${sunsetTime}</p> 
      <p class="wind-speed">Wind Speed: ${windSpeed} m/s</p>
      <p class="date">${getFormattedDate()}</p>
      <p class="location">${data.name}, ${data.sys.country}</p>
    </div>
  `;

  weatherInfoContainer.insertAdjacentHTML("afterbegin", weatherInfoHTML);
  checkRowChange();
  weatherInfoContainer.classList.add("show-cards");
  const cards = document.querySelectorAll(".weather-card");
  setTimeout(() => {
    cards[0].style.opacity = 1;
    cards[0].style.transform = "translateY(0)";
  }, 100);
}

function getFormattedDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function checkRowChange() {
  const weatherInfoContainer = document.getElementById("weather-info");
  const cards = weatherInfoContainer.querySelectorAll(".weather-card");
  if (cards.length % 5 === 0) {
    weatherInfoContainer.classList.toggle("change-row");
  }
}
