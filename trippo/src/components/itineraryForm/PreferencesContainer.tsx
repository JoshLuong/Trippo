
import { FC, useState, Fragment, Dispatch, SetStateAction } from 'react';
import { Grid, Select, MenuItem, InputAdornment, Tooltip } from '@material-ui/core'
import * as sc from './NewItinieraryContainer.styles'


interface Props {
    defaultRating: number;
    defaultPrice: number;
    defaultMaxTravel: number;
    setPrice: Dispatch<SetStateAction<number>>;
    setRating: Dispatch<SetStateAction<number>>;
    setMaxTravel: Dispatch<SetStateAction<number>>;
}

const PreferencesContainer: FC<Props> = ({ defaultRating, defaultPrice, defaultMaxTravel, setRating, setPrice, setMaxTravel }) => {
    const [showPreference, setPreference] = useState(false);

    return (
        <Fragment>
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
                    title={"The suggested Yelp activites are filtered based on your preferences, but may differ slightly."}
                >
                    <sc.StyledInfoIcon />
                </Tooltip>
            </Grid>
            {showPreference && <Grid container item direction="row" spacing={3}>
                <Grid container item direction="row" spacing={2} xs={12} md={6} lg={6}>
                    <Grid item xs={6} lg={6}>
                        <sc.inputTags>Restaurant Ratings</sc.inputTags>
                        <Select value={defaultRating} onChange={(e: any) => { setRating(e.target.value) }}>
                            <MenuItem value={1}>1 stars</MenuItem>
                            <MenuItem value={2}>2 stars</MenuItem>
                            <MenuItem value={3}>3 stars</MenuItem>
                            <MenuItem value={4}>4 stars</MenuItem>
                            <MenuItem value={5}>5 stars</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <sc.inputTags>Restaurant Prices</sc.inputTags>
                        <Select value={defaultPrice} onChange={(e: any) => { setPrice(e.target.value) }}>
                            <MenuItem value={1}>$</MenuItem>
                            <MenuItem value={2}>$$</MenuItem>
                            <MenuItem value={3}>$$$</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container item direction="column" spacing={1} xs={12} md={6} lg={6}>
                    <Grid item lg={10}>
                        <sc.inputTags>Maximum Travel Distance</sc.inputTags>
                        <sc.textField defaultValue={defaultMaxTravel} onChange={(event: any) => setMaxTravel(event.target.value)} size="small" variant="outlined" color="secondary"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">km</InputAdornment>,
                            }} fullWidth />
                    </Grid>
                </Grid>
            </Grid>}
        </Fragment>
    )
}

export default PreferencesContainer
