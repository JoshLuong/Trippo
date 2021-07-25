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
  margin: 5em 4em;
  @media(max-width: 1130px){
    margin-bottom: 1em;
    text-align: center;
    br{
      display: none;
    }
  }
  @media(max-width: 600px){
    margin: 3em 0.5em 1em 0.5em;
    padding: 2em 2em 0em 2em;
  }
  padding: 2em;
  `;

export const homeHeader = styled.h1`
  color: #ffffff;
  font-size: 48px;
  font-weight: extra bold;
  @media(max-width: 1130px){
    margin-bottom: 0;
    margin-top: 0;
  }
  @media(max-width: 600px){
    font-size: 40px;
  }
`;

export const descHeader = styled.h2`
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;

  @media(max-width: 1130px){
    margin-bottom: 0;
    margin-top: 0;
  }

  @media(max-width: 600px){
    display: none;
  }
`;

export const loginDiv = styled.div`
    text-align: center;
    position: relative;
    justify-content: center;
    border-radius: 0 0 10px 10px;
    padding: 2em;
    width: 400px;
    height: 60%;
    order: 2;
    margin: 0 4em 4em 4em;
    flex-grow: 2;

`;
