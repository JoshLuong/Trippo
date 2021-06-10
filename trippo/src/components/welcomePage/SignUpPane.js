import React from 'react'
import { IconButton } from '@material-ui/core'
import { AccountCircle, Lock, AlternateEmail, ArrowBack } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';

function SignUpPane(props) {

    return (
        <div>
            <IconButton onClick={props.handleBack}>
                <ArrowBack />
            </IconButton>
            <sc.signUpHeader>Sign Up</sc.signUpHeader>
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
            <sc.userButton size="large" variant="contained">Sign Up</sc.userButton>
        </div>
    )
}

export default SignUpPane
