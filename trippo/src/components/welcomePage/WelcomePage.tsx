import LoginContainer from './LoginContainer';
import * as sc from './WelcomePage.styles';

function WelcomePage() {
    return (
        <sc.containerDiv>
            <sc.headerDiv>
                <sc.homeHeader>Plan Your Trips Like A Pro With Trippo</sc.homeHeader>
                <br></br>
                <sc.descHeader>An all-in-one itinerary management application</sc.descHeader>
            </sc.headerDiv>
            <sc.loginDiv>
                <LoginContainer />
            </sc.loginDiv>
        </sc.containerDiv>
    )
}

export default WelcomePage;
