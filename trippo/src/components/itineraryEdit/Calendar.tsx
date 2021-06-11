import React, { FC, useState } from "react";
import { enGB } from "date-fns/locale";
import { DateRangeFocus, DateRangePickerCalendar, Modifiers } from "react-nice-dates";
import "./Calendar.scss";

interface Props {
  handleDayClick: (date: Date | null) => void;
}

const Calendar: FC<Props> = ({ handleDayClick }) => {
  const [startDate] = useState(new Date(2022, 5, 20));
  const [endDate] = useState(new Date(2022, 6, 25));
  const [focus, setFocus] = useState<DateRangeFocus>("startDate");
  const handleFocusChange = (newFocus: DateRangeFocus) => {
    setFocus(newFocus || "startDate");
  };
  const modifiers: Modifiers = {
    disabled: (date) => {
      return date < startDate || date > endDate ? true : false;
    }, // Disables Saturdays
  };
  const modifiersClassNames = {
    highlight: "-highlight",
  };
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
        //@ts-ignore
        onDayClick={handleDayClick}
      />
    </div>
  );
}

export default Calendar;
