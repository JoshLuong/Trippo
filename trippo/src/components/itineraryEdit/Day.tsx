import React, { FC, useState, useEffect } from "react";
import * as sc from "./Day.styles";
import TimeSlot from "./TimeSlot";
import moment from "moment";
import {ContextInterface, ItineraryContext} from "../itineraryPage/ItineraryPage"
import { Grid, Tooltip } from "@material-ui/core";
import { useAppSelector } from 'app/store';
import { Activity } from 'types/models';

interface Props {
  date: Date;
  handleCalendarView: () => void;
}

const Day: FC<Props> = ({ date, handleCalendarView }) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [editedItinerary, setEditedItinerary] = useState(itinerary);
  const itineraryContext = React.useContext<ContextInterface>(ItineraryContext);

  const editActivity = (activity: Activity) => {
    if (editedItinerary) {
      setEditedItinerary({
        ...editedItinerary,
        activities: editedItinerary.activities.map((e) => e._id === activity._id ? activity : e),
      });
    }
  }

  useEffect(() => {
    if (itinerary) {
      setEditedItinerary(itinerary);
    }
  }, [itinerary]);

  const dayActivities = itinerary?.activities
    .filter((activity) => moment(date).isSame(moment(activity.time), 'date')) || [];

  let cost = dayActivities
    .reduce(function (total, activity) {
      return total + (activity.cost || 0);
    }, 0);
  const [edit, setEdit] = useState(false);
  const [dayCost, setDayCost] = useState(cost || 0);
  const budget = 50;

  const handleEditView = () => {
    edit ? itineraryContext?.setUnsavedChanges(false) : itineraryContext?.setUnsavedChanges(true); // TODO only set unsaved changes when user starts editing
    setEdit(!edit);
  };

  const handleHideCostToggle = (slotCost: number | undefined) => {
    setDayCost(dayCost + (slotCost || 0));
  };

  return (
    <sc.dayDiv>
      <sc.dayDate>
          <button style={{ float: "left" }} onClick={handleCalendarView}>
            <i className="fas fa-chevron-left"></i>
            <i className="far fa-calendar-alt"></i>
          </button>
        <sc.daysWeek>
          {moment(date).format("MMMM Do YYYY")}
        </sc.daysWeek>
      </sc.dayDate>
      <div>
          <sc.TimeSlots>
            {dayActivities.map((activity, idx) => {
              return (
                <div key={activity._id}>
                  <TimeSlot
                    handleHideCostToggle={handleHideCostToggle}
                    activity={activity}
                    showEdit={edit}
                    index={idx}
                    editActivity={editActivity}
                  />
                </div>
              );
            })}
          </sc.TimeSlots>
            <sc.Cost container item lg={12}>
              <div>Total cost for {moment(date).format("MMM Do YYYY")}:</div>
              <div>
                {dayCost > budget ? (
                  <Tooltip
                    title={`Warning: You're over the budget by $${
                      dayCost - budget
                    }`}
                  >
                    <sc.StyledWarningIcon />
                  </Tooltip>
                ) : null}
                <span>${dayCost}</span>
              </div>
            </sc.Cost>
            <Grid
              item
              style={{ marginTop: "0.65em", textAlign: "center" }}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <sc.EditButton onClick={handleEditView}>
                {edit ? "Done" : "Edit"}
              </sc.EditButton>
            </Grid>
      </div>
    </sc.dayDiv>
  );
};

export default Day;
