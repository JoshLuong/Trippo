/// <reference path='./LoginPane.d.ts' />
import { FC } from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/reducers/userSlice';
import * as sc from './Pane.styles';
import { Grid } from '@material-ui/core';

interface Props {
  onForgotPassword: () => void;
  onSignUp: () => void;
  handleLoginError: () => void;
}

const LoginPane: FC<Props> = (Props) => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleLogin = async (googleData: any) => {
        try {
            const res = await fetch(`/api/v1/auth/google`, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify({
                token: googleData.tokenId
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
            const data = await res.json()
            //do something...
            dispatch(setUser({isLoggedIn: true, ...data}));
            history.push("/home?page=1");
        } catch(e) {
            Props.handleLoginError();
            console.log(e);
        }
        // store returned user somehow
      }

    return (
        <Grid container spacing={2} direction="column">
            <sc.GoogleDiv container item xs={12} lg={12}>
                <sc.StyledGoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                    buttonText="Sign in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </sc.GoogleDiv>
        </Grid>
    )
}

export default LoginPane

/*
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

*/
