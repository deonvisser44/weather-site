import React, { useContext } from "react";
import classes from "./SearchForm.module.css";
import Measurement from "./Measurement";
import { WeatherContext } from "../store/WeatherDataContext";

function SearchForm() {
  const { updateSearch } = useContext(WeatherContext);
  const { getSearch } = useContext(WeatherContext);
  const { handleImperialMeasurement } = useContext(WeatherContext);
  const { handleMetricMeasurement } = useContext(WeatherContext);
  const { measurement } = useContext(WeatherContext);

  return (
    <div>
      <form className={classes.form} onSubmit={getSearch}>
        <input
          className={classes["input-field"]}
          spellCheck="false"
          placeholder="Enter a city name"
          type="text"
          id="search"
          onChange={updateSearch}
        />
        <button className={classes["search-button"]}>Search</button>
        <Measurement
          handleImp={handleImperialMeasurement}
          handleMet={handleMetricMeasurement}
          measurement={measurement}
        />
      </form>
    </div>
  );
}

export default SearchForm;
