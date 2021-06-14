import styled from "styled-components";
import * as c from "../../colors/colors";

export const FooterImage = styled.div`
  z-index: -100;
  left: 0;
  bottom: 0;
  position: sticky;
  opacity: 0.85;
`;

export const ItinerariesViewGrid = styled.div`
  margin-top: 64px;
  min-height: 100%;
  background: url(palms.jpg) no-repeat fixed center;
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

  button:nth-child(1) {
    margin-right: 8em;
  }

  button {
    width: 10em;
    line-heght: 1.5em;
    border-radius: 15px;
    margin-bottom: 4em;
    padding: 7px 5px;
    border: none;
    background-color: ${c.DARK_BLUE};
    color: ${c.WHITE};
    font-size: 1.25em;
  }

  button:hover {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
    button:nth-child(1) {
      margin-right: 0em;
      margin-bottom: 2em;
    }
  }
`;