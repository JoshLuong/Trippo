import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { TextField, FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const darkGrey = c.GREY;
const disabledBorder = "border-right: 0px;";

export interface StyledTimeSlotProps {
  showSuggestions: boolean;
  borderColor: string;
}

export interface StyledCardSize {
  small: boolean;
}

export const StyledIconButton = styled(IconButton)`
  width: 24px !important;
  height: 24px !important;
  margin-top: -6px;
`;

export const AddressSpan = styled.span`
  font-weight: 100;
  font-size: 0.85em;
  margin-bottom: 0.45em;
  margin-top: 0.35em;
`;

export const Slot = styled.div<StyledTimeSlotProps>`
  border-radius: 0px 7px 7px 0px;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.25em;
  border-left: 8px solid
    ${(props) => (!props.showSuggestions ? props.borderColor : c.DARK_ORANGE)};
  padding-right: 0.25em;
  background-color: #fff;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.4);
  position: relative;
  &:hover {
    transform: scale(1.025);
  }
`;
export const Time = styled.div<StyledCardSize>`
  color: ${c.BLACK};
  border-right: 1.5px solid ${c.DARK_GREY};
  width: 7.5em;
  padding-bottom: 0.5em;
  padding-left: 4px;

  div:before,
  div:after {
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
    ${disabledBorder}
  }
  ${({ small }) =>
    small &&
    `
    ${disabledBorder}
  `}
`;

export const SlotGrid = styled(Grid)<StyledCardSize>`
  @media (max-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  ${({ small }) =>
    small &&
    `
  padding-left: 10px;
  padding-right: 10px;
`}
`;

export const Destination = styled.div`
  color: ${c.BLACK};
  display: flex;
  justify-content: space-around;
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

export const CostGrid = styled(Grid)`
  @media (max-width: 600px) {
    top: 0.75em;
    right: 12px;
    position: absolute;
  }
`;

export const DestinationSpan = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const IconGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

export const Cost = styled.div`
  font-weight: 500;
  float: right;
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;

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

export const Comments = styled.ul<StyledCardSize>`
  margin-top: 0.25em;
  margin-right: 1.5em;
  color: ${c.BLACK};
  width: 100%;
  list-style: none;
  padding-left: 0.5em;
  @media (max-width: 960px) {
    margin-left: 1em;
  }

  @media (max-width: 600px) {
    margin: 0.4em 0;
    padding: 0;
  }

  ${({ small }) =>
    small &&
    `
  margin-left: 1em;
`}
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

export const HeaderGrid = styled(Grid)`
  align-items: flex-start;
`;
export const StyledFormControl = styled(FormControl)`
  padding-left: 2px;
  input {
    padding: 0;
    font-size: 0.75em;
  }
  .MuiTypography-body1 {
    font-size: 0.75em;
    margin-right: -6px;
  }

  .MuiInput-underline,
  .MuiInput-underline:before,
  .MuiInput-underline:after {
    transition: none;
    border-bottom: 0 !important;
    margin-right: 0;
  }
`;
export const StyledTextField = withStyles({
  root: {
    "& label": {
      paddingRight: `7px`,
      backgroundColor: "white",
    },
    "& label.Mui-focused": {
      color: `${c.DARK_GREY}`,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: `${c.DARK_GREY}`,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${c.DARK_GREY}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${c.DARK_GREY}`,
      },
    },
    "& .Mui-disabled .Mui-disabled": {
      opacity: "10",
      color: "initial",
    },
    "& .MuiInputBase-formControl": {
      opacity: "10",
      color: "initial",
      fontSize: "0.90em",
    },
  },
})(TextField);
