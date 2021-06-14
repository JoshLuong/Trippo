import { FC } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';
import { Grid } from '@material-ui/core';

interface Props {
    onForgotPassword: () => void,
    onSignUp: () => void
}

const LoginPane: FC<Props> = (Props) => {

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <h1>Log in to your account</h1>
            </Grid>
            <Grid item xs={12} lg={12}>
                <sc.userTextField variant="outlined" color="secondary" label="Username" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }} />
                <sc.userTextField variant="outlined" color="secondary" label="Password" type="password" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }} />
            </Grid>
            <Grid item xs={12} lg={12}>
                <sc.forgotPassButton onClick={Props.onForgotPassword}>Forgot Password?</sc.forgotPassButton>
            </Grid>
            <Grid item xs={12} lg={12} container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <sc.userButton size="large" variant="contained" >Login</sc.userButton>
                    <sc.signUpButton size="large" variant="contained" onClick={Props.onSignUp}>Sign Up</sc.signUpButton>
                </Grid>
            </Grid >
        </Grid>
    )
}

export default LoginPane
