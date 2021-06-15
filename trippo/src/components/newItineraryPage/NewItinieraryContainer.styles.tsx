import { Button } from '@material-ui/core';
import styled from 'styled-components';
import * as c from "../../colors/colors";

export const newItineraryContainer = styled.div`
  background-color: white;
  margin: auto;
  margin-bottom: 7em;
  min-height: 14em;
  width: 900px;
  box-shadow: 0 4.5px 4px 0 rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  border-top: 16px solid ${c.DARK_BLUE};
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 2em;
  
  @media (max-width: 960px) {
    width: 70%;
  }
  
`;

export const header = styled.h1`
  /* background-color: ${c.DARK_BLUE}; */
`;

export const inputTags = styled.h2`
    font-size: small;
    color: ${c.DARK_BLUE};
`

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