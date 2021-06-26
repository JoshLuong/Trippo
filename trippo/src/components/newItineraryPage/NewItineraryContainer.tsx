import { FC } from 'react';
import { TextField, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import * as sc from './NewItinieraryContainer.styles'
import { Remove } from '@material-ui/icons';

interface Props {
    handleShowNewItinerary: (canShow: boolean) => void;
}

const collabData = [
    { name: "Jane Doe", email: 'janedoe@gmail.com' },
    { name: "john Doe", email: 'johndoe@gmail.com' },
];

const countryData = [
    { code: 'AD', label: 'Andorra' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'AF', label: 'Afghanistan' }
];



const NewItineraryContainer: FC<Props> = ({handleShowNewItinerary}) => {

    return (
        <sc.newItineraryContainer>
            <sc.header>New Itinerary:</sc.header>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} lg={12}>
                    <sc.inputTags>Name</sc.inputTags>
                    <sc.textField size="small" variant="filled" color="secondary" label="My Trip Name" fullWidth />
                </Grid>
                <Grid item xs={12} lg={12}>
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
                                variant="filled"
                            />
                        )}
                    />
                    <sc.inputTags>Collaborators</sc.inputTags>
                    <Autocomplete multiple
                        options={collabData}
                        limitTags={6}
                        getOptionLabel={(option) => option.name}
                        renderOption={(option) => <div>
                            {option.name} - {option.email}
                        </div>}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled" size="small" />
                        )}
                    />
                </Grid>
                <Grid item container spacing={2} direction="row">
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
                </Grid>
                <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                    <Grid item xs={12} sm={9} md={6} lg={4}>
                        <sc.userButton onClick={()=> handleShowNewItinerary(false)}size="large" variant="contained" >Cancel</sc.userButton>
                        <sc.userButton size="large" variant="contained" >Submit</sc.userButton>
                    </Grid>
                </Grid>
            </Grid>
        </sc.newItineraryContainer>
    )
}

export default NewItineraryContainer
