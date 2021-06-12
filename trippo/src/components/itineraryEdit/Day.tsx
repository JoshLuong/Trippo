import React, { FC, useState } from "react";
import * as sc from "./Day.styles";
import * as d from "../../app/destinations/destinationTypes";
import * as c from "../../colors/colors";
import TimeSlot from "./TimeSlot";
import moment from "moment";
import Settings from "./Settings";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

interface Props {
  date: Date;
  handleCalendarView: () => void;
}

const Day: FC<Props> = ({ date, handleCalendarView }) => {
  let timeSlots = [
    {
      time: new Date(date.setHours(8)),
      destination: "Executive Suites Hotel Metro Vancouver",
      cost: 10,
      type: d.HOTEL,
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          type: d.OTHER,
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(8)),
      destination: "Hotel",
      cost: 20,
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(8)),
      destination: "Hotel",
      cost: 50,
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(8)),
      destination: "Hotel",
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(8)),
      destination: "Hotel",
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(8)),
      destination: "Hotel",
      comments: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "rest",
      ],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
    {
      time: new Date(date.setHours(13)),
      destination: "Hotel",
      comments: ["unpack", "rest"],
      suggested: [
        {
          destination: "Aquarium",
          comments: "3 min away",
        },
        {
          destination: "Park",
          comments: "10 min away",
        },
      ],
    },
  ];
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

  // Date.prototype.addHours = function (h) {
  //   this.setTime(this.getTime() + h * 60 * 60 * 1000);
  //   return this;
  // };

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
              return <sc.daysWeek>{d}</sc.daysWeek>;
            }
            return (
              <sc.daysWeek style={{ background: "#fff", color: c.BLACK }}>
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
          {timeSlots.map((slot) => {
            return (
              <div>
                <TimeSlot
                  handleHideCostToggle={handleHideCostToggle}
                  timeSlot={slot}
                  showEdit={edit}
                />
              </div>
            );
          })}
          <sc.Cost container lg={12}>
            <div>Total cost for {moment(date).format("YYYY/MM/DD")}:</div>
            <div>${dayCost}</div>
          </sc.Cost>
          <Grid
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
