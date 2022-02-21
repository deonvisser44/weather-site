import React, { useContext } from "react";
import classes from "./MainWeatherCard.module.css";
import { WeatherContext } from "../store/WeatherDataContext";

function WeatherCard() {

  const { currentData } = useContext(WeatherContext);
  const { symbol } =useContext(WeatherContext);
  return (
    <div className={classes.card}>
      <div className={classes.left}>
        <p className={classes.heading}>
          {currentData.name}, {currentData.sys?.country}
        </p>
        <p className={classes.desc}>{currentData.weather?.[0].description}</p>
        <p className={classes.temp}>{Math.round(currentData.main?.temp)}{symbol}</p>

        <img className={classes.icon} src={`http://openweathermap.org/img/w/${currentData.weather?.[0].icon}.png`} alt="icon" />
      </div>
      <div className={classes.right}>
        <p className={classes.row}>High: {Math.round(currentData.main?.temp_max)}{symbol}</p>
        <p className={classes.row}>Low: {Math.round(currentData.main?.temp_min)}{symbol}</p>
        <p className={classes.row}>Real Feel: {Math.round(currentData.main?.feels_like)}{symbol}</p>
        <p className={classes.row}>Humidity: {currentData.main?.humidity}%</p>
        <p className={classes.row}>Wind: {currentData.wind?.speed} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;
