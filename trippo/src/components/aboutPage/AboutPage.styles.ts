import styled from "styled-components";
import * as c from "../../colors/colors";

export const containerDiv = styled.div`
  display: flex;
  position: sticky;
  min-height: 100%;
  background: url(/about.jpg) no-repeat fixed center;
  background-size: cover;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


export const leftHeaderDiv = styled.div`
  top: 10em;
  position: absolute; 
  width: 50%;
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

export const aboutHeader = styled.h1`
  color: #ffffff;
  left: 0;
  text-shadow: 2px 0px 7px ${c.DARK_GREY};  
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

export const Divider = styled.div`
  height: 0.35em;
`;

export const descHeader = styled.h2`
  color: #ffffff;
  text-shadow: 1px 0px 6px ${c.DARK_GREY};  
  font-size: 26px;
  font-weight: normal;

  @media(max-width: 1130px){
    margin-bottom: 0;
    margin-top: 0;
  }

  @media(max-width: 600px){
    display: none;
  }
  a:link {
    color: white;
  }
  
  /* mouse over link */
  a:hover {
    color: blue;
  }

`;

export const rightHeaderDiv = styled.div`
  top: 10em;
  position: absolute; 
  right: 0;
  width: 50%;
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

