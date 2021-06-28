import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

export const dayDiv = styled.div`
  padding: 1em;
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;
`;

export const EditButton = styled.button`
  margin: auto;
  border: none;
  height: 2em;
  width: 5em;
  background-color: ${c.DARK_BLUE};
  color: ${c.WHITE};
  letter-spacing: 1px;
  font-weight: 545;
  padding: 0;
  border-radius: 16px;
  margin-bottom: 0.5em;
  :hover {
    cursor: pointer;
  }
`;

export const StyledWarningIcon = styled(WarningIcon)`
  color: ${c.DARK_ORANGE};
  padding-right: 0.25em;
`;

export const Spacer = styled.div`
  display: inline-block;
  width: 2em;
`;

export const dayDate = styled.div`
  margin-bottom: 0.5em;
  position: relative;
  display: flex;
  color: ${c.WHITE};
  font-weight: 545;
  letter-spacing: 2px;
  border-radius: 3px;
  button {
    border: none;
    height: 2em;
    padding: 0;
    padding-left: 0.25em;
    background-color: transparent;
    margin: auto 0 auto 0;
    z-index: 1;
    i {
      display: inline;
      padding-right: 0.25em;
      color: ${c.GREY};
      font-size: 1.3em;
    }
  }
  button:hover {
    cursor: pointer;
  }
  div {
    margin: auto;
    text-align: center;
  }
`;

export const daysWeek = styled.div`
  display: inline-block;
  font-size: 1.25em;
  letter-spacing: 0.25px;
  color: ${c.BLACK};
`;

export const TimeSlots = styled.div`
  padding: 0px 4px;
  border-left: 2.5px solid ${c.YELLOW};
`;

export const Cost = styled(Grid)`
  padding-top: 1em;
  padding-left: 0.5em;

  div:nth-child(2) {
    display: flex;
    float: right;
    margin-left: auto;
    margin-right: 0.5em;
  }

  span {
    padding-top: 3px;
    display: inline-block;
  }
`;
