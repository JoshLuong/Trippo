import { Button, TextField } from '@material-ui/core'
import styled from 'styled-components';
import * as c from "../../colors/colors";

export const loginHeader = styled.h1`
    font-family: Lato;
    font-style: normal;
    letter-spacing: 0.04em;
    font-size: 34px;
`;

export const signUpHeader = styled.h1`
    font-family: Lato;
    font-style: normal;
    letter-spacing: 0.04em;
    font-size: 20px;
`;


export const userTextField = styled(TextField)` && {
  margin: 12px;
}`;


export const userButton = styled(Button)` && {
  background-color: ${c.DARK_BLUE};
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin: 10px;
  &:hover {
    background-color: #5469d4;
  }
}
`;

export const forgotPassButton = styled(Button)` &&{
  background-color: none;
  border: none;
  text-decoration: underline;
  padding: 0;
  margin: 10px;
  &:hover {
    background-color: #5469d4;
  }
}`;