import React, { FC, useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Snackbar, SnackbarCloseReason } from "@material-ui/core";
import * as sc from "./NewSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useAppSelector } from "app/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useCreateActivityMutation } from "services/itinerary";
import { Activity } from "types/models";
import {ContextInterface, ItineraryContext} from "../itineraryPage/ItineraryPage"
import Alert from "@material-ui/lab/Alert";
import Suggestions from "./Suggestions"


interface Props {
  handleClose: () => void;
  destinationName: string;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  setSearchResult: any;
}

const NewSlot: FC<Props> = ({
  handleClose,
  destinationName,
  destinationAddress,
  destinationLat,
  destinationLng,
  setSearchResult,
}) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [type, setType] = useState(d.OTHER);
  const [cost, setCost] = useState(0);
  const [comments, setComments] = useState("");
  const [time, setTime] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(itinerary?.start_date);
  const [createActivity, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useCreateActivityMutation();
  // const itineraryContext = React.useContext<ContextInterface>(ItineraryContext);
  // const [addActivityFeedback, setAddActivityFeedback] = useState(false);

  const handleTypechange = (event: any) => {
    setType(event.target.value);
  };

  const handleCostChange = (event: any) => {
    setCost(event.target.value);
  };

  const handleCommentsChange = (event: any) => {
    setComments(event.target.value);
  };

  const handleTimeChange = (event: any) => {
    setTime(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setSelectedDate(event);
  };

  
  const getSuggestedBusinesses = async (activityId: any) => {
    await fetch(`/api/yelp/attractions`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        latitude: destinationLat,
        longitude: destinationLng,
        rating: 3, // TODO: change to user input
        price: "1, 2, 3", // TODO: change to user input
        distance: 20000, // TODO: change to user input
        time: new Date(selectedDate!).setHours(Number(time.split(":")[0]), Number(time.split(":")[1])),
        itineraryId: itinerary?._id,
        activityId: activityId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json());

    if (Number(time.split(":")[0]) >= 6 && Number(time.split(":")[0]) <= 11) {
      await fetch(`/api/yelp/restaurants/breakfast_brunch`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: 3, // TODO: change to user input
          price: "1, 2, 3", // TODO: change to user input
          distance: 20000, // TODO: change to user input
          time: new Date(selectedDate!).setHours(Number(time.split(":")[0]), Number(time.split(":")[1])),
          itineraryId: itinerary?._id,
          activityId: activityId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
    }

    if ((Number(time.split(":")[0]) >= 11 && Number(time.split(":")[0]) <= 14)
        || (Number(time.split(":")[0]) >= 17 && Number(time.split(":")[0]) <= 21)){
      await fetch(`/api/yelp/restaurants`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: 3, // TODO: change to user input
          price: "1, 2, 3", // TODO: change to user input
          distance: 20000, // TODO: change to user input
          time: new Date(selectedDate!).setHours(Number(time.split(":")[0]), Number(time.split(":")[1])),
          itineraryId: itinerary?._id,
          activityId: activityId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json());
    }

    if (Number(time.split(":")[0]) >= 20 || Number(time.split(":")[0]) <= 3){
      await fetch(`/api/yelp/nightlife`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: 3, // TODO: change to user input
          price: "1, 2, 3", // TODO: change to user input
          distance: 20000, // TODO: change to user input
          time: new Date(selectedDate!).setHours(Number(time.split(":")[0]), Number(time.split(":")[1])),
          itineraryId: itinerary?._id,
          activityId: activityId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json());
    }


  }

  const addToItinerary = () => {
    const newActivity: Omit<Activity, "_id"> = {
      itinerary_id: itinerary?._id!,
      location: {
        lat: destinationLat,
        lng: destinationLng,
      },
      address: destinationAddress,
      time: (((new Date(selectedDate!)).setHours(Number(time.split(":")[0]), Number(time.split(":")[1]))).toString()),
      destination: destinationName,
      cost: cost || undefined,
      type: type,
      comments: comments.split("\n"),
    };
    console.log(new Date(selectedDate!).setHours(Number(time.split(":")[0]), Number(time.split(":")[1])));
    createActivity(newActivity).then((res: any) => {
      getSuggestedBusinesses(res.data);
  })
    setSearchResult(null);
    handleClose();
  };


  const selectStyles = sc.selectStyles();

  const renderHeaderContent = () => (
    <Grid container direction="row" item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid item lg={9} md={9} sm={9} xs={9}>
          <sc.StyledFormControl variant="outlined">
            <InputLabel classes={{ root: selectStyles.inputLabelRoot }}>
              Type
            </InputLabel>
            <Select
              className={selectStyles.underline}
              value={type}
              onChange={handleTypechange}
              label="Type"
            >
              <MenuItem value={d.AIRPORT}>
                {d.renderIcon(d.AIRPORT)}
                {d.AIRPORT}
              </MenuItem>
              <MenuItem value={d.ATTRACTION}>
                {d.renderIcon(d.ATTRACTION)}
                {d.ATTRACTION}
              </MenuItem>
              <MenuItem value={d.BEACH}>
                {d.renderIcon(d.BEACH)}
                {d.BEACH}
              </MenuItem>
              <MenuItem value={d.HOTEL}>
                {d.renderIcon(d.HOTEL)}
                {d.HOTEL}
              </MenuItem>
              <MenuItem value={d.PARK}>
                {d.renderIcon(d.PARK)}
                {d.PARK}
              </MenuItem>
              <MenuItem value={d.RESTAURANT}>
                {d.renderIcon(d.RESTAURANT)}
                {d.RESTAURANT}
              </MenuItem>
              <MenuItem value={d.SHOPPING}>
                {d.renderIcon(d.SHOPPING)}
                {d.SHOPPING}
              </MenuItem>
              <MenuItem value={d.OTHER}>
                <em>{d.renderIcon(d.OTHER)}</em>
                {d.OTHER}
              </MenuItem>
            </Select>
          </sc.StyledFormControl>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <sc.textField
            id="outlined-number"
            label="Cost"
            type="number"
            value={cost}
            onChange={handleCostChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0 } }}
            variant="outlined"
          />
        </Grid>
      </sc.Destination>
    </Grid>
  );

  return (
    <>
    <sc.NewSlot>
      <sc.NameDiv>{destinationName}</sc.NameDiv>
      <sc.AdressDiv>{destinationAddress}</sc.AdressDiv>
      <sc.Cancel onClick={handleClose}>
        <CancelIcon />
      </sc.Cancel>
      <sc.SlotContainer container item md={12}>
        <Grid container item lg={3} md={3} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <sc.Time>
              <sc.StyledDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select a date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                minDate={itinerary?.start_date.toString()}
                maxDate={itinerary?.end_date.toString()}
              />
            </sc.Time>
          </MuiPickersUtilsProvider>
          <sc.Time>
            <sc.textField
              id="time"
              type="time"
              label="Select a time"
              value={time}
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  step: 60, // 1 min
                  required: true,
                },
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
              value={comments}
              onChange={handleCommentsChange}
            />
          </Grid>
        </sc.SlotGrid>
        <sc.AddButton onClick={() => addToItinerary()}>Add</sc.AddButton>
      </sc.SlotContainer>
    </sc.NewSlot>
    {/* <Snackbar transitionDuration={1000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={addActivityFeedback} autoHideDuration={5000} onClose={handleFeedbackClose}>
      <Alert severity="success">
        Your activities have been updated
      </Alert>
    </Snackbar> */}
    </>
  );
};

export default NewSlot;

