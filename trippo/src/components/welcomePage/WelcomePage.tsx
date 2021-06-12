import React from 'react';
import LoginContainer from './LoginContainer';
import * as sc from './WelcomePage.styles';



function WelcomePage() {
    return (
        <sc.containerDiv>
            <h1>Plan Your Trips Like A Pro With Trippo</h1>
            <h2>An all-in-on itinerary management application</h2>
            <LoginContainer />
        </sc.containerDiv>
    )
}

export default WelcomePage
