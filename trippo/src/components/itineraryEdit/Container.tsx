import { useContext } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";
import {
  ContextInterface,
  ItineraryContext,
} from "../itineraryPage/ItineraryPage";

const Container = () => {
  const itineraryContext = useContext<ContextInterface>(ItineraryContext);

  const handleDayClick = (date: Date | null) => {
    itineraryContext?.setActiveDay(date);
  };

  function handleCalendarView() {
    if (itineraryContext?.unsavedChanges) {
      itineraryContext?.setShowUnsavedChangesModal(
        () => handleCalendarViewNoChanges
      );
      return;
    }
    handleCalendarViewNoChanges();
  }

  function handleCalendarViewNoChanges() {
    itineraryContext?.setActiveDay(null);
  }

  return (
    <sc.containerDiv>
      <>
        {itineraryContext?.activeDay ? (
          <Day
            handleCalendarView={handleCalendarView}
            date={itineraryContext?.activeDay}
          />
        ) : (
          <sc.calendarDiv>
            <Calendar handleDayClick={handleDayClick} />
          </sc.calendarDiv>
        )}
      </>
    </sc.containerDiv>
  );
};

export default Container;
