import { FC } from 'react'
import { IconButton, Grid } from '@material-ui/core'
import { AccountCircle, Lock, AlternateEmail, ArrowBack } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';

interface Props {
    handleBack: () => void
}

const SignUpPane: FC<Props> = (Props) => {

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <IconButton onClick={Props.handleBack}>
                    <ArrowBack />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <sc.signUpHeader>Sign Up</sc.signUpHeader>
            </Grid>
            <Grid item xs={12} lg={9}>
                <sc.userTextField variant="outlined" color="secondary" label="Email" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmail />
                        </InputAdornment>
                    ),
                }} />
                <br />
                <sc.userTextField variant="outlined" color="secondary" label="Username" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }} />
                <br />
                <sc.userTextField variant="outlined" color="secondary" label="Password" type="password" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }} />
                <br />

            </Grid>
            <Grid item xs={11} lg={8}>
                <sc.signUpButton size="large" variant="contained">Sign Up</sc.signUpButton>
            </Grid>
        </Grid>
    )
}

export default SignUpPane
