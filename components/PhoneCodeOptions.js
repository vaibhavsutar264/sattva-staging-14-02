import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

const PhoneCodeOptions = ({ countryCode }) => {
  const [countries, setCounties] = useState([]);

  useEffect(async () => {
    const requestOptions = {
      headers: getApiHeader(),
    };
    try {
      const res = await axios.get(
        apiRoute('get-all-countries'),
        requestOptions
      );
      setCounties(res.data.countries);
    } catch (error) {
      setCounties([]);
    }
  }, []);

  return (
    <>
      {countries.map((item, index) => {
        const selected = countryCode == item.phonecode ? true : false;
        return (
          <option key={index} value={item.phonecode} selected={selected}>
            {item.phonecode}
          </option>
        );
      })}
    </>
  );
};

export default PhoneCodeOptions;
