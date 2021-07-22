import React, { useRef, useState } from "react";
import "./loading.css";
import Container from "../itineraryEdit/Container";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";
import "../map/Map.css";
import { GeocoderContainer } from 'components/map/Map.styles';
import Searchbar from "components/searchBar/Searchbar";
import NewSlot from "components/itineraryEdit/NewSlot";

let destinationName: string;
let destinationAddress: string;

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);
  const geocoderContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canOpenNewSlot, setCanOpenNewSlot] = useState(false);


  function handleOpenItinerary() {
    setShowItinerary(!showItinerary);
  }

  function handleIsLoading() {
    setIsLoading(!isLoading);
  }

  function handleNewSlotClick(name: string, address: string) { // TODO addd more to here
    destinationName = name;
    destinationAddress = address;
    setCanOpenNewSlot(true);
  }

  function handleNewSlotClose() { 
    setCanOpenNewSlot(false);
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
      <sc.SearchContainer>
        <Searchbar>
          <GeocoderContainer ref={geocoderContainerRef} />
        </Searchbar>
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
        <Map
          geocoderContainerRef={geocoderContainerRef}
          handleIsLoading={handleIsLoading}
          handleNewSlotClick={handleNewSlotClick}
        />
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
        {
          canOpenNewSlot ? <NewSlot handleClose={handleNewSlotClose} destinationName={destinationName} destinationAddress={destinationAddress}/>
            : null
        }
      </div>
    </div>
  );
}

export default ItineraryPage;
