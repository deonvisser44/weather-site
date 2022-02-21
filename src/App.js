import "./App.css";
import WeatherCard from "./components/MainWeatherCard";
import SearchForm from "./components/SearchForm";
import WeeklyWeather from "./components/WeeklyWeather";
import { useContext } from "react";
import { WeatherProvider } from "./store/WeatherDataContext";
import { WeatherContext } from "./store/WeatherDataContext";

function App() {
  const { loadingCurrentWeather } = useContext(WeatherContext);
  const { loadingEightDayData } = useContext(WeatherContext);
  const { currentData } = useContext(WeatherContext);
  const { eightDayData } = useContext(WeatherContext);

  return (
    <div className="App">
      <WeatherProvider>
        <SearchForm />
        {!loadingCurrentWeather && <WeatherCard data={currentData} />}
        {!loadingEightDayData && <WeeklyWeather data={eightDayData} />}
      </WeatherProvider>
    </div>
  );
}

export default App;
