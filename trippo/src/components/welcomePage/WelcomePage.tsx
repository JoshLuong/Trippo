import LoginContainer from './LoginContainer';
import { useState } from 'react';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as sc from './WelcomePage.styles';

function WelcomePage() {
    const [error, setError] = useState(false);

    const handleLoginError = () => {
        setError(true);
    }

    const handleClose = (event: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    }

    return (
        <sc.containerDiv>
            {
                error ? (
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={error} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={() => setError(false)} severity="error">
                        Error logging in
                    </Alert>
                </Snackbar>
                ) : null
            }
            <sc.headerDiv>
                <sc.homeHeader>Plan Your Trips Like A Pro With Trippo</sc.homeHeader>
                <br></br>
                <sc.descHeader>An all-in-one itinerary management application</sc.descHeader>
            </sc.headerDiv>
            <sc.loginDiv>
                <LoginContainer handleLoginError={handleLoginError}/>
            </sc.loginDiv>
        </sc.containerDiv>
    )
}

export default WelcomePage;
