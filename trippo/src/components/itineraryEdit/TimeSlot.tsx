import React, { FC, useState, useRef, useCallback } from "react";
import { TextField } from "@material-ui/core";
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Grid, Tooltip, Input, InputAdornment } from "@material-ui/core";
import moment from "moment";
import Suggestions from "./Suggestions";
import * as c from "../../colors/colors";
import { Activity } from "types/models";
import { useEffect } from "react";
import { debounce } from "lodash";

interface Props {
  handleHideCostToggle: (cost: number | undefined) => void;
  activity: Activity;
  showEdit?: boolean;
  index: number;
  editActivity: (activity: Activity) => void;
  deleteActivity: (activity: Activity) => void;
  isReadOnly?: boolean;
  size?: string;
}

const TimeSlot: FC<Props> = ({
  handleHideCostToggle,
  activity,
  showEdit,
  editActivity,
  deleteActivity,
  size,
  isReadOnly,
}) => {
  const { time, destination, comments, type, address, suggested } = activity;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCost, setShowCost] = useState(true);
  const [commentsString, setCommentsString] = useState(comments.join("\n"));
  const timeRef = useRef(null);
  const isMounted = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const edit = useCallback(debounce(editActivity, 400), []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const comments = commentsString.split("\n").filter((e) => Boolean(e));

    edit({
      ...activity,
      comments,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsString]);

  const setTime = (e: any) => {
    const t = e.target.value.split(":");
    const time = moment(date).set({ hour: t[0], minute: t[1] }).toISOString();
    editActivity({
      ...activity,
      time,
    });
  };

  const getButtons = () => {
    return showEdit ? (
      <sc.StyledIconButton onClick={() => deleteActivity(activity)}>
        <DeleteOutlineIcon />
      </sc.StyledIconButton>
    ) : (
      <button onClick={() => setShowSuggestions(!showSuggestions)}>
        {!showSuggestions ? (
          <Tooltip title="Show suggestions" aria-label="Show suggestions">
            <i className="fas fa-chevron-down"></i>
          </Tooltip>
        ) : (
          <Tooltip title="Hide suggestions" aria-label="Hide suggestions">
            <i
              style={{ color: c.DARK_ORANGE }}
              className="fas fa-chevron-up"
            ></i>
          </Tooltip>
        )}
      </button>
    );
  };
  const handleShowCostToggle = () => {
    !showCost
      ? handleHideCostToggle(activity.cost)
      : handleHideCostToggle(-Math.abs(activity.cost || 0));
    setShowCost(!showCost);
  };

  const renderHeaderContent = () => (
    <sc.HeaderGrid container item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid
          container
          item
          lg={size === "small" ? 10 : 9}
          md={9}
          sm={10}
          xs={10}
        >
          <sc.IconGrid container item lg={1} md={1} sm={1} xs={2}>
            {d.renderIcon(type)}
          </sc.IconGrid>
          <Grid
            container
            item
            lg={size === "small" ? 10 : 9}
            md={size === "small" ? 10 : 9}
            sm={10}
            xs={10}
          >
            <span>{destination}</span>
          </Grid>
          <sc.AddressSpan>{address}</sc.AddressSpan>
        </Grid>
        <sc.CostGrid
          container
          item
          lg={size === "small" ? 3 : 2}
          md={size === "small" ? 3 : 2}
          sm={3}
          xs={3}
        >
          <sc.Cost {...costStyling}>
          {activity.cost && !showEdit ? (
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
            <sc.StyledFormControl fullWidth>
              {activity.cost || showEdit ? (
                <Input
                  disabled={!showEdit}
                  value={activity.cost}
                  onChange={(e) => {
                    if (Number.isInteger(Number(e.target.value)) || e.target.value === "") {
                      editActivity({
                        ...activity,
                        cost: Number(e.target.value) || undefined
                      });
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              ) : null}
            </sc.StyledFormControl>
          </sc.Cost>
        </sc.CostGrid>
      </sc.Destination>
    </sc.HeaderGrid>
  );
  const costStyling = !showCost ? { style: { color: "#24272b85" } } : {};
  const date = time ? new Date(time) : new Date();

  return (
    <sc.Slot
      showSuggestions={showSuggestions}
      borderColor={d.getIconColor(type, "0.73")}
    >
      <Grid container item lg={12}>
        <Grid
          container
          item
          lg={size === "small" ? 12 : 3}
          md={size === "small" ? 12 : 3}
          sm={12}
        >
          <sc.Time small={size === "small"}>
            <TextField
              disabled={!showEdit}
              onChange={(e) => setTime(e)}
              ref={timeRef}
              id="time"
              type="time"
              defaultValue={moment(date, "dd DD-MMM-YYYY, hh:mm").format(
                "HH:mm"
              )}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </sc.Time>
        </Grid>
        <sc.SlotGrid
          container
          item
          lg={size === "small" ? 12 : 9}
          md={size === "small" ? 12 : 9}
          sm={12}
          xs={12}
          small={size === "small"}
        >
          {renderHeaderContent()}
          <Grid container item lg={1} md={1} sm={1} xs={1}>
            <sc.CommentButton>{!isReadOnly && getButtons()}</sc.CommentButton>
          </Grid>
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments small={size === "small"}>
              <sc.StyledTextField
                fullWidth
                id="filled-textarea"
                label="Notes"
                disabled={!showEdit}
                multiline
                variant="outlined"
                value={commentsString}
                onChange={(e: any) => setCommentsString(e.currentTarget.value)}
              />
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        {showSuggestions ? (
          <Suggestions
            activity={activity}
            renderIcon={d.renderIcon}
            suggested={suggested}
          ></Suggestions>
        ) : null}
      </Grid>
    </sc.Slot>
  );
};

export default TimeSlot;
