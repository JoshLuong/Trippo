import React, { useState } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";

function Container({ children, handleClick }) {
  // TODO: change this
  const [day, setDay] = useState(null);

  const handleDayClick = (date) => {
    setDay({
      date: date,
    });
  };

  const handleCalendarView = () => {
    setDay(null);
  };

  return (
    <sc.containerDiv>
      <div>
        {day !== null ? (
          <Day handleCalendarView={handleCalendarView} date={day.date}></Day>
        ) : (
          <sc.calendarDiv>
            <Calendar handleDayClick={handleDayClick}></Calendar>
          </sc.calendarDiv>
        )}
      </div>
    </sc.containerDiv>
  );
}

export default Container;
