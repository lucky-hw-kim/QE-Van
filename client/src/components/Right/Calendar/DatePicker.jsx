import React, { useContext } from 'react'
import Calendar from 'react-calendar'
import { DateContext } from '../../Pages/Home/Home'
// import 'react-calendar/dist/Calendar.css';
import './DatePickr.css'


const DatePicker = () => {

  const {value, onChange} = useContext(DateContext)

  return (
    <div className="DatePickerContainer">
      <Calendar  onChange={onChange} />
    </div>
  )
}

export default DatePicker