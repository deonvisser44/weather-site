import React from "react";
import classes from "./MainWeatherCard.module.css";

function WeatherCard(props) {
  return (
    <div className={classes.card}>
      <div className={classes.left}>
        <p className={classes.heading}>
          {props.city}, {props.country}
        </p>
        <p className={classes.desc}>{props.description}</p>
        <p className={classes.temp}>{Math.round(props.currentTemp)}{props.symbol}</p>

        <img className={classes.icon} src={props.icon} alt="icon" />
      </div>
      <div className={classes.right}>
        <p className={classes.row}>High: {Math.round(props.max)}{props.symbol}</p>
        <p className={classes.row}>Low: {Math.round(props.min)}{props.symbol}</p>
        <p className={classes.row}>Real Feel: {Math.round(props.feelsLike)}{props.symbol}</p>
        <p className={classes.row}>Humidity: {props.humidity}%</p>
        <p className={classes.row}>Wind: {props.wind} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;
