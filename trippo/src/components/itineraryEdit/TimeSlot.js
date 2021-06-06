import React, {useState} from 'react';
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid } from '@material-ui/core';
import moment from 'moment';
import Suggestions from './Suggestions';
import * as c from "../../colors/colors";

function TimeSlot({timeSlot, showEdit}) {
  const {time, destination, comments, type, suggested} = timeSlot;
  const [showSuggestions, setShowSuggestions] = useState(false);

  const renderIcon = (t) => {
    switch(t) {
      case d.AIRPORT:
        return <sc.Icon className="fas fa-plane-departure"></sc.Icon>
        break;
      case d.HOTEL:
        return <sc.Icon className="fas fa-hotel"></sc.Icon>
      default:
        return <sc.Icon className="fas fa-map-marker-alt"></sc.Icon>
        // code block
    }
      
  }

  const date = new Date(time);

    return (
      <sc.Slot>
        <Grid container lg={12}>
          <Grid container item lg={3} md={3} sm={12}>
            <sc.Time>
              {moment(date, 'ddd DD-MMM-YYYY, hh:mm A').format("HH:mm A")}
            </sc.Time>
          </Grid>
          <Grid container item lg={9} md={9} sm={12} xs={12}>
            <Grid contatiner item lg={11} md={11} sm={11} xs={11}>
              <sc.Destination>
                {renderIcon(type)}
                {destination}
              </sc.Destination>
            </Grid>
            <Grid contatiner item lg={1} md={1} sm={1} xs={1}>
              <sc.Destination>
              <button onClick={() => setShowSuggestions(!showSuggestions)}>
                {
                  !showSuggestions ? 
                    <i class="fas fa-chevron-down"></i> : <i style={{color: c.DARK_ORANGE}}class="fas fa-chevron-up"></i>
                }
                </button>
              </sc.Destination>
            </Grid>
            <Grid contatiner item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments>
              {
                comments.map(c => {
                  return (
                    <li>
                      {c}
                    </li>
                  );
                })
              }
            </sc.Comments>
            </Grid>
          </Grid>
          {
            showSuggestions ? <Suggestions renderIcon={renderIcon} suggested= {suggested}></Suggestions> : null
          }
          {
            showEdit ? 
            <sc.EditButton>
              <i class="fas fa-minus-circle"></i>
            </sc.EditButton> : null
          }
        </Grid>
        
      </sc.Slot>
    );
}
  
export default TimeSlot;
  