import React, { FC, useState } from "react";
import { IconButton } from '@material-ui/core'
import { AlternateEmail, ArrowBack } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as sc from './Pane.styles';

interface Props {
    handleBack: () => void,
}

const ForgotPasswordPane: FC<Props> = (Props) => {
    return (
        <div>
            <IconButton onClick={Props.handleBack}>
                <ArrowBack />
            </IconButton>
            <h1>Account Recovery</h1>
            <sc.userTextField variant="outlined" color="secondary" label="Email" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AlternateEmail />
                    </InputAdornment>
                ),
            }} />
            <br />
            <sc.userButton size="large" variant="contained">Submit</sc.userButton>
        </div>
    )
}

export default ForgotPasswordPane
