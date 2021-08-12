import styled from "styled-components";

export const GeocoderContainer = styled.div`
  border-radius: 7px;
  z-index: 1;
  display: inline-block;
  width: 90%;
  position: relative;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.45);

  .mapboxgl-ctrl-geocoder .suggestions {
    z-index: 2;
  }

  div {
    border-radius: inherit;
  }

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }

  @media (max-width: 650px) {
    .mapboxgl-ctrl-geocoder {
      height: 1.75em;
      display: flex;
      align-self: center;

      input {
        height: 1.75em;
      }

      .mapboxgl-ctrl-geocoder--icon-search {
        top: 2.5px;
      }

      .mapboxgl-ctrl-geocoder--pin-right > *{
        top: 2.5px;

        svg {
          margin: 2.5px 0 0 0;
        }
      }
    }
  }

  > * {
    max-width: 100%;
    width: 100%;
  }
`;
