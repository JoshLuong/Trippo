import { FC } from 'react';
import { TextField, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import * as sc from './NewItinieraryContainer.styles'
import { GroupAdd } from '@material-ui/icons';

interface Props {

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



const NewItineraryContainer: FC<Props> = (Props) => {

    return (
        <sc.newItineraryContainer>
            <sc.header>New Itinerary:</sc.header>
            <Grid container spacing={2} direction="column" alignContent="flex-start">
                <Grid item xs={12} lg={12}>
                    <sc.inputTags>Name</sc.inputTags>
                    <TextField size="small" variant="filled" color="secondary" label="My Trip Name" />
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
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
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
                            <TextField {...params} variant="filled" />
                        )}
                    />
                </Grid>
                <Grid item container spacing={2} direction="row">
                    <Grid item xs={2} lg={3}>
                        <TextField
                            id="start date"
                            label="start date"
                            type="date"
                            defaultValue="2020-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid >
                    <Grid item xs={2} lg={3}>
                        <TextField
                            id="end date"
                            label="end date"
                            type="date"
                            defaultValue="2020-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item direction="row" spacing={2}>
                    <Grid item xs={5} lg={3}>
                        <sc.userButton size="large" variant="contained" >Submit</sc.userButton>
                    </Grid>
                </Grid>
            </Grid>
        </sc.newItineraryContainer>
    )
}

export default NewItineraryContainer
