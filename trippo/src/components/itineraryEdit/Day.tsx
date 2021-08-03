import React, { FC, useState, useEffect } from "react";
import * as sc from "./Day.styles";
import TimeSlot from "./TimeSlot";
import moment from "moment";
import {ContextInterface, ItineraryContext} from "../itineraryPage/ItineraryPage"
import { Grid, Tooltip } from "@material-ui/core";
import { useAppSelector } from 'app/store';
import { Activity } from 'types/models';
import { getDistanceFromLatLonInKm } from './utils';

interface Props {
  date: Date;
  size?: string;
  isReadOnly?: boolean;
  handleCalendarView: () => void;
}

const Day: FC<Props> = ({ date, handleCalendarView, size="regular", isReadOnly=false }) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [editedItinerary, setEditedItinerary] = useState(itinerary);
  let prevActivity: Activity | null = null;
  const itineraryContext = React.useContext<ContextInterface>(ItineraryContext);

  const editActivity = (activity: Activity) => {
    if (editedItinerary) {
      setEditedItinerary({
        ...editedItinerary,
        activities: editedItinerary.activities.map((e) => e._id === activity._id ? activity : e),
      });
      itineraryContext?.setUnsavedChanges(true);
    }
  }

  const deleteActivity = (activity: Activity) => {
    if (editedItinerary) {
      setEditedItinerary({
        ...editedItinerary,
        activities: editedItinerary.activities.filter((e) => e._id !== activity._id),
      });
      itineraryContext?.setUnsavedChanges(true);
    }
  }

  useEffect(() => {
    if (itinerary) {
      setEditedItinerary(itinerary);
    }
  }, [itinerary]);

  const dayActivities = editedItinerary?.activities
    .filter((activity) => moment(date).isSame(moment(activity.time), 'date')) || [];

  useEffect(() => {
    setDayCost(dayActivities
      .reduce(function (total, activity) {
        return total + (activity.cost || 0);
      }, 0))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayActivities.length, editedItinerary])
  const [edit, setEdit] = useState(false);
  const [dayCost, setDayCost] = useState(0);
  const [currentCostOffset, setCurrentCostOffset] = useState(itinerary?.current_cost || 0);

  const handleEditView = () => {
    if (edit && itineraryContext?.unsavedChanges) {
      itineraryContext.updateItinerary(editedItinerary!);
      itineraryContext.setUnsavedChanges(false);
    }
    setEdit(!edit);
  };

  const handleHideCostToggle = (slotCost: number | undefined) => {
    setDayCost(dayCost + (slotCost || 0));
    setCurrentCostOffset(currentCostOffset + (slotCost || 0));
  };

  return (
    <sc.dayDiv>
      <sc.StickyDiv>
      <sc.dayDate>
        {
          !isReadOnly ? (
            <button style={{ float: "left" }} onClick={handleCalendarView}>
            <i className="fas fa-chevron-left"></i>
            <i className="far fa-calendar-alt"></i>
          </button>
          ) : null
        }
        <sc.daysWeek>
          {moment(date).format("MMMM Do YYYY")}
        </sc.daysWeek>
      </sc.dayDate>
      </sc.StickyDiv>
      <div>
          <sc.TimeSlots>
            {dayActivities.sort((a, b) => a.time.localeCompare(b.time)).map((activity, idx) => {
              const prevDistance = prevActivity ? getDistanceFromLatLonInKm(prevActivity.location?.lat, prevActivity.location?.lng, activity.location.lat, activity.location.lng) : -1;
              prevActivity = activity;
              return (
                <div key={activity._id}>
                  {
                    prevDistance >= 0 ? (
                      <sc.Distance>{prevDistance} kms away</sc.Distance>
                    ) : null
                  }
                  <TimeSlot
                    isReadOnly={isReadOnly}
                    size={size}
                    handleHideCostToggle={handleHideCostToggle}
                    activity={activity}
                    showEdit={edit}
                    index={idx}
                    editActivity={editActivity}
                    deleteActivity={deleteActivity}
                  />
                </div>
              );
            })}
          </sc.TimeSlots>
          {
            dayCost > 0 ? (
              <sc.Cost container item lg={12}>
              <div>Total cost for {moment(date).format("MMM Do YYYY")}:</div>
              <div>
                { itinerary && itinerary.budget && currentCostOffset > itinerary.budget ? (
                  <Tooltip
                    title={`Warning: You're over the total trip budget of $${itinerary.budget} by $${
                      currentCostOffset - itinerary.budget
                    }`}
                  >
                    <sc.StyledWarningIcon />
                  </Tooltip>
                ) : null}
                <span>${dayCost}</span>
              </div>
            </sc.Cost>
            ) : null
          }
            <Grid
              item
              style={{ marginTop: "0.65em", textAlign: "center" }}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              {
                !isReadOnly ? (
                  <sc.EditButton onClick={handleEditView}>
                  {edit ? "Done" : "Edit"}
                </sc.EditButton>
                ) : null
              }

            </Grid>
      </div>
    </sc.dayDiv>
  );
};

export default Day;
