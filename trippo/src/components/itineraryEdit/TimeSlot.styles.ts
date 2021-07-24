import styled, { css } from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { TextField, FormControl } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
const darkGrey = c.GREY;
export interface StyledTimeSlotProps{
  showSuggestions: boolean
  borderColor: string
}

export const StyledIconButton = styled(IconButton)`
  width: 24px !important;
  height: 24px !important;
`;

export const Slot = styled.div<StyledTimeSlotProps>`
  margin-top: 0.5em;
  border-radius: 0px 7px 7px 0px;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.25em;
  border-left: 8px solid ${props => !props.showSuggestions ? props.borderColor : c.DARK_ORANGE};
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
  width: 7.5em;
  padding-bottom: 0.5em;
  padding-left: 4px;

  div:before, div:after{
    content: none;
  }

  .MuiInput-root {
    font-size: 1em;
    letter-spacing: 0px;
  }

  .MuiInputBase-root.Mui-disabled {
    color: inherit;
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

export const Cost = styled.div`
  font-weight: 500;
  float: right;
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  div {
    margin-right: 0.5em;
  }

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
export const StyledFormControl = styled(FormControl)`
  input {
    padding: 0;
    font-size: 0.75em;
  }
  .MuiTypography-body1 {
    font-size: 0.75em;
    margin-right: -6px;
  }

  .MuiInput-underline, .MuiInput-underline:before, .MuiInput-underline:after {
    transition: none;
    border-bottom: 0 !important;
    margin-right: 0;
  }
`;
export const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: `${c.DARK_GREY}`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: `${c.DARK_GREY}`,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${c.DARK_GREY}`,
      },
      '&.Mui-focused fieldset': {
        borderColor: `${c.DARK_GREY}`,
      },
    },
    '& .Mui-disabled .Mui-disabled': {
      opacity: '10',
      color: 'initial',
      fontSize: '0.85em'
    }
  },
})(TextField);
