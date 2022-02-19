import React from 'react'
import classes from './Measurement.module.css';

function Measurement(props) {

  return (
    <div className={classes.measurement}>
        <button className={`${props.measurement === 'metric' ? classes.selected : classes.unselected}`} onClick={props.handleMet}>°C</button>
        <button className={`${props.measurement === 'imperial' ? classes.selected : classes.unselected}`} onClick={props.handleImp}>°F</button>
    </div>
  )
}

export default Measurement