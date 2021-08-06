import React from "react";
import * as sc from "./ItineraryReadOnlyView.styles";
import Day from "../itineraryEdit/Day";
import moment from "moment";
import { useAppSelector } from "app/store";

function ItineraryReadOnlyView() {
  const getDates = (startDate: Date, endDate: Date): string[] => {
    let dateArray: string[] = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  };

  const itinerary = useAppSelector((state) => state.itinerary.value);
  const dates = itinerary && getDates(itinerary.start_date, itinerary.end_date);
  return (
    <sc.Container>
      {dates?.map((date) => {
        return (
          <sc.Day>
            <Day
              isReadOnly
              size="small"
              handleCalendarView={() => {}}
              date={new Date(date + "T00:00:00")}
            />
          </sc.Day>
        );
      })}
    </sc.Container>
  );
}

export default ItineraryReadOnlyView;
