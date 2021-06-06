import React, {useState} from 'react';
import * as sc from "./Container.styles";
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import './Calendar.scss'

function Calendar({children, handleDayClick}) {
    const [startDate, setStartDate] = useState(new Date(2021, 5, 20))
    const [endDate, setEndDate] = useState(new Date(2021, 5, 25))
    const [focus, setFocus] = useState(START_DATE)
    const handleFocusChange = newFocus => {
      setFocus(newFocus || START_DATE)
    }
    const modifiers = {
      disabled: date => {return (date < startDate || date > endDate)? true: false}, // Disables Saturdays
    }
    const modifiersClassNames = {
      highlight: '-highlight'
    }
    return (
        <div>
            <DateRangePickerCalendar
            startDate={startDate}
            endDate={endDate}
            focus={focus}
            onStartDateChange={handleDayClick}
            onEndDateChange={handleDayClick}
            onFocusChange={handleFocusChange}
            locale={enGB}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            onDayClick={handleDayClick}
            />
        </div>
    );
}
  
export default Calendar;
  