import { FC, useState, useEffect, useContext } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  SnackbarCloseReason,
} from "@material-ui/core";
import * as sc from "./NewSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import { Grid, CircularProgress } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useAppDispatch, useAppSelector } from "app/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { setItinerary } from "app/reducers/itinerarySlice";
import {
  useCreateActivityMutation,
  useLazyGetItineraryByIdQuery,
} from "services/itinerary";
import { Activity } from "types/models";
import {
  ContextInterface,
  ItineraryContext,
} from "../itineraryPage/ItineraryPage";
import { useParams } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";


interface Props {
  handleClose: () => void;
  handleSubmitAndClose: () => void;
  destinationName: string;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  setSearchResult: any;
}

const NewSlot: FC<Props> = ({
  handleClose,
  handleSubmitAndClose,
  destinationName,
  destinationAddress,
  destinationLat,
  destinationLng,
  setSearchResult,
}) => {
  const itineraryContext = useContext<ContextInterface>(ItineraryContext);
  const dispatch = useAppDispatch();
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [type, setType] = useState(d.OTHER);
  const [cost, setCost] = useState(0);
  const [comments, setComments] = useState("");
  const [time, setTime] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(
    itineraryContext?.activeDay || itinerary?.start_date
  );
  const [addDisabled, setAddDisabled] = useState(false);
  const [createActivity] = useCreateActivityMutation();
  const [triggerGetQuery, result] = useLazyGetItineraryByIdQuery();
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (result.data) {
      dispatch(setItinerary(result.data));
      setSearchResult(null);
      handleSubmitAndClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleTypechange = (event: any) => {
    setType(event.target.value);
  };

  const handleCostChange = (event: any) => {
    if (event.target.value <= -1) {
      setCost(0);
    } else {
      setCost(event.target.value);
    }
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

  const handleErrorClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };
    
  const getSuggestedBusinesses = async (activityId: any) => {
    await fetch(`/api/yelp/attractions`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        latitude: destinationLat,
        longitude: destinationLng,
        rating: itinerary?.restaurant_ratings, 
        price: itinerary?.dining_budget, 
        distance: (itinerary?.max_traveling_dist! * 1000), 
        time: new Date(selectedDate!).setHours(
          Number(time.split(":")[0]),
          Number(time.split(":")[1])
        ),
        itineraryId: itinerary?._id,
        activityId: activityId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    .catch((err) => {
      if (err){
        setErrorSnackbar(true);
      }
    });

    if (Number(time.split(":")[0]) >= 6 && Number(time.split(":")[0]) <= 11) {
      await fetch(`/api/yelp/restaurants/breakfast_brunch`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: itinerary?.restaurant_ratings, 
          price: itinerary?.dining_budget, 
          distance: (itinerary?.max_traveling_dist! * 1000), 
          time: new Date(selectedDate!).setHours(
            Number(time.split(":")[0]),
            Number(time.split(":")[1])
          ),
          itineraryId: itinerary?._id,
          activityId: activityId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
      .catch((err) => {
        if (err){
          setErrorSnackbar(true);
        }
      });
    }

    if (
      (Number(time.split(":")[0]) >= 11 && Number(time.split(":")[0]) <= 14) ||
      (Number(time.split(":")[0]) >= 17 && Number(time.split(":")[0]) <= 21)
    ) {
      await fetch(`/api/yelp/restaurants`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: itinerary?.restaurant_ratings, 
          price: itinerary?.dining_budget, 
          distance: (itinerary?.max_traveling_dist! * 1000), 
          time: new Date(selectedDate!).setHours(
            Number(time.split(":")[0]),
            Number(time.split(":")[1])
          ),
          itineraryId: itinerary?._id,
          activityId: activityId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
      .catch((err) => {
        if (err){
          setErrorSnackbar(true);
        }
      });
    }

    if (Number(time.split(":")[0]) >= 20 || Number(time.split(":")[0]) <= 3) {
      await fetch(`/api/yelp/nightlife`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          latitude: destinationLat,
          longitude: destinationLng,
          rating: itinerary?.restaurant_ratings, 
          price: itinerary?.dining_budget,
          distance: (itinerary?.max_traveling_dist! * 1000), 
          time: new Date(selectedDate!).setHours(
            Number(time.split(":")[0]),
            Number(time.split(":")[1])
          ),
          itineraryId: itinerary?._id,
          activityId: activityId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
      .catch((err) => {
        if (err){
          setErrorSnackbar(true);
        }
      });
    }
  };

  const addToItinerary = () => {
    const newActivity: Omit<Activity, "_id"> = {
      itinerary_id: itinerary?._id!,
      location: {
        lat: destinationLat,
        lng: destinationLng,
      },
      address: destinationAddress,
      time: new Date(selectedDate!)
        .setHours(Number(time.split(":")[0]), Number(time.split(":")[1]))
        .toString(),
      destination: destinationName,
      cost: cost || undefined,
      type: type,
      comments: comments.split("\n"),
    };
    setAddDisabled(true);
    createActivity(newActivity)
      .then(async (res: any) => {
        await getSuggestedBusinesses(res.data._id);
        triggerGetQuery(id);
      })
      .catch(() => handleClose());
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
                label="Notes"
                multiline
                rows={3}
                variant="outlined"
                value={comments}
                onChange={handleCommentsChange}
              />
            </Grid>
          </sc.SlotGrid>
          <sc.AddButton disabled={addDisabled} onClick={() => addToItinerary()}>
            {!addDisabled ? (
              "Add"
            ) : (
              <CircularProgress size="1.25em" color="inherit" />
            )}
          </sc.AddButton>
        </sc.SlotContainer>
      </sc.NewSlot>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={() => setErrorSnackbar(false)} severity="error">
          There was an error saving Yelp data
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewSlot;
