import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid, IconButton } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LabelIcon from "@material-ui/icons/Label";
import Button from "@material-ui/core/Button";

export const StyledButton = styled(Button)`
  span {
    color: ${c.DARK_ORANGE};
  }
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  width: 16px;
  height: 16px;
  margin: 0.4em;
  color: ${c.GREY};
`;

export const Card = styled.div`
  background-color: white;
  margin: auto;
  position: relative;
  margin-bottom: 7em;
  min-height: 14em;
  width: 705px;
  box-shadow: 0 4.5px 4px 0 rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  border-top: 16px solid ${(props) => props.color};
  &:hover {
    transform: scale(1.025);
  }
  padding-left: 2em;
  padding-right: 2.75em;
  padding-bottom: 2em;

  @media (max-width: 960px) {
    width: 70%;
  }
`;

export const StyledLabelIcon = styled(LabelIcon)`
  color: ${c.DARK_ORANGE};
  margin-right: 0.25em;
`;

export const TripName = styled.a`
  display: block;
  margin-right: auto;
  color: ${c.DARK_BLUE};
  font-weight: 600;
  font-size: 1.75em;
  margin-bottom: 0.35em;
  overflow: hidden;
`;

export const StyledPeopleIcon = styled(PeopleIcon)`
  margin-right: 0.25em;
  color: ${c.GREY};
`;

export const CommentGrid = styled(Grid)`
  margin-top: 2em;
`;

export const Collaborators = styled.div`
  color: ${c.BLACK};
  width: 100%;
  font-size: 1.25em;
  font-weight: 300;
  display: flex;
  justify-content: flex-start;
`;

export const LabelDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 0.5em;
`;

export const LabelGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 1em;

  svg {
    padding-bottom: 5px;
  }
`;

export const NameGrid = styled(Grid)`
  margin-top: 1em;
`;

export const DateGrid = styled(Grid)`
  margin-top: 1em;
  i {
    @media (min-width: 1278px) {
      margin-left: auto;
    }
    color: ${c.DARK_ORANGE};
    margin-top: 0.2em;
    margin-right: 0.35em;
  }
`;

export const EditGrid = styled(Grid)`
  justify-content: center;
`;

export const EditButton = styled.button`
  border: none;
  margin-top: 0.5em;
  height: 2em;
  width: 2em;
  padding: 0;
  background-color: transparent;
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
