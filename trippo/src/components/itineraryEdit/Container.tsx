import React, { FC, useState } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";
import { useAppDispatch } from "../../app/store";
import { setTimeSlots, clearTimeSlots } from "app/reducers/timeSlotSlice";

interface Props {
  handleClick?: (date: Date) => void;
}

const Container: FC<Props> = ({ children, handleClick }) => {
  // TODO: change this
  const [day, setDay] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const handleDayClick = (date: Date | null) => {
    if (date) {
      dispatch(setTimeSlots(date));
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
            <Calendar handleDayClick={handleDayClick}></Calendar>
          </sc.calendarDiv>
        )}
      </div>
    </sc.containerDiv>
  );
};

export default Container;
