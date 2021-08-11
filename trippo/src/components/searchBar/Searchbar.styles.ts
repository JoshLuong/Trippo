import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Container = styled.div`
  border-radius: 7px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  position: relative;
  @media (max-width: 1030px) {
    width: 60%;
    height: 50%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const PaperContainer = styled.div`
  border-radius: 7px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;
