import { Button, TextField, Grid, IconButton } from '@material-ui/core';
import LabelIcon from "@material-ui/icons/Label";
import styled from 'styled-components';
import * as c from "../../colors/colors";
import InfoIcon from '@material-ui/icons/Info';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledInfoIcon = styled(InfoIcon)`
  margin: auto 0.5em;
  color: ${c.DARK_GREY};

  @media(width: 430px){
    margin: auto 0.2em;
  }
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  margin-right: 0.4em;
  color: ${c.GREY};
  z-index: 1;
`;

export const FormGrid = styled(Grid)`
  margin: 0 0 0 3em;
  padding-right: 3em;
  overflow: scroll;
  height: 93%;
  overflow-x: hidden;
`;
export const newItineraryContainer = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  background-color: white; 
  height: 65vh;
  width: 900px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.6);
  border-radius: 16px 16px 7px 7px;
  border-top: 16px solid ${c.DARK_BLUE};
  @media (max-width: 960px) {
    width: 90%;
  }

  
`;

export const header = styled.p`
  background-color: ${c.DARK_BLUE};
  position: relative;
  padding-left: 2em;
  padding-bottom: 3px;
  color: white;
  margin-top: -1px;
  margin-bottom: 0;
  font-size: 20px;
`;

export const inputTags = styled.h2`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: small;
    color: ${c.DARK_BLUE};

    svg {
      height: 0.75em;
      margin-left: 4px;
    }
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
  border-radius: 20px;
}
`;


export const StyledLabelIcon = styled(LabelIcon)` && {
  color: ${c.DARK_ORANGE};
  margin-right: 0.25em;
  }
`;

export const textField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#219EBC',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#219EBC',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#219EBC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#219EBC',
      },
    },
  },
})(TextField);

export const autoCompleteStyles = makeStyles((theme) => ({
  inputRoot: {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: '#219EBC'
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: '#219EBC'
    },
  }
}));

export const DateGrid = styled(Grid)`
  margin-top: 1em;
`;
export const preferencesButton = styled.button`
    line-height: 1em;
    border-radius: 15px;
    padding: 7px 15px;
    border: none;
    background-color: ${c.DARK_BLUE};
    color: ${c.WHITE};
    font-size: 1em;
    margin: 1.5em 0;

    i {
      margin: auto 0 auto 7px;
    }

    &:hover {
      cursor: pointer;
    }
`