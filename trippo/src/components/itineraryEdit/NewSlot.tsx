import React, { FC, useState, useRef } from "react";
import { TextField } from '@material-ui/core';
import * as sc from "./NewSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid, Tooltip } from "@material-ui/core";
import * as c from "../../colors/colors";

interface Props {
}

const renderHeaderContent = () => (
    <Grid container item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid item lg={10} md={10} sm={10} xs={10}>
          Name
        </Grid>
        <Grid container item lg={2} md={2} sm={2} xs={2}>
            Cost
        </Grid>
      </sc.Destination>
    </Grid>
  );

const NewSlot: FC<Props> = () => {

    return (
        <sc.NewSlot container item lg={12}>
        <sc.Cancel/>
        <Grid container item lg={3} md={3} sm={12}>
          <sc.Time>
          <TextField
            id="time"
            type="time"
            defaultValue=""
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
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments contentEditable={true}>
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        hi
        </sc.NewSlot>
    );
};

export default NewSlot;
