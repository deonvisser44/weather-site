import React from "react";
import DailyCard from "./DailyCard";
import classes from "./WeeklyWeather.module.css";
import { useContext } from "react";
import { WeatherContext } from "../store/WeatherDataContext";

function WeeklyWeather() {

  const { eightDayData } = useContext(WeatherContext);

  return (
    <div className={classes["weekly-div"]}>
      {eightDayData.daily?.map((day) => (
        <DailyCard
          key={day.dt}
          date={day.dt}
          minTemp={day.temp?.min}
          maxTemp={day.temp?.max}
          icon={`http://openweathermap.org/img/w/${day.weather?.[0].icon}.png`}
        />
      ))}
    </div>
  );
}

export default WeeklyWeather;
