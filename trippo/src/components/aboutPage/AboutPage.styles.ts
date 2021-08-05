import styled from "styled-components";
import * as c from "../../colors/colors";

export const containerDiv = styled.div`
  display: flex;
  position: sticky;
  min-height: 100%;
  background: url(/about.jpg) no-repeat fixed center;
  background-size: cover;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


export const leftHeaderDiv = styled.div`
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  padding-bottom: 50px;
  
 
  `;

export const aboutHeader = styled.h1`
  color: #ffffff;
  left: 0;
  text-shadow: 2px 0px 7px ${c.DARK_GREY};  
  font-size: 48px;
  font-weight: extra bold;

  @media(max-width: 1130px){
    padding-top: 80px;
    margin-bottom: 0;
    margin-top: 0;
  }

  @media(max-width: 600px){
  padding-top: 80px;
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
  font-size: 22px;
  }
  a:link {
    color: white;
  }
  
  /* mouse over link */
  a:hover {
    color: blue;
  }

`;

export const rightHeaderImg = styled.div`
  width: 400px;
  height: 700px;
  background-image:url('./iphone.png');
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  @media(max-width: 600px){
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 65%;
  }
  `;

