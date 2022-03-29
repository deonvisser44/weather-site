import React, { useContext } from "react";
import classes from "./MainWeatherCard.module.css";
import { WeatherContext } from "../store/WeatherDataContext";

function WeatherCard() {
  // getting data passed through from context
  const { currentData } = useContext(WeatherContext);
  const { symbol } = useContext(WeatherContext);
  const { desc } = useContext(WeatherContext);
  const { time } = useContext(WeatherContext);
  const { timezone } = useContext(WeatherContext);

  const currentTime = new Date((time + timezone) * 1000);
  const hours = currentTime.getUTCHours();
  const minutes = currentTime.getUTCMinutes();

  let timeOfDay = '';

  if(hours < 12){
    timeOfDay = 'AM'
  } else {
    timeOfDay = 'PM'
  }
  
  return (
    //Main component that displays current weather data
    <div className={classes.card}>
      <div
        className={
          desc == "Clouds"
            ? classes.bgclouds
            : desc == "Rain"
            ? classes.bgrain
            : desc == "Thunderstorm" 
            ? classes.bgthunderstorm
            : desc == 'Snow'
            ? classes.bgsnow
            : desc == 'Drizzle'
            ? classes.bgdrizzle
            : classes.bgclear
        }
      >
        <div className={classes.overlay}>
          <div className={classes.left}>
            <div className={classes.city}>
              {currentData.name}, {currentData.sys?.country}
            </div>
            <div className={classes.time}>{`${hours}:${minutes} ${timeOfDay}`}</div>
            <div className={classes.desc}>
              {currentData.weather?.[0].description}
            </div>
            <div className={classes.temp}>
              {Math.round(currentData.main?.temp)}
              {symbol}
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.row}>
              High: {Math.round(currentData.main?.temp_max)}
              {symbol}
            </div>
            <div className={classes.row}>
              Low: {Math.round(currentData.main?.temp_min)}
              {symbol}
            </div>
            <div className={classes.row}>
              Real Feel: {Math.round(currentData.main?.feels_like)}
              {symbol}
            </div>
            <div className={classes.row}>
              Humidity: {currentData.main?.humidity}%
            </div>
            <div className={classes.row}>Wind: {currentData.wind?.speed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
