import styled, { css } from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
const darkGrey = c.GREY;
export interface StyledTimeSlotProps{
  showSuggestions: boolean
}

export const Slot = styled.div<StyledTimeSlotProps>`
  margin-top: 0.5em;
  border-radius: 0px 7px 7px 0px;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.25em;
  border-left: 7px solid ${props => !props.showSuggestions ? c.BLUE : c.DARK_ORANGE};
  padding-right: 0.25em;
  background-color: #fff;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.4);
  position: relative;
  &:hover {
    transform: scale(1.025);
  }
`;

export const Time = styled.div`
  color: ${c.BLACK};
  border-right: 1.5px solid ${c.DARK_GREY};
  padding-right: 0.8em;
  padding-bottom: 0.5em;
  margin-left: 4px;

  div:before, div:after{
    content: none;
  }

  .MuiInput-root {
    font-size: 1em;
    letter-spacing: 0px;

  }

  @media (max-width: 960px) {
    border-right: 0px;
  }
`;

export const SlotGrid = styled(Grid)`
  @media (max-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const Destination = styled.div`
  color: ${c.BLACK};
  display: flex;
  flex-grow: 1;
  font-weight: 550;
  i {
    margin-right: 5px;
    color: ${c.YELLOW};
  }

  button {
    border: none;
    height: 2em;
    width: 2em;
    padding: 0;
    background-color: transparent;
    i {
      display: inline;
      color: ${c.DARK_BLUE};
      font-size: 1.75em;
    }
  }
  button:hover {
    cursor: pointer;
  }
`;

const editStyles = css`
  border: 1.25px solid ${c.BLACK};
  border-radius: 7px;
  outline: none;
`;

const editStylesUnderline = css`
  border-bottom: 1.25px solid ${c.BLACK};
  border-radius: 2px;
  margin-bottom: 0.5em;
  outline: none;
`;

export const Cost = styled.div`
  font-weight: 500;
  float: right;
  font-size: 0.75em;
  justify-content: center;
  display: flex;
  align-items: center;
  div {
    margin-right: 0.5em;
  }
  ${(props) => props.contentEditable && editStylesUnderline}

  button {
    border: none;
    height: 2em;
    width: 2em;
    padding: 0;
    background-color: transparent;
    i {
      width: 100%;
      text-shadow: unset;
      display: inline;
      color: #24272b85;
      font-size: 1em;
    }
  }
`;
export const CommentButton = styled.div`
  color: ${darkGrey};
  button {
    border: none;
    height: 2em;
    width: 2em;
    padding: 0;
    background-color: transparent;
    i {
      display: inline;
      color: ${c.BLUE};
      font-size: 1.75em;
    }
  }
  button:hover {
    cursor: pointer;
  }
`;

export const Comments = styled.ul`
  margin-top: 0.25em;
  margin-right: 1.5em;
  color: ${c.BLACK};
  width: 100%;
  list-style: none;
  padding-left: 0.5em;
  ${(props) => props.contentEditable && editStyles}
  @media (max-width: 960px) {
    margin-left: 1em;
  }
`;

export const Icon = styled.i`
  padding-right: 5px;
`;

export const EditButton = styled.button`
  margin: auto;
  border: none;
  height: 2em;
  width: 2em;
  padding: 0;
  background-color: transparent;
  margin-bottom: 0.5em;
  i {
    display: inline;
    padding-right: 0.5em;
    color: ${c.DARK_ORANGE};
    font-size: 1.75em;
  }
  :hover {
    cursor: pointer;
  }
`;
