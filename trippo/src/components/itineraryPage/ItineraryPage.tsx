import React, { useRef, useState } from "react";
import Container from "../itineraryEdit/Container";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";
import "../map/Map.css";
import { GeocoderContainer } from 'components/map/Map.styles';

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);
  const geocoderContainerRef = useRef(null);

  function handleOpenItinerary() {
    setShowItinerary(!showItinerary);
  }
  // TODO: REMOVE INLINE STYLE

  // consume search, etc.
  // relative is imporant for absolute calendar
  //585px
  return (
    <>
      <sc.SearchContainer>
        <GeocoderContainer ref={geocoderContainerRef} />
      </sc.SearchContainer>
      <div
        style={{
          bottom: "0",
          position: "relative",
          display: "flex",
          marginTop: "0.6em",
          height: "80%",
        }}
      >
        <Map geocoderContainerRef={geocoderContainerRef} />
        <sc.SideBar style={{ width: "2em" }}>
          <button onClick={handleOpenItinerary}>
            {showItinerary ? (
              <i className="fas fa-chevron-left"></i>
            ) : (
              <i className="fas fa-chevron-right"></i>
            )}
          </button>
        </sc.SideBar>
        {showItinerary ? (
          <sc.Container>
            <Container></Container>
          </sc.Container>
        ) : null}
      </div>
    </>
  );
}

export default ItineraryPage;
