/// <reference path='./LoginPane.d.ts' />
import { FC } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';
import { Grid } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login'
interface Props {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

const LoginPane: FC<Props> = (Props) => {
    const handleLogin = (googleData: any) => {
        console.log("LOGGING IN");
        console.log(googleData);
    }

    const responseFacebook = (response: any) => {
        console.log(response);
    }

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
            <sc.GoogleDiv container item xs={12} lg={12}>
                <sc.forgotPassButton onClick={Props.onForgotPassword}>Forgot Password?</sc.forgotPassButton>
                <sc.StyledGoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </sc.GoogleDiv>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                autoLoad={true}
                size="medium"
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <Grid item xs={12} lg={12} container>
                <Grid item xs={12} lg={12}>
                    <sc.userButton size="large" variant="contained" >Login</sc.userButton>
                    <sc.signUpButton size="large" variant="contained" onClick={Props.onSignUp}>Sign Up</sc.signUpButton>
                </Grid>
            </Grid >
        </Grid>
    )
}

export default LoginPane
