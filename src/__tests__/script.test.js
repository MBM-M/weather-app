const { displayWeatherTable } = require("../script.js");

test("displayWeatherTable shows error on null data", () => {
  document.body.innerHTML = `<div id="weather-data"></div><table id="weather-table"><tbody></tbody></table>`;
  displayWeatherTable(null);
  expect(document.getElementById("weather-data").textContent).toMatch(/Unable to retrieve/);
});