import styled from "styled-components";

export const fancytext = styled.div`
  text-align: center;
  font-style: italic;
`;

export const containerDiv = styled.div`
  border-radius: 7px;
  position: absolute;
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(101,100,100, 0.4);
    border-radius: 20px;
  }
`;

export const calendarDiv = styled.div`
  height: 100%;
  overflow-y: none;
  margin-top: 3em;

  @media (max-width: 668px) {
    margin-top: 20%;
  }
  @media (max-width: 400px) {
    margin-top: 25%;
  }
`;
