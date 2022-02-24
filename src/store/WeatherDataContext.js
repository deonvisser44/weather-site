import { useState, createContext, useEffect } from "react";


// Create Context to use state throughout all components, didnt want to do prop drilling from App.js
export const WeatherContext = createContext({});

export function WeatherProvider({ children }) {


  // Setting state that will be used throughout all components
  const [currentData, setCurrentData] = useState([]);
  const [eightDayData, setEightDayData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");
  const [measurement, setMeasurement] = useState("metric");
  const [symbol, setSymbol] = useState("°C");
  const [lat, setLat] = useState("51.5085");
  const [lon, setLon] = useState("-0.1257");
  const [desc, setDesc] = useState()
  const [time, setTime] = useState();
  const [timezone, setTimezone] = useState();

// API get method to get current data for the MainWeatherCard, as well as the longitude and latitude that is needed for 8 day
// forecast
  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${measurement}&appid=93f5c861fda160b13e757c684dae80d6`
    );
    if (!response.ok) {
      const message = `An error occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setCurrentData(data);
    setLat(data.coord.lat);
    setLon(data.coord.lon);
    setDesc(data.weather?.[0]?.main)
    setTime(data.dt);
    setTimezone(data.timezone)
    console.log(data);
  };

  // API get method to get daily data for the next 8 days

  const getDailyWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${measurement}&appid=93f5c861fda160b13e757c684dae80d6`
    );
    const weather = await res.json();
    setEightDayData(weather);
    console.log(weather);
  };


  // useEffect that calls the fetch functions

  useEffect(() => {
    getWeather();
  }, [query, measurement]);

  useEffect(() => {
    getDailyWeather();
  }, [lat, lon, measurement])

  //functions to get input from the Search input

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // functions to handle whether temperatures should be shown in celcius or fahrenheit

  const handleImperialMeasurement = (event) => {
    event.preventDefault();
    setMeasurement("imperial");
    setSymbol("°F");
  };

  const handleMetricMeasurement = (event) => {
    event.preventDefault();
    setMeasurement("metric");
    setSymbol("°C");
  };

  // Provider values (states and functions ) set to be passed through to all the children components

  return (
    <WeatherContext.Provider
      value={{
        currentData,
        eightDayData,
        search,
        query,
        measurement,
        symbol,
        lat,
        lon,
        desc,
        time,
        timezone,
        updateSearch,
        getSearch,
        handleImperialMeasurement,
        handleMetricMeasurement,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
