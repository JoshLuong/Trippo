import styled from "styled-components";
import * as c from "../../colors/colors";
import Button from "@material-ui/core/Button";

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
  padding: 1em 0;
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
  font-size: 2.25em;
  color: ${c.DARK_ORANGE};
  background-color: ${c.WHITE};
  z-index: 2000;
  display: flex;
  height: 750px;
  margin-top: 3em;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 560px) {
    display: none;
  }
`;

export const SideBar = styled.div`
  z-index: 1;
  height: 650px;
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
      display: inline;
      color: ${c.WHITE};
      font-size: 1.5em;
    }
  }
  button:hover {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  border-radius: 7px;
  // z-index: 1;
  display: inline-block;
  background-color: #fff;
  height: 650px;
  flex: 0 0 585px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.45);

  @media (max-width: 668px) {
    flex: 0 0 80%;
  }
`;

export const SearchContainer = styled.div`
  margin-top: 5em;
  height: 7em;
  width: 100%;
  box-shadow: 0 4.5px 4px 0 rgba(0, 0, 0, 0.4);
  text-align: center;

  input {
    &:focus {
      outline: none;
    }
  }
`;

export const ItineraryDiv = styled.div`
  bottom: 0;
  position: relative;
  display: flex;
  margin-top: 0.6em;
  height: 80%;
`;
