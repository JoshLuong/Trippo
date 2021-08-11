import { FC, useState } from "react";
import { enGB } from "date-fns/locale";
import * as sc from "./Container.styles";
import { DateRangeFocus, Modifiers } from "react-nice-dates";
import "./Calendar.scss";
import { useAppSelector } from "app/store";
import moment from "moment";

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
      return (
        !itinerary ||
        moment(date).isBefore(moment(itinerary.start_date), "date") ||
        moment(date).isAfter(moment(itinerary.end_date), "date")
      );
    },
  };
  const modifiersClassNames = {
    highlight: "-highlight",
  };
  return (
    itinerary && (
      <sc.Calendar>
        <sc.StyledDatePicker
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
      </sc.Calendar>
    )
  );
};

export default Calendar;
