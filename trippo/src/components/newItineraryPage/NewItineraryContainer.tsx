import { FC, useState, useRef } from 'react';
import mongoose from 'mongoose';
import { TextField, Grid, Select, MenuItem, InputAdornment, Chip, Tooltip, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import FaceIcon from '@material-ui/icons/Face';
import { useCreateItineraryMutation } from "services/itinerary";
import * as sc from './NewItinieraryContainer.styles'
import { Itinerary } from 'types/models';

interface Props {
    handleShowNewItinerary: (canShow: boolean) => void;
}

const collabData: any[] = [];

const countryData = [
    // TODO: replace with get request from some API
    { code: 'AD', label: 'Andorra' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'AF', label: 'Afghanistan' }
];

const tagsData = ["tag 1", "tag 2", "tag 3", "tag 4"];

const NewItineraryContainer: FC<Props> = ({ handleShowNewItinerary }) => {
    const [failSnackBar, setFail] = useState(false);
    const [showPreference, setPreference] = useState(false);
    const [rating, setRating] = useState(3);
    const [price, setPrice] = useState(2);
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const [destError, setDestError] = useState<string | undefined>(undefined);
    const [collaborators, setCollaborators] = useState<{ user_id: string; name: string; }[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [destination, setDestination] = useState<any>(null);
    const nameRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const budgetRef = useRef<HTMLInputElement>();
    const startRef = useRef<HTMLInputElement>();
    const endRef = useRef<HTMLInputElement>();
    const maxWalkRef = useRef<HTMLInputElement>();
    const maxDriveRef = useRef<HTMLInputElement>();

    const [
        createItinerary, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
    ] = useCreateItineraryMutation()

    // const [toAdd, setToAdd] = useState<UseMutationStateOptions<MutationDefinition<Partial<Itinerary>(null);

    const handleSubmit = async () => {
        // TODO: remove mongoose from package.json, and use some objectId taken from localstorage or smt
        // TODO validate collaborators
        const startDateArr = startRef.current?.value.split("-") || [];
        const endDateArr = endRef.current?.value.split("-") || [];
        if (!validate(startDateArr, endDateArr)) {
            setFail(true);
            return;
        }
        const start_date = new Date(Date.UTC(Number(startDateArr[0]), Number(startDateArr[1]) - 1, Number(startDateArr[2])));
        const end_date = new Date(Date.UTC(Number(endDateArr[0]), Number(endDateArr[1]) - 1, Number(endDateArr[2])));
        const newItinerary: Itinerary = {
            user_id: new mongoose.Types.ObjectId('60f0fb58f7f17e5f88b1eee1'),
            name: nameRef.current?.value || "",
            destination: destination?.label || "",
            budget: Number(budgetRef.current?.value) || 500,
            dining_budget: price,
            restaurant_ratings: rating,
            max_walking_dist: Number(maxWalkRef.current?.value) || 5,
            max_driving_dist: Number(maxDriveRef.current?.value) || 15,
            collaborators: collaborators,
            comments: descRef.current?.value,
            tags: tags,
            start_date: start_date,
            end_date: end_date,
            activities: [], // TODO change
        };
        createItinerary(newItinerary);
        handleShowNewItinerary(false);
    }

    const validate = (startDateArr: string[], endDateArr: string[]) => {
        if (!(typeof nameRef.current?.value === "string" && nameRef.current?.value !== "")) return false;
        if (!(typeof destination?.label === "string" && destination?.label !== "")) return false;
        if (startDateArr.length < 3 || endDateArr.length < 3) return false;
        const start_date = new Date(Date.UTC(Number(startDateArr[0]), Number(startDateArr[1]) - 1, Number(startDateArr[2])));
        const end_date = new Date(Date.UTC(Number(endDateArr[0]), Number(endDateArr[1]) - 1, Number(endDateArr[2])));
        if (end_date <= start_date) return false;
        return true;
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
                            Please fill in the required fields and ensure end date is after start date
                        </Alert>
                    </Snackbar>
                    <sc.inputTags>Name</sc.inputTags>
                    <sc.textField 
                        error={nameError === ""}
                        helperText={nameError === "" ? "Required" : null}
                        inputRef={nameRef} 
                        onBlur={(e) => {
                            setNameError(e.target.value);
                        }}
                        size="small" 
                        variant="outlined" 
                        color="secondary" 
                        label="My Trip Name" 
                        fullWidth 
                    />
                    <sc.inputTags>Destination</sc.inputTags>
                    <Autocomplete
                        classes={autoCompleteStyles}
                        value={destination}
                        onChange={(e: any, newValue: any) => { 
                            setDestination(newValue);
                        }}
                        onBlur={() => {
                            setDestError(destination)
                        }}
                        size="small"
                        options={countryData}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(option) => (
                            <div>
                                {option.label} ({option.code})
                            </div>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={destError === null}
                                helperText={destError === null ? "Required" : null}
                                variant="outlined"
                            />
                        )}
                    />
                    <sc.inputTags>Description</sc.inputTags>
                    <sc.textField inputRef={descRef} size="small" variant="outlined" color="secondary" fullWidth />
                </Grid>
                <Grid item container spacing={2} direction="row">
                    <Grid item xs={12} md={6} lg={6}>
                        <sc.inputTags>Collaborators</sc.inputTags>
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
