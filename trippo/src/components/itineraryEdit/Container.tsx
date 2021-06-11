import React, { FC, useState } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";

interface Props {
  handleClick?: (date: Date) => void;
}

const Container: FC<Props> = ({ children, handleClick }) => {
  // TODO: change this
  const [day, setDay] = useState<Date | null>(null);

  const handleDayClick = (date: Date | null) => {
    setDay(date);
  };

  const handleCalendarView = () => {
    setDay(null);
  };

  return (
    <sc.containerDiv>
      <div>
        {day !== null ? (
          <Day handleCalendarView={handleCalendarView} date={day}></Day>
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
