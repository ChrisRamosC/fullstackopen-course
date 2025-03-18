import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} />
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        countriesToShow.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => handleShowCountry(country)}>Show</button>
          </li>
        ))
      )}
    </div>
  );
};

export default App;
