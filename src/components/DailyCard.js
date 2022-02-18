import React from 'react'
import classes from './DailyCard.module.css';

function DailyCard(props) {

    let d = new Date(props.date*1000);
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let dayNum = d.getDate();




  return (
    <div className={classes['daily-div']}>
        <p className={classes.date}>{day} {dayNum}</p>
        <p className={classes.high}>{Math.round(props.maxTemp)}°</p>
        <p className={classes.low}>{Math.round(props.minTemp)}°</p>
        <img className={classes.icon} src={props.icon} alt="icon" />
    </div>
  )
}

export default DailyCard