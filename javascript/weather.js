const apiKey = "714cf696382de4a0707f0337aaa34e9c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "public/weather/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "public/weather/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "public/weather/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "public/weather/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "public/weather/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "public/weather/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    searchBox.value = "";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
