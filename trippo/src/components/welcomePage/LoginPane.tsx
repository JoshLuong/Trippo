import React, { FC } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';

interface Props {
    onForgotPassword: () => void,
    onSignUp: () => void
}

const LoginPane: FC<Props> = (Props) => {

    return (
        <sc.loginPane>
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
            <sc.forgotPassButton onClick={Props.onForgotPassword}>Forgot Password?</sc.forgotPassButton>
            <br />
            <sc.userButton size="large" variant="contained" >Login</sc.userButton>
            <sc.userButton size="large" variant="contained" onClick={Props.onSignUp}>Sign Up</sc.userButton>
        </sc.loginPane>
    )
}

export default LoginPane
