import styled from "styled-components";
import * as c from "../../colors/colors"

export const containerDiv = styled.div`
  display: flex;
  position: sticky;
  min-height: 100%;
  background: url(welcome.png) no-repeat fixed center;
  background-size: cover;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


export const headerDiv = styled.div`
  top: 10em;
  right: 0;
  order: 1;
  flex-grow: 1;
  flex-shrink:80%;
  flex-basis: 40%;
  margin-left: 4em;
  margin-right: 4em;
  margin-top: 5em;
  margin-bottom: 5em;
  padding: 2em;
  `;

export const homeHeader = styled.h1`
  font: Lato;
  color: #ffffff;
  font-size: 48px;
  font-weight: extra bold;

  @media(max-width: 600){
    font-size: 8px;
  }
`;

export const descHeader = styled.h2`
  font: Lato;
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  @media(max-width: 600){
    font-size: 6px;
  }
`;

export const loginDiv = styled.div`
    text-align: center;
    border-radius: 10px;
    background-color: white;
    border-top: 10px solid ${c.DARK_BLUE};
    padding-bottom: 2em;
    max-width: 500px;
    min-height: 400px;
    height: 60%;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    order: 2;
    margin-left: 4em;
    margin-right: 4em;
    margin-bottom: 4em;
    flex-grow: 2;
    flex-shrink: 80%;
    flex-basis: 40%;

`;
