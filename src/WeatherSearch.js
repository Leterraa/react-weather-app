import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    const { icon, color } = getWeatherIcon(response.data.weather[0].id);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      weatherCode: response.data.weather[0].id,
      color: color,
      icon: icon
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "caa883a4a60d93878755b08a933f74ea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  const weatherIconProps = {
    icon: weather.icon,
    color: weather.color,
    size: 64,
    animate: true
  };

  function getWeatherIcon(weatherCode) {
    let icon = "";
    let color = "";

    switch (weatherCode) {
      case 800: // for Clear sky
        icon = "CLEAR_DAY";
        color = "#FFD700";
        break;
      case 801: // for Few clouds
        icon = "PARTLY_CLOUDY_DAY";
        color = "#EEE8AA";
        break;
      case 802:
      case 803:
      case 804: //for Cloudy
        icon = "CLOUDY";
        color = "#4682B4";
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504: // for Rain
        icon = "RAIN";
        color = "#6495ED";
        break;
      case 511:
      case 615:
      case 616:
      case 620: // for Sleet
        icon = "SLEET";
        color = "blue";
        break;
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 621:
      case 622: // for Snow
        icon = "SNOW";
        color = "#F0F8FF";
        break;
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
      case 781: // for Fog
        icon = "FOG";
        color = "#A9A9A9";
        break;
      default:
        icon = "CLEAR_DAY";
        color = "#FFD700";
        break;
    }

    return { icon, color };
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  return (
    <div>
      {form}
      {loaded && (
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>
            <ReactAnimatedWeather {...weatherIconProps} />
          </li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
        </ul>
      )}
    </div>
  );
}
