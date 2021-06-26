import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import * as c from "../../colors/colors";
import GoogleLogin from 'react-google-login';
import { Grid } from '@material-ui/core';

export const loginHeader = styled.h1`
    font-style: normal;
    letter-spacing: 0.04em;
    font-size: 34px;
    line-height: 41px;
    color: ${c.GREY};
`;

export const signUpHeader = styled.h1`
    font-style: normal;
    letter-spacing: 0.04em;
    font-size: 20px;
    color: ${c.GREY};
`;

export const userTextField = styled(TextField)` && {
  margin: 12px;
  width: 75%;
}`;


export const userButton = styled(Button)` && {
  position: relative;
  background-color: ${c.DARK_BLUE};
  color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 30%;
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

export const signUpButton = styled(Button)` && {
  position: relative;
  background-color: ${c.DARK_BLUE};
  color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 30%;
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;

export const forgotPassButton = styled(Button)` &&{
  display: block;
  margin: auto;
  margin-bottom: 7px;
  background-color: none;
  border: none;
  text-decoration: underline;
}`;

export const loginPane = styled.div`
  margin: auto;
  width: 100%;
`;

export const StyledGoogleLogin = styled(GoogleLogin)`
  width: 50%;
`;

export const GoogleDiv = styled(Grid)`
  flex-direction: column;
  align-items: center;
`;

