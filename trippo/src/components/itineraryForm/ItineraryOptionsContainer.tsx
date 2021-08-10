import { FC, useState, useEffect, Fragment, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { TextField, Grid, Chip, Tooltip, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { Autocomplete, Alert } from '@material-ui/lab';
import FaceIcon from '@material-ui/icons/Face';
import * as sc from './NewItinieraryContainer.styles'
import _ from "lodash";
import { useLazyGetUserByEmailQuery } from 'services/user';
interface Props {
    user: any;
    defaultCollaborators: any[];
    defaultDestination: any;
    defaultTags: string[];
    defaultName: string;
    defaultDesc: string;
    collabSetter: Dispatch<SetStateAction<any[]>>;
    destinationSetter: Dispatch<any>;
    tagSetter: Dispatch<SetStateAction<string[]>>;
    nameRef: MutableRefObject<HTMLInputElement | undefined>;
    descRef: MutableRefObject<HTMLInputElement | undefined>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    errorMessage: string;
    setFail: Dispatch<SetStateAction<boolean>>;
    failSnackbar: boolean;
}

const collabData: any[] = [];

const tagsData: any[] = [];

const ItineraryOptionsContainer: FC<Props> = ({ defaultCollaborators, defaultDesc, defaultDestination, defaultName, defaultTags,
    collabSetter, destinationSetter, tagSetter, nameRef, descRef, errorMessage, setFail, failSnackbar, setErrorMessage, user }) => {


    const [cityData, setCityData] = useState([]);
    const [destError, setDestError] = useState(undefined);
    const [nameError, setNameError] = useState<string | undefined>(undefined);

    const search = _.debounce((text: string) => {
        handleCitySearch(text);
    }, 500);

    const [trigger, result] = useLazyGetUserByEmailQuery();

    useEffect(() => {
        if (!result.isFetching && result.data) {
            processCollaborators(result.data);
        }
        if (result.isError) {
            setErrorMessage(result.originalArgs + " is an invalid email");
            setFail(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);


    const processCollaborators = (newValue: any) => {
        if (result.status === "fulfilled") {
            collabSetter([...defaultCollaborators, newValue]);
        }
    }

    const onAutocompleteChange = async (e: any, newValue: any, reason: string) => {
        if (reason === "create-option") {
            let email = newValue[newValue.length - 1];
            if (preventDupeCollab(email)) {
                trigger(email);
            } else {
                setErrorMessage(email + " has already been added");
                setFail(true);
            }
        }
        else if (reason === "remove-option") {
            collabSetter(newValue);
        } else if (reason === "clear") {
            collabSetter([]);
        }
    }

    const preventDupeCollab = (email: string) => {
        if (email === user.email) return false;
        for (let collab of defaultCollaborators) {
            if (collab.email === email) {
                return false;
            }
        }
        return true;
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

    const handleClose = (event: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFail(false);
    }

    const autoCompleteStyles = sc.autoCompleteStyles();

    return (
        <Fragment>
            <Grid item xs={12} lg={12}>
                <Snackbar open={failSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={() => setFail(false)} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <sc.inputTags>Name</sc.inputTags>
                <sc.textField
                    defaultValue={defaultName}
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
                    value={defaultDestination}
                    onChange={(e: any, newValue: any) => {
                        destinationSetter(newValue);
                        if (newValue) tagSetter([newValue.country, newValue.name, newValue.region, ...defaultTags]);
                    }}
                    onBlur={() => setDestError(defaultDestination)}
                    size="small"
                    options={cityData || []}
                    autoHighlight
                    getOptionLabel={(option) => {
                        if (option.name && option.region) {
                            return option.name + ", " + option.region;
                        } else {
                            return option.name;
                        }
                    }}
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
                <sc.textField key={defaultDestination} inputRef={descRef} size="small" variant="outlined" color="secondary" fullWidth defaultValue={defaultDesc || `This is my trip to ${defaultDestination ? defaultDestination.name : '...'}`} />
            </Grid>
            <Grid item container spacing={2} direction="row">
                <Grid item xs={12} md={6} lg={6}>
                    <sc.inputTags>Collaborators
                        <Tooltip
                            title={"Please enter valid user Gmails. Any collaborator will have full read and write access, but will not have the ability to delete the itinerary."}
                        >
                            <sc.StyledInfoIcon />
                        </Tooltip>
                    </sc.inputTags>
                    <Autocomplete multiple
                        classes={autoCompleteStyles}
                        onChange={onAutocompleteChange}
                        freeSolo
                        value={defaultCollaborators}
                        options={collabData}
                        limitTags={6}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" size="small" />
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    icon={<FaceIcon />}
                                    label={option.email}
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
                        onChange={(e: any, newValue: any) => { tagSetter(newValue) }}
                        value={defaultTags}
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
        </Fragment>
    )
}

export default ItineraryOptionsContainer
