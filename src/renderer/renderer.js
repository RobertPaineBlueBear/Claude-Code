const greetingText = document.getElementById("greeting-text");
const dateText = document.getElementById("date-text");
const weatherCard = document.getElementById("weather-card");
const tempText = document.getElementById("temp-text");
const conditionText = document.getElementById("condition-text");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

async function loadGreeting() {
  const { timeGreeting, date } = await window.briefingAPI.getGreeting();
  greetingText.textContent = `${timeGreeting}!`;
  dateText.textContent = date;
}

async function loadWeather() {
  loading.style.display = "block";
  errorDiv.style.display = "none";
  weatherCard.style.display = "none";

  try {
    const weather = await window.briefingAPI.getWeather("Austin");

    tempText.textContent = `${weather.current.temperature}\u00B0F`;
    conditionText.textContent = weather.current.condition;

    weatherCard.style.display = "block";
  } catch (err) {
    errorDiv.textContent = `Could not fetch weather: ${err.message}`;
    errorDiv.style.display = "block";
  }

  loading.style.display = "none";
}

loadGreeting();
loadWeather();
