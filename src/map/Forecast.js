export const getForecast = async (region) => {
  console.log("Getting forecast from API. ");
  var formattedLat = Math.trunc(region.latitude);
  var formattedLong = Math.trunc(region.longitude);
  var newForecast = "Updating forecast...";
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    formattedLat +
    "&lon=" +
    formattedLong +
    "&exclude=current,minutely,daily,alerts&appid=5d9c4214bba669bd9a39192ab06885f2";

  await fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log("Successfully recieved forecast from API. ");
      console.info("Forecast retrieved: " + data.hourly[0].weather[0].main);
      newForecast = data.hourly[0].weather[0].main;
    })
    .catch((error) => {
      console.error("WeatherAPI [fetch]: " + error.message);
    });
  return newForecast;
};
