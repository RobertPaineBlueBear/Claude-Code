const greetingText = document.getElementById("greeting-text");
const dateText = document.getElementById("date-text");
const weatherCard = document.getElementById("weather-card");
const locationText = document.getElementById("location-text");
const tempText = document.getElementById("temp-text");
const conditionText = document.getElementById("condition-text");
const windText = document.getElementById("wind-text");
const humidityText = document.getElementById("humidity-text");
const highlowText = document.getElementById("highlow-text");
const forecastCondition = document.getElementById("forecast-condition");
const precipText = document.getElementById("precip-text");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const cityInput = document.getElementById("city-input");
const refreshBtn = document.getElementById("refresh-btn");

async function loadGreeting() {
  const { timeGreeting, date } = await window.briefingAPI.getGreeting();
  greetingText.textContent = `${timeGreeting}!`;
  dateText.textContent = date;
}

async function loadWeather(city) {
  loading.style.display = "block";
  errorDiv.style.display = "none";
  weatherCard.style.display = "none";

  try {
    const weather = await window.briefingAPI.getWeather(city);

    locationText.textContent = weather.location;
    tempText.textContent = `${weather.current.temperature}\u00B0F`;
    conditionText.textContent = weather.current.condition;
    windText.textContent = `Wind: ${weather.current.windSpeed} mph`;
    humidityText.textContent = `Humidity: ${weather.current.humidity}%`;
    highlowText.textContent = `${weather.today.high}\u00B0 / ${weather.today.low}\u00B0`;
    forecastCondition.textContent = weather.today.condition;
    precipText.textContent = `Precip: ${weather.today.precipChance}%`;

    weatherCard.style.display = "block";
  } catch (err) {
    errorDiv.textContent = `Could not fetch weather: ${err.message}`;
    errorDiv.style.display = "block";
  }

  loading.style.display = "none";
}

refreshBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) loadWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) loadWeather(city);
  }
});

loadGreeting();
loadWeather(cityInput.value.trim());
