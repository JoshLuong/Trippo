import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import * as c from "../../colors/colors";

export const newItineraryContainer = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  background-color: white; 
  min-height: 14em;
  width: 900px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  border-top: 16px solid ${c.DARK_BLUE};
  padding-left: 3em;
  padding-right: 3em;
  padding-bottom: 3em;
  
  @media (max-width: 960px) {
    width: 70%;
  }

  
`;

export const header = styled.p`
  background-color: ${c.DARK_BLUE};
  position: relative;
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  font-size: 20px;
  /* fix this - padding of div creates white space*/
  width: calc(100% + 4.2em);
  margin-left: -2.1em;
`;

export const inputTags = styled.h2`
    font-size: small;
    color: ${c.DARK_BLUE};
`

export const userButton = styled(Button)` && {
  position: relative;
  background-color: ${c.DARK_ORANGE};
  color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 40%;
  margin: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;

export const textField = styled(TextField)`
  border-radius: 40px;
`;