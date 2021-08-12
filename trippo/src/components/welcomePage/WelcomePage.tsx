import LoginContainer from './LoginPane';
import { useState } from 'react';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as sc from './WelcomePage.styles';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'app/store';
import Placeholder from 'components/placeholder/Placeholder';

const WelcomePage = () => {
	const user = useAppSelector((state) => state.user.value);
	const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);
	const [error, setError] = useState(false);

	const handleLoginError = () => {
		setError(true);
	}

	const handleClose = (_event: any, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(false);
	}

	if (!isAppLoaded) {
		return <Placeholder />;
	}

	if (user?.isLoggedIn) {
    return <Redirect to={{ pathname: '/home' }} />;
  }

	return (
		<sc.containerDiv>
			{
				error ? (
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						open={error}
						autoHideDuration={2000}
						onClose={handleClose}
					>
						<Alert onClose={() => setError(false)} severity="error">
							Error logging in
						</Alert>
					</Snackbar>
				) : null
			}
			<sc.headerDiv>
				<sc.homeHeader>Plan Your Trips Like A Pro With Trippo</sc.homeHeader>
				<br />
				<sc.descHeader>
					<span>Sick of planning your trips with spread sheets and documents?</span>
					<br />
					<sc.Divider />
					<span>Watch your travel ideas come to life with our collaborative, map-based, suggestive itinerary planner.</span>
				</sc.descHeader>
			</sc.headerDiv>
			<sc.loginDiv>
				<LoginContainer handleLoginError={handleLoginError} />
			</sc.loginDiv>
		</sc.containerDiv>
	)
}

export default WelcomePage;
