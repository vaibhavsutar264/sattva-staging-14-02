import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

const CountryOptions = ({ country }) => {
  const [countries, setCountries] = useState([]);
  useEffect(async () => {
    const requestOptions = {
      headers: getApiHeader(),
    };
    try {
      const res = await axios.get(
        apiRoute('get-all-countries'),
        requestOptions
      );
      setCountries(res.data.countries);
    } catch (error) {
      setCountries([]);
    }
  }, []);
  return (
    <Fragment>
      {countries.map((item, index) => {
        const selected = country === item.country ? true : false;
        return (
          <option
            phonecode={item.phonecode}
            key={index}
            value={item.country}
            selected={selected}
          >
            {item.country}
          </option>
        );
      })}
    </Fragment>
  );
};

export default CountryOptions;
