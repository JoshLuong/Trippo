import React, { useState } from "react";
import Container from "../itineraryEdit/Container";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);

  function handleOpenItinerary() {
    setShowItinerary(!showItinerary);
  }
  // TODO: REMOVE INLINE STYLE

  // consume search, etc.
  // relative is imporant for absolute calendar
  //585px
  return (
    <div style={{ position: "relative", display: "flex", marginTop: "5em" }}>
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
      <Map />
      <div
        onClick={() => {
          if (showItinerary) handleOpenItinerary();
        }}
        style={{
          backgroundColor: "grey",
          height: "70vh",
          flex: "1",
        }}
      ></div>
    </div>
  );
}

export default ItineraryPage;
