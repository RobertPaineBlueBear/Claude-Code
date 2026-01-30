import { getGreeting } from "./greeting.js";
import { getWeather } from "./weather.js";

const DIVIDER = "─".repeat(45);

function printGreeting() {
  const { timeGreeting, date } = getGreeting();
  console.log();
  console.log(DIVIDER);
  console.log(`  ${timeGreeting}!`);
  console.log(`  ${date}`);
  console.log(DIVIDER);
}

function printWeather(weather) {
  console.log();
  console.log(`  Weather in ${weather.location}`);
  console.log();
  console.log(`  Now:   ${weather.current.temperature}°F - ${weather.current.condition}`);
  console.log(`         Wind: ${weather.current.windSpeed} mph | Humidity: ${weather.current.humidity}%`);
  console.log();
  console.log(`  Today: High ${weather.today.high}°F / Low ${weather.today.low}°F`);
  console.log(`         ${weather.today.condition}`);
  console.log(`         Precipitation chance: ${weather.today.precipChance}%`);
  console.log();
  console.log(DIVIDER);
}

async function main() {
  const city = process.argv[2] || "New York";

  printGreeting();

  try {
    const weather = await getWeather(city);
    printWeather(weather);
  } catch (err) {
    console.log();
    console.log(`  Could not fetch weather: ${err.message}`);
    console.log(DIVIDER);
  }

  console.log();
}

main();
