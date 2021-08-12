import { FC } from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/reducers/userSlice';
import * as sc from './Pane.styles';
import { User } from "types/models"
import { Grid } from '@material-ui/core';

interface Props {
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
            const data: User = await res.json()
            dispatch(setUser({ isLoggedIn: true, ...data }));
            window.localStorage.setItem('user', data.name);
            history.push("/home?page=1");
        } catch (e) {
            Props.handleLoginError();
        }
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

