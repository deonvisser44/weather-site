import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/MainWeatherCard";
import SearchForm from "./components/SearchForm";
import WeeklyWeather from "./components/WeeklyWeather";

function App() {
  const [data, setData] = useState([]);
  const [sevenDayData, setSevenDayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSevenDayData, setLoadingSevenDayData] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");
  const [measurement, setMeasurement] = useState("metric");
  const [symbol, setSymbol] = useState('°C')
  const [lat, setLat] = useState('51.5085');
  const [lon, setLon] = useState('-0.1257');

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${measurement}&appid=93f5c861fda160b13e757c684dae80d6`
    );
    if (!response.ok) {
      const message = `An error occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    setData(data);
    setLoading(false);
    setLat(data.coord.lat);
    setLon(data.coord.lon);
    console.log(data);
  };

  const getDailyWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${measurement}&appid=93f5c861fda160b13e757c684dae80d6`
    );
    const weather = await res.json();
    setSevenDayData(weather);
    setLoadingSevenDayData(false);
    console.log(weather);
  }

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
    setSymbol('°F')
  };

  const handleMetricMeasurement = (event) => {
    event.preventDefault();
    setMeasurement("metric");
    setSymbol('°C');
  };

  return (
    <div className="App">
      <SearchForm
        updateSearch={updateSearch}
        getSearch={getSearch}
        handleImp={handleImperialMeasurement}
        handleMet={handleMetricMeasurement}
        measurement={measurement}
      />
      {!loading && (
        <WeatherCard
          symbol={symbol}
          city={data.name}
          country={data.sys.country}
          currentTemp={data.main.temp}
          description={data.weather[0].description}
          icon={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          feelsLike={data.main.feels_like}
          max={data.main.temp_max}
          min={data.main.temp_min}
          humidity={data.main.humidity}
          wind={data.wind.speed}
        />
      )}
      {!loadingSevenDayData && ( <WeeklyWeather data={sevenDayData} />)}
    </div>
  );
}

export default App;
