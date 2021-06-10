import React from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';
import styled from 'styled-components';

function LoginPane(props) {

    return (
        <div>
            <h1>Log in to your account</h1>
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
            <sc.forgotPassButton onClick={props.onForgotPassword}>Forgot Password?</sc.forgotPassButton>
            <br />
            <sc.userButton size="large" variant="contained" >Login</sc.userButton>
            <sc.userButton size="large" variant="contained" onClick={props.onSignUp}>Sign Up</sc.userButton>
        </div>
    )
}

export default LoginPane
