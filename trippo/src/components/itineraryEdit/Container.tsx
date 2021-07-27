import React, { useState } from "react";
import Calendar from "./Calendar";
import * as sc from "./Container.styles";
import Day from "./Day";
// import { useAppDispatch } from "../../app/store";
// import { useGetItineraryByIdQuery } from 'services/itinerary';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { setItinerary } from 'app/reducers/itinerarySlice';
import {ContextInterface, ItineraryContext} from "../itineraryPage/ItineraryPage"

const Container = () => {
  // TODO: change this
  const itineraryContext = React.useContext<ContextInterface>(ItineraryContext);
  const [day, setDay] = useState<Date | null>(null);
  // const dispatch = useAppDispatch();
  // const { id } = useParams<{ id: string }>();
  // const { data: itinerary } = useGetItineraryByIdQuery(id);

  // useEffect(() => {
  //   dispatch(setItinerary(itinerary));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [itinerary])

  const handleDayClick = (date: Date | null) => {
    setDay(date);
  };

  function handleCalendarView() {
    if (itineraryContext?.unsavedChanges) {
      itineraryContext?.setShowUnsavedChangesModal(() => handleCalendarViewNoChanges);
      return;
    }
    handleCalendarViewNoChanges();
  }

  function handleCalendarViewNoChanges() {
    setDay(null);
  }

  return (
    <sc.containerDiv>
      <div>
        {day !== null ? (
          <Day handleCalendarView={handleCalendarView} date={day} />
        ) : (
          <sc.calendarDiv>
            <Calendar handleDayClick={handleDayClick} />
          </sc.calendarDiv>
        )}
      </div>
    </sc.containerDiv>
  );
};

export default Container;
