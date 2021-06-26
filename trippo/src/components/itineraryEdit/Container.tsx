import React, { FC, useState } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setDayState, clearTimeSlots } from 'app/reducers/daySlice';

interface Props {
  handleClick?: (date: Date) => void;
}

const Container: FC<Props> = ({ children, handleClick }) => {
  // TODO: change this
  const [day, setDay] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const itinerary = useAppSelector((state) => state.itinerary.value);

  const handleDayClick = (date: Date | null) => {
    if (date) {
      dispatch(setDayState(date)); //arbitrary id given, but should be chosen when clicks on day or maybe use day
    } else {
      // The null is a placeholder value to keep TS happy
      dispatch(clearTimeSlots(null));
    }
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
            <Calendar handleDayClick={handleDayClick} startDay={new Date(2022, 5, 20)} endDay={new Date(2022, 5, 22)}></Calendar>
          </sc.calendarDiv>
        )}
      </div>
    </sc.containerDiv>
  );
};

export default Container;
