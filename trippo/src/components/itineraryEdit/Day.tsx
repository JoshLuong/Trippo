import React, { FC, useState } from "react";
import * as sc from "./Day.styles";
import * as c from "../../colors/colors";
import TimeSlot from "./TimeSlot";
import moment from "moment";
import Settings from "./Settings";
import { Grid } from "@material-ui/core";
import { useAppSelector } from 'app/store';

interface Props {
  date: Date;
  handleCalendarView: () => void;
}

const Day: FC<Props> = ({ date, handleCalendarView }) => {
  const timeSlots = useAppSelector((state) => state.timeSlot.value);

  let cost = timeSlots
    .map((slot) => (slot.cost ? slot.cost : 0))
    .reduce(function (total, cost) {
      return total + cost;
    });
  const [settings, setSettings] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dayCost, setDayCost] = useState(cost);

  const handleSettingsView = () => {
    setSettings(!settings);
  };

  const handleEditView = () => {
    setEdit(!edit);
  };

  const handleHideCostToggle = (slotCost: number | undefined) => {
    setDayCost(dayCost + (slotCost || 0));
  };

  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

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
        <div>
          {days.map((d, index) => {
            if (index === date.getDay()) {
              return <sc.daysWeek key={index}>{d}</sc.daysWeek>;
            }
            return (
              <sc.daysWeek
                key={index}
                style={{ background: "#fff", color: c.BLACK }}
              >
                {d}
              </sc.daysWeek>
            );
          })}
        </div>
        <button onClick={handleSettingsView}>
          <i className="fas fa-cog"></i>
        </button>
      </sc.dayDate>
      {settings ? (
        <Settings></Settings>
      ) : (
        <div style={{ zIndex: 1 }}>
          {timeSlots.map((slot, idx) => {
            return (
              <div key={idx}>
                <TimeSlot
                  handleHideCostToggle={handleHideCostToggle}
                  timeSlot={slot}
                  showEdit={edit}
                />
              </div>
            );
          })}
          <sc.Cost container item lg={12}>
            <div>Total cost for {moment(date).format("YYYY/MM/DD")}:</div>
            <div>${dayCost}</div>
          </sc.Cost>
          <Grid
            item
            style={{ marginTop: "0.65em", textAlign: "center" }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            {edit ? (
              <>
                <sc.EditButton
                  style={{ marginRight: "2em" }}
                  onClick={() => alert("TODO")}
                >
                  Cancel
                </sc.EditButton>
                <sc.Spacer />
              </>
            ) : null}
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
