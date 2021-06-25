import { useState } from "react";
import "./loading.css";
import Container from "../itineraryEdit/Container";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  function handleOpenItinerary() {
    setShowItinerary(!showItinerary);
  }

  function handleIsLoading() {
    setIsLoading(!isLoading);
  }
  // TODO: REMOVE INLINE STYLE

  // consume search, etc.
  // relative is imporant for absolute calendar
  //585px

  return (
    <div>
      {isLoading ? (
        <sc.LoadingDiv>
          <div className="loader"></div>
          trippo is getting your itinerary ready...
        </sc.LoadingDiv>
      ) : null}
      <div
        style={{
          marginTop: "5em",
          height: "7em",
          width: "100%",
          boxShadow: "0 4.5px 4px 0 rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        search placeholder
      </div>
      <div
        style={{
          bottom: "0",
          position: "relative",
          display: "flex",
          marginTop: "0.6em",
          height: "80%",
        }}
      >
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
        <Map handleIsLoading={handleIsLoading} />
      </div>
    </div>
  );
}

export default ItineraryPage;
