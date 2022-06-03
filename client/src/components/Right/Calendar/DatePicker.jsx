import React, { useContext } from 'react'
import Calendar, { CalendarProps, CalendarTileProperties, Detail, ViewCallbackProperties } from 'react-calendar'
import { DateContext } from '../../Pages/Home/Home'
// import 'react-calendar/dist/Calendar.css';
import './DatePickr.css'


const DatePicker = () => {

  const {value, onChange} = useContext(DateContext)

  return (
    <div className="DatePickerContainer">
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default DatePicker