import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { IconButton } from "@material-ui/core";
interface ButtonProps {
  $edit?: boolean;
  $hasMarginTop?: boolean;
}

export const dayDiv = styled.div`
  padding: 0.1em 1em 1em 1em;
  position: relative;
  min-height: calc(100% - 3.25em);
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;
`;

export const EditButton = styled(IconButton) <ButtonProps>`
  background-color: ${(props) =>
    props.$edit ? c.YELLOW : "rgba(0, 0, 0, 0.12)"};
  width: 7em;
  line-height: 1.25em;
  border-radius: 10px;
  margin-bottom: 2em;
  text-transform: none;
  border: none;
  color: ${c.BLACK};
  font-size: 1em;
  padding: 8px;
  margin-top: ${(props) =>
    props.$hasMarginTop ? "1.5em" : "0"};
`;

export const NoContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 0.5em;
`;

export const Tip = styled.span`
  color: ${c.DARK_ORANGE};
  font-weight: bold;
`;

export const StyledWarningIcon = styled(WarningIcon)`
  color: ${c.DARK_ORANGE};
  padding-right: 0.25em;
`;

export const Spacer = styled.div`
  display: inline-block;
  width: 2em;
`;

export const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  margin: 0 0.52em 0.35em 0.52em;
  padding: 0.75em 1em;
  height: 2.9em;
  border-radius: 2.5px;
  background: #ffffff;
  z-index:2;
`;

export const dayDate = styled.div`
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

  @media (max-width: 650px) {
    font-size: 0.8em;
  }
`;

export const Distance = styled.div`
  border-left: 1.25px dashed ${c.DARK_GREY};
  padding-left: 6px;
  margin: 0.75em 3px;
`;

export const daysWeek = styled.div`
  display: inline-block;
  font-size: 1.25em;
  letter-spacing: 0.25px;
  color: ${c.BLACK};
`;

export const TimeSlots = styled.div`
  padding: 0px 4px;
`;

export const Cost = styled(Grid)`
  padding-top: 1em;
  padding-left: 0.5em;
  display: flex;
  align-items: center;

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
