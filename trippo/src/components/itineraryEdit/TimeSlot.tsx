import React, { FC, useState, useRef } from "react";
import { TextField } from '@material-ui/core';
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid, Tooltip } from "@material-ui/core";
import moment from "moment";
import Suggestions from "./Suggestions";
import * as c from "../../colors/colors";

interface Props {
  handleHideCostToggle: (cost: number | undefined) => void;
  timeSlot: {
    time?: Date;
    destination?: string;
    comments?: string[];
    type?: string;
    suggested?: {
      destination?: string;
      comments?: string;
      type?: string;
    }[];
    cost?: number;
  };
  showEdit?: boolean;
  timeChange: (date:any, timeRef:any, index:number) => void;
  index: number;
}

const TimeSlot: FC<Props> = ({ handleHideCostToggle, timeSlot, showEdit, timeChange, index }) => {
  const { time, destination, comments, type, suggested } = timeSlot;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCost, setShowCost] = useState(true);
  const timeRef = useRef(null);

  const handleShowCostToggle = () => {
    !showCost
      ? handleHideCostToggle(timeSlot.cost)
      : handleHideCostToggle(-Math.abs(timeSlot.cost || 0));
    setShowCost(!showCost);
  };

  const renderHeaderContent = () => (
    <Grid container item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid container item lg={1} md={1} sm={1} xs={1}>
          {d.renderIcon(type)}
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10}>
          {destination}
        </Grid>
        <Grid container item lg={2} md={2} sm={2} xs={2}>
          <sc.Cost {...costStyling} contentEditable={showEdit ? true : false}>
            {timeSlot.cost ? (
              <Tooltip
                title={`${
                  showCost ? "Hide from" : "Include in"
                } the total daily cost`}
              >
                <button onClick={handleShowCostToggle}>
                  {showCost ? (
                    <i className="fas fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </button>
              </Tooltip>
            ) : null}
            <div>{timeSlot.cost ? `$${timeSlot.cost}` : ""}</div>
          </sc.Cost>
        </Grid>
      </sc.Destination>
    </Grid>
  );
  const costStyling = !showCost ? { style: { color: "#24272b85" } } : {};
  const date = time ? new Date(time) : new Date();

  return (
    <sc.Slot showSuggestions={showSuggestions} borderColor={d.getIconColor(type)}>
      <Grid container item lg={12}>
        <Grid container item lg={3} md={3} sm={12}>
          <sc.Time>
          <TextField
            onChange={(date) => timeChange(date, timeRef, index)}
            ref={timeRef}
            id="time"
            type="time"
            defaultValue={moment(date, "dd DD-MMM-YYYY, hh:mm").format("HH:mm")}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          </sc.Time>
        </Grid>
        <sc.SlotGrid container item lg={9} md={9} sm={12} xs={12}>
          {renderHeaderContent()}
          <Grid container item lg={1} md={1} sm={1} xs={1}>
            <sc.CommentButton>
              <button onClick={() => setShowSuggestions(!showSuggestions)}>
                {!showSuggestions ? (
                  <i className="fas fa-chevron-down"></i>
                ) : (
                  <i
                    style={{ color: c.DARK_ORANGE }}
                    className="fas fa-chevron-up"
                  ></i>
                )}
              </button>
            </sc.CommentButton>
          </Grid>
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments contentEditable={showEdit ? true : false}>
              {comments?.map((c, index) => {
                return <li key={index}>{c}</li>;
              })}
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        {showSuggestions ? (
          <Suggestions
            renderIcon={d.renderIcon}
            suggested={suggested}
          ></Suggestions>
        ) : null}
        {showEdit ? (
          <sc.EditButton>
            <i className="fas fa-minus-circle"></i>
          </sc.EditButton>
        ) : null}
      </Grid>
    </sc.Slot>
  );
};

export default TimeSlot;
