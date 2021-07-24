/// <reference path='./NewItineraryContainer.d.ts' />
import { FC, useState, useRef } from 'react';
import { TextField, Grid, Select, MenuItem, InputAdornment, Chip, Tooltip, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { useAppSelector } from 'app/store';
import Alert from '@material-ui/lab/Alert';
import FaceIcon from '@material-ui/icons/Face';
import * as sc from './NewItinieraryContainer.styles'
import _ from "lodash";
import { Itinerary } from 'types/models';

interface Props {
    handleShowNewItinerary: (canShow: boolean) => void;
    createItinerary: (arg: Partial<Itinerary>) => any;
}

const collabData: any[] = [];

const tagsData = ["tag 1", "tag 2", "tag 3", "tag 4"];

const NewItineraryContainer: FC<Props> = ({ handleShowNewItinerary, createItinerary }) => {
    const user = useAppSelector((state) => state.user.value);
    const [errorMessage, setErrorMessage] = useState("");
    const [cityData, setCityData] = useState([]);
    const [failSnackBar, setFail] = useState(false);
    const [showPreference, setPreference] = useState(false);
    const [rating, setRating] = useState(3);
    const [price, setPrice] = useState(2);
    const [collaborators, setCollaborators] = useState<{ user_id: string; name: string; }[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [destination, setDestination] = useState<any>(null);
    const [destError, setDestError] = useState(undefined);
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const nameRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const budgetRef = useRef<HTMLInputElement>();
    const startRef = useRef<HTMLInputElement>();
    const endRef = useRef<HTMLInputElement>();
    const maxWalkRef = useRef<HTMLInputElement>();
    const maxDriveRef = useRef<HTMLInputElement>();

    const search = _.debounce((text: string) => {
        handleCitySearch(text);
    }, 500);

    // const [toAdd, setToAdd] = useState<UseMutationStateOptions<MutationDefinition<Partial<Itinerary>(null);

    const handleSubmit = async () => {
        // TODO: remove mongoose from package.json, and use some objectId taken from localstorage or smt
        // TODO validate collaborators
        if (!user) return;
        const startDateArr = startRef.current?.value.split("-") || [];
        const endDateArr = endRef.current?.value.split("-") || [];
        if (!validate(startDateArr, endDateArr)) {
            setFail(true);
            return;
        }
        const start_date = new Date(Date.UTC(Number(startDateArr[0]), Number(startDateArr[1]) - 1, Number(startDateArr[2])));
        const end_date = new Date(Date.UTC(Number(endDateArr[0]), Number(endDateArr[1]) - 1, Number(endDateArr[2])));
        const newItinerary: Omit<Itinerary, "_id" | "user_id"> = {
            name: nameRef.current?.value || "",
            destination: destination?.name + ", " + destination?.region || "",
            dest_coords: {
                lat: destination.latitude,
                lng: destination.longitude
            },
            budget: Number(budgetRef.current?.value) || 500,
            dining_budget: price,
            restaurant_ratings: rating,
            max_walking_dist: Number(maxWalkRef.current?.value) || 5,
            max_driving_dist: Number(maxDriveRef.current?.value) || 15,
            collaborators: [...collaborators],
            comments: descRef.current?.value,
            tags: tags,
            start_date: start_date,
            end_date: end_date,
            activities: [], // TODO change
        };
        createItinerary(newItinerary);
        handleShowNewItinerary(false);
    }

    const handleCitySearch = (city: string) => {
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY!,
                "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST!
            }
        })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                setCityData(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const validate = (startDateArr: string[], endDateArr: string[]) => {
        setErrorMessage(" ");
        let ret: boolean = true;
        let emptyFields: string[] = [];
        if (!(typeof nameRef.current?.value === "string" && nameRef.current?.value !== "")) {
            ret = false;
            emptyFields.push("Name");
        }
        if (!(typeof destination?.name === "string" && destination?.name !== "")) {
            ret = false;
            emptyFields.push("Destination");
        }
        if (startDateArr.length < 3 || endDateArr.length < 3) {
            ret = false;
            emptyFields.push("Start and End Date");
        }
        console.log(emptyFields);
        if (emptyFields.length > 0) {
            let msg = "Please fill in these required fields: "
            for (let i = 0; i < emptyFields.length; i++) {
                msg += emptyFields[i];
                if (i !== emptyFields.length - 1) {
                    msg += ", ";
                } else msg += ".";
            }
            setErrorMessage(msg);
        }
        if (!ret) {
            return ret;
        }
        const start_date = new Date(Date.UTC(Number(startDateArr[0]), Number(startDateArr[1]) - 1, Number(startDateArr[2])));
        const end_date = new Date(Date.UTC(Number(endDateArr[0]), Number(endDateArr[1]) - 1, Number(endDateArr[2])));
        if (end_date <= start_date) {
            ret = false;
            setErrorMessage("Please ensure start date is before end date.");
        }
        return ret;
    }

    const handleClose = (event: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFail(false);
    }

    const autoCompleteStyles = sc.autoCompleteStyles();

    return (
        <sc.newItineraryContainer>
            <sc.header>New Itinerary:</sc.header>
            <sc.FormGrid direction="column">
                <Grid item xs={12} lg={12}>
                    <Snackbar open={failSnackBar} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={() => setFail(false)} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <sc.inputTags>Name</sc.inputTags>
                    <sc.textField 
                        autoFocus 
                        error={nameError === ""} 
                        onBlur={() => {
                            setNameError(nameRef.current?.value || "");
                        }}
                        helperText={nameError === "" ? 'Required' : ' '} 
                        inputRef={nameRef} 
                        size="small" 
                        variant="outlined" 
                        color="secondary" 
                        label="My Trip Name" 
                        fullWidth />
                    <sc.inputTags>Destination</sc.inputTags>
                    <Autocomplete
                        classes={autoCompleteStyles}
                        value={destination}
                        onChange={(e: any, newValue: any) => { 
                            setDestination(newValue);
                            if (newValue) setTags([newValue.country, ...tags]); 
                        }}
                        onBlur={() => setDestError(destination)}
                        size="small"
                        options={cityData || []}
                        autoHighlight
                        getOptionLabel={(option) => option.name + ", " + option.region}
                        renderOption={(option) => (
                            <div>
                                {option.name}, {option.region}
                            </div>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => search(e.target.value)}
                                error={destError === null}
                                helperText={destError === null ? "Required" : "Enter a city or the first city of your trip"}
                                variant="outlined"
                            />
                        )}
                    />
                    <sc.inputTags>Description</sc.inputTags>
                    <sc.textField key={destination} inputRef={descRef} size="small" variant="outlined" color="secondary" fullWidth defaultValue={`This is my trip to ${destination ? destination.name : '...'}`} />
                </Grid>
                <Grid item container spacing={2} direction="row">
                    <Grid item xs={12} md={6} lg={6}>
                        <sc.inputTags>Collaborators
                            <Tooltip
                                title={"Please enter valid user emails"}
                            >
                                <sc.StyledInfoIcon />
                            </Tooltip>
                        </sc.inputTags>
                        <Autocomplete multiple
                            classes={autoCompleteStyles}
                            onChange={(e: any, newValue: any) => { setCollaborators(newValue) }}
                            freeSolo
                            value={collaborators}
                            options={collabData}
                            limitTags={6}
                            renderOption={(option) => <div>
                                {option}
                            </div>}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" size="small" />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        icon={<FaceIcon />}
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <sc.inputTags>Tags</sc.inputTags>
                        <Autocomplete multiple
                            classes={autoCompleteStyles}
                            freeSolo
                            onChange={(e: any, newValue: any) => { setTags(newValue) }}
                            value={tags}
                            options={tagsData}
                            limitTags={6}
                            getOptionLabel={(option) => option}
                            renderOption={(option) => <div>
                                {option}
                            </div>}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" size="small" />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        icon={<sc.StyledLabelIcon />}
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                        />
                    </Grid>
                </Grid>
                <sc.DateGrid item container spacing={2} direction="row">
                    <Grid item xs={8} lg={3}>
                        <sc.textField
                            inputRef={budgetRef}
                            defaultValue={500}
                            id="outlined-number"
                            label="Budget"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </Grid >
                    <Grid item xs={8} lg={3}>
                        <sc.textField
                            required
                            inputRef={startRef}
                            id="start_date"
                            label="Start date"
                            type="date"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid >
                    <Grid item xs={6} lg={3}>
                        <sc.textField
                            required
                            inputRef={endRef}
                            id="end_date"
                            label="End date"
                            type="date"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </sc.DateGrid>
                <Grid item lg={12} container direction="row">
                    <sc.preferencesButton onClick={() => setPreference(!showPreference)}>More Preferences
                        {!showPreference ? (
                            <i className="fas fa-chevron-down"></i>
                        ) : (
                            <i
                                className="fas fa-chevron-up"
                            ></i>
                        )}
                    </sc.preferencesButton>
                    <Tooltip
                        title={"The suggested destinations are filtered based on your preferences, but may differ slightly."}
                    >
                        <sc.StyledInfoIcon />
                    </Tooltip>
                </Grid>
                {showPreference && <Grid container item direction="row" spacing={3}>
                    <Grid container item direction="row" spacing={2} xs={12} md={6} lg={6}>
                        <Grid item xs={6} lg={6}>
                            <sc.inputTags>Restaurant Ratings</sc.inputTags>
                            <Select value={rating} onChange={(e: any) => { setRating(e.target.value) }}>
                                <MenuItem value={1}>1 stars</MenuItem>
                                <MenuItem value={2}>2 stars</MenuItem>
                                <MenuItem value={3}>3 stars</MenuItem>
                                <MenuItem value={4}>4 stars</MenuItem>
                                <MenuItem value={5}>5 stars</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <sc.inputTags>Restaurant Prices</sc.inputTags>
                            <Select value={price} onChange={(e: any) => { setPrice(e.target.value) }}>
                                <MenuItem value={1}>$</MenuItem>
                                <MenuItem value={2}>$$</MenuItem>
                                <MenuItem value={3}>$$$</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container item direction="column" spacing={1} xs={12} md={6} lg={6}>
                        <Grid item lg={10}>
                            <sc.inputTags>Maximum Walking Distance</sc.inputTags>
                            <sc.textField defaultValue={5} inputRef={maxWalkRef} size="small" variant="outlined" color="secondary"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }} fullWidth />
                        </Grid>
                        <Grid item lg={10}>
                            <sc.inputTags>Maximum Driving Distance</sc.inputTags>
                            <sc.textField defaultValue={15} inputRef={maxDriveRef} size="small" variant="outlined" color="secondary"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>}
                <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                    <Grid item xs={12} sm={9} md={6} lg={4}>
                        <sc.userButton onClick={() => handleShowNewItinerary(false)} >Cancel</sc.userButton>
                        <sc.userButton onClick={handleSubmit}>Submit</sc.userButton>
                    </Grid>
                </Grid>
            </sc.FormGrid>
        </sc.newItineraryContainer>
    )
}

export default NewItineraryContainer
