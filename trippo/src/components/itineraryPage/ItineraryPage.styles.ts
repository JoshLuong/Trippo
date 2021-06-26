import styled from "styled-components";
import * as c from "../../colors/colors";

export const fancytext = styled.div`
  text-align: center;
  font-style: italic;
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

export const LoadingDiv = styled.div`
  position: absolute;
  font-size: 2.25em;
  color: ${c.DARK_ORANGE};
  background-color: ${c.WHITE};
  z-index: 2000;
  display: flex;
  height: 715px;
  margin-top: 3em;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 960px) {
    font-size: 1.5em;
  }
`;

export const SideBar = styled.div`
  z-index: 1;
  height: 650px;
  background-color: ${c.DARK_BLUE};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.45);
  button {
    border: none;
    height: 100%;
    padding: 0;
    padding-left: 0.65em;
    background-color: transparent;
    i {
      display: inline;
      color: ${c.WHITE};
      font-size: 1.75em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5em;
  height: 7em;
  width: 100%;
  box-shadow: 0 4.5px 4px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
`;
