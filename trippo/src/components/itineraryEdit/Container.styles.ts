import styled from "styled-components";

export const fancytext = styled.div`
  text-align: center;
  font-style: italic;
`;

export const containerDiv = styled.div`
  border-radius: 0 10px 10px 0;
  position: absolute;
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  overflow-x: hidden;
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
