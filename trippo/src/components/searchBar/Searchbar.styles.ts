import styled from "styled-components";
import * as c from "../../colors/colors";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Container = styled.div`
  border-radius: 7px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  position: relative;
  @media (max-width: 1030px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const PaperContainer = styled.div`
  border-radius: 7px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const RootContainer = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.4);
  height: 3em;
  width: 100%;
`;

export const InputContainer = styled(InputBase)`
  margin-left: 0.5em;
  flex: 1;
  padding: 6px 0 6px 5px;
  border-width: 1px;
  border-color: c.BLACK;
  color: ${c.BLACK} !important;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 10;
  color: ${c.DARK_BLUE} !important;
`;
