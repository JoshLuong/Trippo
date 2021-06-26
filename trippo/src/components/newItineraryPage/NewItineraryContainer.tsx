import { FC, useState } from 'react';
import { TextField, Grid, Select, MenuItem, InputAdornment, Chip, Tooltip } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import FaceIcon from '@material-ui/icons/Face';
import * as sc from './NewItinieraryContainer.styles'

interface Props {
    handleShowNewItinerary: (canShow: boolean) => void;
}

const collabData = [
    { name: "Jane Doe", email: 'janedoe@gmail.com' },
    { name: "John Doe", email: 'johndoe@gmail.com' },
    { name: "ane Doe", email: 'anedoe@gmail.com' },
    { name: "ohn Doe", email: 'ohndoe@gmail.com' },
    { name: "ne Doe", email: 'nedoe@gmail.com' },
    { name: "hn Doe", email: 'hndoe@gmail.com' },
];

const countryData = [
    { code: 'AD', label: 'Andorra' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'AF', label: 'Afghanistan' }
];

const tagsData = ["tag 1", "tag 2", "tag 3", "tag 4"];

const NewItineraryContainer: FC<Props> = ({ handleShowNewItinerary }) => {

    const [showPreference, setPreference] = useState(false);
    const [rating, setRating] = useState(1);
    const [price, setPrice] = useState(1);

    const handleRating = (e: any) => {
        setRating(e.target.value)
    }

    const handlePrice = (e: any) => {
        setPrice(e.target.value)
    }

    return (
        <sc.newItineraryContainer>
            <sc.header>New Itinerary:</sc.header>
            <sc.FormGrid direction="column">
                <Grid item xs={12} lg={12}>
                    <sc.inputTags>Name</sc.inputTags>
                    <sc.textField size="small" variant="outlined" color="secondary" label="My Trip Name" fullWidth />
                    <sc.inputTags>Destination</sc.inputTags>
                    <Autocomplete
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
                                variant="outlined"
                            />
                        )}
                    />
                    <sc.inputTags>Description</sc.inputTags>
                    <sc.textField size="small" variant="outlined" color="secondary" fullWidth />
                </Grid>
                <Grid item container spacing={2} direction="row">
                    <Grid item xs={12} md={6} lg={6}>
                        <sc.inputTags>Collaborators</sc.inputTags>
                        <Autocomplete multiple
                            options={collabData}
                            limitTags={6}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => <div>
                                {option.name} - {option.email}
                            </div>}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" size="small" />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        icon={<FaceIcon />}
                                        label={option.name}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <sc.inputTags>Tags</sc.inputTags>
                        <Autocomplete multiple
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

                        <TextField
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
                        <TextField
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
                            <Select value={rating} onChange={handleRating}>
                                <MenuItem value={1}>1 stars</MenuItem>
                                <MenuItem value={2}>2 stars</MenuItem>
                                <MenuItem value={3}>3 stars</MenuItem>
                                <MenuItem value={4}>4 stars</MenuItem>
                                <MenuItem value={5}>5 stars</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <sc.inputTags>Restaurant Prices</sc.inputTags>
                            <Select value={price} onChange={handlePrice}>
                                <MenuItem value={1}>$</MenuItem>
                                <MenuItem value={2}>$$</MenuItem>
                                <MenuItem value={3}>$$$</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container item direction="column" spacing={1} xs={12} md={6} lg={6}>
                        <Grid item lg={10}>
                            <sc.inputTags>Maximum Walking Distance</sc.inputTags>
                            <sc.textField size="small" variant="outlined" color="secondary"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }} fullWidth />
                        </Grid>
                        <Grid item lg={10}>
                            <sc.inputTags>Maximum Driving Distance</sc.inputTags>
                            <sc.textField size="small" variant="outlined" color="secondary"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>}
                <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                    <Grid item xs={12} sm={9} md={6} lg={4}>
                        <sc.userButton onClick={() => handleShowNewItinerary(false)} >Cancel</sc.userButton>
                        <sc.userButton >Submit</sc.userButton>
                    </Grid>
                </Grid>
            </sc.FormGrid>
        </sc.newItineraryContainer>
    )
}

export default NewItineraryContainer
