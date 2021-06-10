import React, { useState } from "react";
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid } from "@material-ui/core";
import moment from "moment";
import Suggestions from "./Suggestions";
import * as c from "../../colors/colors";

function TimeSlot({ handleHideCostToggle, timeSlot, showEdit }) {
  const { time, destination, comments, type, suggested } = timeSlot;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCost, setShowCost] = useState(true);

  const renderIcon = (t) => {
    switch (t) {
      case d.AIRPORT:
        return <sc.Icon className="fas fa-plane-departure"></sc.Icon>;
        break;
      case d.HOTEL:
        return <sc.Icon className="fas fa-hotel"></sc.Icon>;
      default:
        return <sc.Icon className="fas fa-map-marker-alt"></sc.Icon>;
      // code block
    }
  };

  const handleShowCostToggle = () => {
    !showCost
      ? handleHideCostToggle(timeSlot.cost)
      : handleHideCostToggle(-Math.abs(timeSlot.cost));
    setShowCost(!showCost);
  };

  const renderHeaderContent = () => (
    <Grid contatiner item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid contatiner item lg={1} md={1} sm={1} xs={1}>
          {renderIcon(type)}
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10}>
          {destination}
        </Grid>
        <Grid contatiner item lg={2} md={2} sm={2} xs={2}>
          <sc.Cost {...costStyling} contentEditable={showEdit ? true : false}>
            {timeSlot.cost ? (
              <button
                title={`${
                  showCost ? "Remove from" : "Add to"
                } the total daily cost`}
                onClick={handleShowCostToggle}
              >
                {showCost ? (
                  <i class="fas fa-eye"></i>
                ) : (
                  <i class="far fa-eye-slash"></i>
                )}
              </button>
            ) : null}
            <div>{timeSlot.cost ? `$${timeSlot.cost}` : ""}</div>
          </sc.Cost>
        </Grid>
      </sc.Destination>
    </Grid>
  );
  const costStyling = !showCost ? { style: { color: "#24272b85" } } : {};
  const date = new Date(time);

  return (
    <sc.Slot>
      <Grid container lg={12}>
        <Grid container item lg={3} md={3} sm={12}>
          <sc.Time>
            {moment(date, "ddd DD-MMM-YYYY, hh:mm A").format("HH:mm A")}
          </sc.Time>
        </Grid>
        <sc.SlotGrid container item lg={9} md={9} sm={12} xs={12}>
          {renderHeaderContent()}
          <Grid contatiner item lg={1} md={1} sm={1} xs={1}>
            <sc.CommentButton>
              <button onClick={() => setShowSuggestions(!showSuggestions)}>
                {!showSuggestions ? (
                  <i class="fas fa-chevron-down"></i>
                ) : (
                  <i
                    style={{ color: c.DARK_ORANGE }}
                    class="fas fa-chevron-up"
                  ></i>
                )}
              </button>
            </sc.CommentButton>
          </Grid>
          <Grid contatiner item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments contentEditable={showEdit ? true : false}>
              {comments.map((c) => {
                return <li>{c}</li>;
              })}
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        {showSuggestions ? (
          <Suggestions
            renderIcon={renderIcon}
            suggested={suggested}
          ></Suggestions>
        ) : null}
        {showEdit ? (
          <sc.EditButton>
            <i class="fas fa-minus-circle"></i>
          </sc.EditButton>
        ) : null}
      </Grid>
    </sc.Slot>
  );
}

export default TimeSlot;
