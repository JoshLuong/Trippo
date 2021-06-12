import { Grid } from '@material-ui/core';
import React from 'react';
import LoginContainer from './LoginContainer';
import * as sc from './WelcomePage.styles';




function WelcomePage() {
    return (
        <sc.containerDiv>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} >
                    <LoginContainer />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <sc.homeHeader>Plan Your Trips Like A Pro With Trippo</sc.homeHeader>
                    <br></br>
                    <sc.descHeader>An all-in-on itinerary management application</sc.descHeader>
                </Grid>
            </Grid>
        </sc.containerDiv>
    )
}

export default WelcomePage
