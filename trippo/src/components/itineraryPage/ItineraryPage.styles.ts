import styled from "styled-components";
import * as c from "../../colors/colors";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

export const StyledPDFDownloadLink = styled(PDFDownloadLink)`
  padding: 1em;
  color: ${c.BLACK};
`;

export const StyledTextField = styled.input`
  width: 100%;
`;

export const StyledPDFButton = styled.button`
  background: ${c.DARK_BLUE};
  height: 3em !important;
  padding-bottom: 5px !important;
  padding-top: 5px !important;
`;

export const StyledPictureAsPdfIcon = styled(PictureAsPdfIcon)`
  color: ${c.WHITE};
  padding: 1px;
  padding-left: 1.5px;
`;
export interface DisabledButtonProps {
  disabled: boolean;
}

export const fancytext = styled.div`
  text-align: center;
  font-style: italic;
`;

export const StyledButton = styled(Button)`
  span {
    color: ${c.DARK_ORANGE};
  }
`;

export const containerDiv = styled.div`
  width: 40%;
  box-sizing: border-box;
  position: relative;
  background-color: #a0c9e4;
`;

export const dayDiv = styled.div`
  height: 100%;
`;

export const StyledViewListIcon = styled.div`
  padding: 0.5em 0;
  display: flex;
  justify-content: center;
  color: ${c.WHITE};
  background-color: ${c.DARK_BLUE};
  :hover {
    cursor: pointer;
  }
`;
export const LoadingDiv = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 2.25em;
  color: ${c.DARK_ORANGE};
  background-color: ${c.WHITE};
  z-index: 1999;
  display: flex;
  height: calc(100% - 149px);
  margin-top: 64px;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 560px) {
    display: none;
  }
`;

export const SideBar = styled.div<DisabledButtonProps>`
  z-index: 1;
  height: 95%;
  margin-top: 1em;
  max-height: 720px;
  width: 2em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  button {
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: ${c.DARK_BLUE};
    i {
      padding-top: 100%;
      display: inline;
      color: ${c.WHITE};
      font-size: 1.5em;
    }
  }
  button:hover {
    cursor: ${(props) => (props.disabled ? `not-allowed` : `pointer`)};
  }

  @media (max-width: 668px) {
    height: 90%;
  }
`;

export const Container = styled.div`
  border-radius: 7px;
  // z-index: 1;
  display: inline-block;
  background-color: #fff;
  height: 95%;
  margin-top: 1em;
  max-height: 720px;
  flex: 0 0 585px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.45);

  @media (max-width: 668px) {
    flex: 0 0 80%;
    height: 90%;
  }
`;

export const SearchContainer = styled.div`
  z-index: 2000;
  height: 85px;
  width: 100%;
  text-align: center;
  background: transparent;
  display: flex;
  justify-content: center;

  input {
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 650px) {
    height: 65px;
  }
`;

export const ItineraryDiv = styled.div`
  bottom: 0;
  position: relative;
  display: flex;
  overflow-x: hidden;
  height: calc(100% - 85px);
  min-height: 80vh;
  @media (max-width: 650px) {
    height: calc(100% - 65px);
  }
`;

export const ItineraryPage = styled.div`
  height: calc(100% - 64px);
  margin-top: 64px;
`;
