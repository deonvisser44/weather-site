import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext({});

export function WeatherProvider({ children }) {
  const [currentData, setCurrentData] = useState([]);
  const [eightDayData, setEightDayData] = useState([]);
  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(true);
  const [loadingEightDayData, setLoadingEightDayData] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");
  const [measurement, setMeasurement] = useState("metric");
  const [symbol, setSymbol] = useState("°C");
  const [lat, setLat] = useState("51.5085");
  const [lon, setLon] = useState("-0.1257");

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
    console.log(data);
    setLoadingCurrentWeather(false);
  };

  const getDailyWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${measurement}&appid=93f5c861fda160b13e757c684dae80d6`
    );
    const weather = await res.json();
    setEightDayData(weather);
    console.log(weather);
    setLoadingEightDayData(false);
  };

  useEffect(() => {
    getWeather();
    getDailyWeather();
  }, [query, measurement, lat, lon]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

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

  return (
    <WeatherContext.Provider
      value={{
        currentData,
        eightDayData,
        loadingCurrentWeather,
        loadingEightDayData,
        search,
        query,
        measurement,
        symbol,
        lat,
        lon,
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
