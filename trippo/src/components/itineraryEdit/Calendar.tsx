import React, { FC, useState } from "react";
import { enGB } from "date-fns/locale";
import {
  DateRangeFocus,
  DateRangePickerCalendar,
  Modifiers,
} from "react-nice-dates";
import "./Calendar.scss";
import { useAppSelector } from 'app/store';

interface Props {
  handleDayClick: (date: Date | null) => void;
}

const Calendar: FC<Props> = ({ handleDayClick }) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [focus, setFocus] = useState<DateRangeFocus>("startDate");
  const handleFocusChange = (newFocus: DateRangeFocus) => {
    setFocus(newFocus || "startDate");
  };
  const modifiers: Modifiers = {
    disabled: (date) => {
      return !itinerary || date < new Date(itinerary.start_date) || date > new Date(itinerary.end_date);
    }, // Disables Saturdays
  };
  const modifiersClassNames = {
    highlight: "-highlight",
  };
  return itinerary ? (
    <div>
      <DateRangePickerCalendar
        startDate={new Date(itinerary.start_date)}
        endDate={new Date(itinerary.end_date)}
        focus={focus}
        onStartDateChange={handleDayClick}
        onEndDateChange={handleDayClick}
        onFocusChange={handleFocusChange}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        //@ts-ignore
        onDayClick={handleDayClick}
      />
    </div>
  ) : null;
};

export default Calendar;
