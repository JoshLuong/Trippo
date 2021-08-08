import styled from "styled-components";

export const Container = styled.div`
  padding: 14px;
  height: 100%;
  width: calc(100vw - 2em);
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  flex-shrink: 0;
  ::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
`;

export const Day = styled.div`
  max-width: 30em;
  flex-shrink: 0;

  @media (max-width: 600px) {
    max-width: 25em;
  }
`;
