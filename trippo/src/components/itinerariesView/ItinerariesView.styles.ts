import styled from "styled-components";
import * as c from "../../colors/colors";

export const FooterImage = styled.div`
  z-index: -100;
  left: 0;
  bottom: 0;
  position: sticky;
  opacity: 0.85;
`;

export const SearchDiv = styled.div`
  height: 7em;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0 4.5px 4px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
`;

export const ItinerariesViewGrid = styled.div`
  margin-top: 64px;
  min-height: 100%;
  background: url(/palms.jpg) no-repeat fixed center;
  background-size: cover;
  background-position: 0px 400px;
  left: 0;
  bottom: 0;
  position: sticky;
`;

export const Cards = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3em;

  button {
    width: 10em;
    line-heght: 1.5em;
    border-radius: 15px;
    margin-bottom: 2em;
    padding: 7px 5px;
    border: none;
    background-color: ${c.DARK_BLUE};
    color: ${c.WHITE};
    font-size: 1.25em;
  }

  button:hover {
    cursor: pointer;
  }

  }
`;

export const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;
