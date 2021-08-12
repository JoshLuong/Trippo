import styled from "styled-components";
import { BLACK } from "../../colors";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const AddButton = styled(IconButton)`
  width: 12em;
  border-radius: 10px;
  margin-bottom: 2em;
  text-transform: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.12);
  color: ${BLACK};
  font-size: 1em;
  padding: 8px;
`;

export const StyledAddIcon = styled(AddIcon)`
  margin-right: 0.25em;
  padding-left: 0;
`;
export const FooterImage = styled.div`
  z-index: -100;
  left: 0;
  bottom: 0;
  position: sticky;
  opacity: 0.85;
`;

export const SearchDiv = styled.div`
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const StyledSearchbar = styled.div`
  width: 45%;

  @media (max-width: 1000px) {
    width: 85%;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

export const ItinerariesViewGrid = styled.div`
  margin-top: 64px;
  min-height: 100%;
  left: 0;
  bottom: 0;
  position: relative;
`;

export const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Landscape = styled.div`
  height: 50%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: -2;
`;

export const Cards = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-left: 1.5em;

  @media (max-width: 400px) {
    margin-top: 1.5em;

    button {
      margin-bottom: 1.5em;
    }
  }

  @media (max-width: 1000px) {
    margin-left: 0em;
    button {
      margin-bottom: 1.25em;
      margin-left: 0em;
    }
  }
`;

export const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;
