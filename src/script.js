import "./style.css";

export async function getWeatherData(location, API_KEY) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
      { method: "GET" }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function displayWeatherTable(data, containerElements = {}) {
  // Accept injected DOM refs for testability
  const weatherData = containerElements.weatherData || document.getElementById("weather-data");
  const weatherTableBody = containerElements.weatherTableBody || document.querySelector("#weather-table tbody");

  if (!data || !data.days) {
    weatherData.textContent = "Unable to retrieve weather data";
    return;
  }

  weatherData.textContent = data.description || "Weather forecast:";

  weatherTableBody.innerHTML = "";

  const forecastDays = data.days.slice(0, 8);

  forecastDays.forEach(day => {
    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = day.datetime;

    const TempCell = document.createElement("td");
    TempCell.textContent = `${day.temp}°C`;

    const minTempCell = document.createElement("td");
    minTempCell.textContent = `${day.tempmin}°C`;

    const maxTempCell = document.createElement("td");
    maxTempCell.textContent = `${day.tempmax}°C`;

    const conditionCell = document.createElement("td");
    conditionCell.textContent = day.conditions;

    row.appendChild(dateCell);
    row.appendChild(TempCell);
    row.appendChild(minTempCell);
    row.appendChild(maxTempCell);
    row.appendChild(conditionCell);

    weatherTableBody.appendChild(row);
  })
}

// then use these in a short bootstrapping block:
if (typeof window !== "undefined") {
  const API_KEY = process.env.WEATHER_API_KEY;
  const button = document.querySelector("button");
  button.addEventListener("click", async () => {
    const weatherLocation = document.getElementById("weather-loc").value;
    const data = await getWeatherData(weatherLocation, API_KEY);
    displayWeatherTable(data);
  });
}
