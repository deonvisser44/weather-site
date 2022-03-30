import "./App.css";
import WeatherCard from "./components/MainWeatherCard";
import SearchForm from "./components/SearchForm";
import WeeklyWeather from "./components/WeeklyWeather";
import { WeatherProvider } from "./store/WeatherDataContext";

function App() {

  return (
    <div className="App">
      <WeatherProvider>
        <SearchForm />
        <WeatherCard />
        <WeeklyWeather />
      </WeatherProvider>
    </div>
  );
}

export default App;
