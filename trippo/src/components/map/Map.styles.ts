import styled from "styled-components";

export const GeocoderContainer = styled.div`
  border-radius: 7px;
  z-index: 1;
  display: inline-block;
  width: 90%;
  position: relative;
  border-radius: 25px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.45);

  div {
    border-radius: inherit;
  }

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }

  > * {
    max-width: 100%;
    width: 100%;
  }
`;
