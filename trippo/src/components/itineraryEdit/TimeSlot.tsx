import React, { FC, useState, useRef } from "react";
import { TextField } from '@material-ui/core';
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Grid, Tooltip, InputLabel, Input, InputAdornment } from "@material-ui/core";
import moment from "moment";
import Suggestions from "./Suggestions";
import * as c from "../../colors/colors";
import { Activity } from 'types/models';

interface Props {
  handleHideCostToggle: (cost: number | undefined) => void;
  activity: Activity;
  showEdit?: boolean;
  index: number;
  editActivity: (activity: Activity) => void;
}

const TimeSlot: FC<Props> = ({ handleHideCostToggle, activity, showEdit, editActivity }) => {
  const { time, destination, comments, type, suggested } = activity;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCost, setShowCost] = useState(true);
  // const [cost, setCost] = useState(activity.cost || 0);
  const timeRef = useRef(null);

  const setComments = (value: string) => {
    const comments = value.split('\n').filter(e => Boolean(e));
    console.log(comments)

    editActivity({
      ...activity,
      comments,
    });
  }

  const setTime = (e: any) => {
    const t = e.target.value.split(":");
    const time = moment(date).set({ hour: t[0], minute: t[1] }).toDate();
    editActivity({
      ...activity,
      time,
    });
  }

  // TODO: Fix cost input
  // const editCost = (costString: string) => {
  //   const newCost = costString.slice(1);
  //   setCost(Number(newCost));
  // }

  const getButtons = () => {
    return showEdit ? (
      <sc.StyledIconButton>
        <DeleteOutlineIcon />
      </sc.StyledIconButton>
    ) : (
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
    )
  }
  const handleShowCostToggle = () => {
    !showCost
      ? handleHideCostToggle(activity.cost)
      : handleHideCostToggle(-Math.abs(activity.cost || 0));
    setShowCost(!showCost);
  };

  const renderHeaderContent = () => (
    <Grid container item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid container item lg={1} md={1} sm={1} xs={1}>
          {d.renderIcon(type)}
        </Grid>
        <Grid item lg={9} md={9} sm={9} xs={9}>
          {destination}
        </Grid>
        <Grid container item lg={3} md={3} sm={3} xs={3}>
          <sc.Cost {...costStyling} contentEditable={showEdit ? true : false}>
              <sc.StyledFormControl fullWidth>
                {activity.cost || showEdit ? (
                <Input
                  value={activity.cost}
                  onChange={() => alert("TODO")}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                ) : null}
            </sc.StyledFormControl>
            {activity.cost ? (
              <Tooltip
                title={`${showCost ? "Hide from" : "Include in"
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
              disabled={!showEdit}
              onChange={(e) => setTime(e)}
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
              {getButtons()}
            </sc.CommentButton>
          </Grid>
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments>
              <sc.StyledTextField
                fullWidth
                id="filled-textarea"
                label="Comments"
                disabled={!showEdit}
                multiline
                variant="outlined"
                defaultValue={comments.reduce((acc, comment) => {
                  return acc + "\n" + comment;
                })}
                onChange={(e: any) => setComments(e.currentTarget.value)}
              />
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        {showSuggestions ? (
          <Suggestions
            renderIcon={d.renderIcon}
            suggested={suggested}
          ></Suggestions>
        ) : null}
      </Grid>
    </sc.Slot>
  );
};

export default TimeSlot;
