import React, { FC, useState } from "react";
import * as sc from "./Day.styles";
import TimeSlot from "./TimeSlot";
import moment from "moment";
import Settings from "./Settings";
import { Grid, Tooltip } from "@material-ui/core";
import { useAppSelector } from "app/store";

interface Props {
  date: Date;
  handleCalendarView: () => void;
}

const Day: FC<Props> = ({ date, handleCalendarView }) => {
  const day = useAppSelector((state) => state.day.value);

  let cost = day
    .map((slot) => (slot.cost ? slot.cost : 0))
    .reduce(function (total, cost) {
      return total + cost;
    }, 0);
  const [settings, setSettings] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dayCost, setDayCost] = useState(cost);
  const budget = 50;

  const handleSettingsView = () => {
    setSettings(!settings);
  };

  const timeChange = (date:any, timeRef: any, index: number) => {
    console.log(date.target.value)
    const t = date.target.value.split(":");
    const d = new Date(1995, 11, 17, 3, 24, 0); // TODO remove
    const newDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), t[0], t[1]);
    console.log(newDate)
    console.log(timeRef);
  }

  const handleEditView = () => {
    setEdit(!edit);
  };

  const handleHideCostToggle = (slotCost: number | undefined) => {
    setDayCost(dayCost + (slotCost || 0));
  };

  return (
    <sc.dayDiv>
      <sc.dayDate>
        {settings ? (
          <button style={{ float: "left" }} onClick={handleSettingsView}>
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-list"></i>
          </button>
        ) : (
          <button style={{ float: "left" }} onClick={handleCalendarView}>
            <i className="fas fa-chevron-left"></i>
            <i className="far fa-calendar-alt"></i>
          </button>
        )}
        <sc.daysWeek>
          {moment(date).format("MMMM Do YYYY")}
        </sc.daysWeek>
        {/* TODO: REMOVE INLINE STYLE HERE */}
        <button onClick={handleSettingsView} style={{ zIndex: 0 }}>
          <i className="fas fa-cog"></i>
        </button>
      </sc.dayDate>
      {settings ? (
        <Settings></Settings>
      ) : (
        <div>
          <sc.TimeSlots>
            {day.map((slot, idx) => {
              return (
                <div key={idx}>
                  <TimeSlot
                    handleHideCostToggle={handleHideCostToggle}
                    timeSlot={slot}
                    showEdit={edit}
                    timeChange={timeChange}
                    index={idx}
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
      )}
    </sc.dayDiv>
  );
};

export default Day;
