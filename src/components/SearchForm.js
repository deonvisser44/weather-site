import React from 'react'
import classes from './SearchForm.module.css';
import Measurement from "./Measurement";

function SearchForm(props) {
  return (
    <div>
        <form className={classes.form} onSubmit={props.getSearch}>
            <input className={classes['input-field']} spellCheck="false" placeholder='Enter a city name' type="text" id="search" onChange={props.updateSearch} />
            <button className={classes['search-button']}>Search</button>
            <Measurement handleImp={props.handleImp} handleMet={props.handleMet} measurement={props.measurement}/>
        </form>
    </div>
  )
}

export default SearchForm