import React from 'react'
import classes from './Measurement.module.css';

function Measurement(props) {

  // Component that lets user choose weather units

  return (
    <div className={classes.measurement}>
        <button className={`${props.measurement === 'metric' ? classes.selectedC : classes.unselectedC}`} onClick={props.handleMet}>°C</button>
        <button className={`${props.measurement === 'imperial' ? classes.selectedF : classes.unselectedF}`} onClick={props.handleImp}>°F</button>
    </div>
  )
}

export default Measurement