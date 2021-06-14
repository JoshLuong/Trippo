import { FC } from "react";
import { IconButton, Grid } from '@material-ui/core'
import { AlternateEmail, ArrowBack } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';

interface Props {
    handleBack: () => void,
}

const ForgotPasswordPane: FC<Props> = (Props) => {
    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <IconButton onClick={Props.handleBack}>
                    <ArrowBack />
                </IconButton>
            </Grid>
            <Grid item xs={12} lg={12}>
                <h1>Account Recovery</h1>
            </Grid>
            <Grid>
                <sc.userTextField variant="outlined" color="secondary" label="Email" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmail />
                        </InputAdornment>
                    ),
                }} />
            </Grid>
            <Grid item xs={12} lg={12}>
                <sc.userButton size="large" variant="contained">Submit</sc.userButton>
            </Grid>
        </Grid>
    )
}

export default ForgotPasswordPane
