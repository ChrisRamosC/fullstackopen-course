import { useState, useEffect } from 'react';
import axios from 'axios';

const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const api_key = import.meta.env.VITE_SOME_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country.capitalInfo?.latlng || !api_key) {
      console.error('Missing required data for weather API request.');
      return;
    }

    axios
      .get(
        `${weatherBaseUrl}lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [country]);

  const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      {weather ? (
        <div>
          <p>Temperature {toCelsius(weather.main.temp)} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryDetails;
