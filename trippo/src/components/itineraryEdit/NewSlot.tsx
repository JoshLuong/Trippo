import React, { FC, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import * as sc from "./NewSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
interface Props {
  handleClose: () => void;
}

const NewSlot: FC<Props> = ({ handleClose }) => {
  const [type, setType] = useState(d.OTHER);

  const handleTypechange = (event: any) => {
    setType(event.target.value);
  }

  const selectStyles = sc.selectStyles();

  const renderHeaderContent = () => (
    <Grid container direction="row" item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid item lg={9} md={9} sm={9} xs={9}>
          <FormControl variant="outlined">
            <InputLabel classes={{ root: selectStyles.inputLabelRoot }}>Type</InputLabel>
            <Select
              className={selectStyles.underline}
              value={type}
              onChange={handleTypechange}
              label="Type"
            >
              <MenuItem value={d.AIRPORT}>{d.renderIcon(d.AIRPORT)}{d.AIRPORT}</MenuItem>
              <MenuItem value={d.ATTRACTION}>{d.renderIcon(d.ATTRACTION)}{d.ATTRACTION}</MenuItem>
              <MenuItem value={d.BEACH}>{d.renderIcon(d.BEACH)}{d.BEACH}</MenuItem>
              <MenuItem value={d.HOTEL}>{d.renderIcon(d.HOTEL)}{d.HOTEL}</MenuItem>
              <MenuItem value={d.PARK}>{d.renderIcon(d.PARK)}{d.PARK}</MenuItem>
              <MenuItem value={d.RESTAURANT}>{d.renderIcon(d.RESTAURANT)}{d.RESTAURANT}</MenuItem>
              <MenuItem value={d.SHOPPING}>{d.renderIcon(d.SHOPPING)}{d.SHOPPING}</MenuItem>
              <MenuItem value={d.OTHER}><em>{d.renderIcon(d.OTHER)}</em>{d.OTHER}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <sc.textField
            id="outlined-number"
            label="Cost"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
      </sc.Destination>
    </Grid>
  );
  return (
    <sc.NewSlot>
      <sc.NameDiv>Name</sc.NameDiv>
      <sc.AdressDiv>Address</sc.AdressDiv>
      <sc.Cancel onClick={handleClose}>
        <CancelIcon />
      </sc.Cancel>
      <sc.SlotContainer container item lg={12}>
        <Grid container item lg={3} md={3} sm={12}>
          <sc.Time>
            <sc.textField
              id="time"
              type="time"
              defaultValue="12:00"
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
            <sc.textField
              label="Comments"
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
        </sc.SlotGrid>
        <sc.AddButton>Add</sc.AddButton>
      </sc.SlotContainer>
    </sc.NewSlot>
  );
};

export default NewSlot;
