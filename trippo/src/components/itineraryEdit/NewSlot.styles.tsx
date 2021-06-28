import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

export const Cancel = styled(CancelIcon)`
    right: 0;
`;

export const NewSlot = styled(Grid)`
  border-radius: 0 10px 10px 0;
  width: 40%;
  height: 20em;
  background: #fff;
  position: fixed;
  color: ${c.BLACK};
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  z-index: 1;
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
