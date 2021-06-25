import styled from "styled-components";
import * as c from "../../colors/colors";

export const Container = styled.div`
  border-radius: 7px;
  z-index: 1;
  display: inline-block;
  width: 45%;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.45);

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;