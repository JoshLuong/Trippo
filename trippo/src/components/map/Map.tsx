import { FC, useEffect, useRef, useState, useContext } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  MapRef,
  Marker,
  Popup,
} from "react-map-gl";
// @ts-ignore No type declaration for this package
import Geocoder from "react-map-gl-geocoder";
import moment from "moment";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";
// import { setHighlighted, TimeSlot } from 'app/reducers/daySlice';
import { DARK_ORANGE } from "../../colors/colors";
import { Pin } from "./Marker";
import * as t from "app/destinations/destinationTypes";
import {
  ContextInterface,
  ItineraryContext,
} from "../itineraryPage/ItineraryPage";
import "./Map.css";
import { useAppSelector } from 'app/store';

interface Props {
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  searchResult: any;
  setSearchResult: any;
  handleIsLoading: () => void;
  handleNewSlotClick: (
    name: string,
    address: string,
    lat: number,
    lng: number
  ) => void;
}

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const reverseGeocodeAddress = async (lat: number, lng: number) => {
  //the service call returns place at the coordinates passed.
  let address: any;
  await fetch(
    MAPBOX_API_URL +
      lng +
      "," +
      lat +
      ".json?access_token=" +
      process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      {method: "GET",
    }
  ).then((res: any) => res.json())
  .then((data: any) => address = data.features[0].place_name);
  // let exactAddress = address.data.features[0].place_name;
  return address;
};

const reverseGeocodeName = async (lat: number, lng: number) => {
  //the service call returns place at the coordinates passed.
  let name: any;
  await fetch(
    MAPBOX_API_URL +
      lng +
      "," +
      lat +
      ".json?access_token=" +
      process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      {method: "GET",
    }
  ).then((res: any) => res.json())
  .then((data: any) => name = data.features[0].text);
  return name;
};

const Map: FC<Props> = ({
  geocoderContainerRef,
  handleIsLoading,
  handleNewSlotClick,
  searchResult,
  setSearchResult,
}) => {
  const itineraryContext = useContext<ContextInterface>(ItineraryContext);
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });

  const itinerary = useAppSelector((state) => state.itinerary.value);

  const bbox =
    viewport.longitude && viewport.latitude
      ? [
          viewport.longitude - 1,
          viewport.latitude - 1,
          viewport.longitude + 1,
          viewport.latitude + 1,
        ]
      : [];

  const [activityPopup, setActivityPopup] = useState<number[]>([]);

  const handleViewportChange = (viewport: any) => {
    setViewport({ ...viewport, pitch: 30 });
  };

  useEffect(() => {
    if (data) {
      const longitude = window.innerWidth <= 700 ? data.dest_coords.lng : data.dest_coords.lng - 0.2;
      setViewport({
        longitude: longitude,
        latitude: data.dest_coords.lat - 0.1,
        zoom: 10,
        transitionDuration: 300,
        pitch: 30,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary]);

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width="100%"
      height="100%"
      // className doesn't work here, it styles the wrong element
      style={{ position: "absolute", minHeight: "80vh" }}
      onViewportChange={setViewport}
      onLoad={handleIsLoading}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {itinerary?.activities.map((slot, index) => {
        return (
        <Marker
          key={slot._id}
          latitude={slot.location.lat}
          longitude={slot.location.lng}
          // SVG width / 2
          offsetLeft={-13.415}
          // SVG height + 1px
          offsetTop={-41}
        >
          <Pin
            className="marker"
            onClick={() => {
              const arrSize = activityPopup.length;
              const filteredArray = activityPopup.filter((a) => a !== index);
              const newActivityPopup: number[] =
                filteredArray.length === arrSize
                  ? [...activityPopup, index]
                  : filteredArray;
              setActivityPopup(newActivityPopup);
              // dispatch(setHighlighted(slot.id))
            }}
            fill={
              moment(itineraryContext?.activeDay).format("MMM Do YYYY") ===
              moment(new Date(slot.time)).format("MMM Do YYYY")
                ? t.getIconColor(slot.type, "0.95")
                : t.getIconColor(slot.type, "0.25")
            }
          />
        </Marker>
      )})}
      {itinerary?.activities &&
        activityPopup.map((popupIndex) => (
          <Popup
            key={popupIndex}
            latitude={itinerary?.activities[popupIndex].location.lat}
            longitude={itinerary?.activities[popupIndex].location.lng}
            closeButton={false}
            offsetTop={-47}
            anchor="bottom"
          >
            <div>{itinerary?.activities[popupIndex].destination}</div>
            <div>
              {new Date(itinerary?.activities[popupIndex].time!).toDateString()}
            </div>
            <div>
              {moment(
                new Date(itinerary?.activities[popupIndex].time!),
                "hh:mm A"
              ).format("hh:mm A")}
            </div>
          </Popup>
        ))}
      {searchResult ? (
        <Marker
          latitude={searchResult.geometry.coordinates[1]}
          longitude={searchResult.geometry.coordinates[0]}
          // SVG width / 2
          offsetLeft={-13.415}
          // SVG height + 1px
          offsetTop={-41}
        >
          <Pin
            className="marker"
            onClick={async () => {
              handleNewSlotClick(
                await reverseGeocodeName(
                  searchResult.geometry.coordinates[1],
                  searchResult.geometry.coordinates[0]
                ),
                await reverseGeocodeAddress(
                  searchResult.geometry.coordinates[1],
                  searchResult.geometry.coordinates[0]
                ),
                searchResult.geometry.coordinates[1],
                searchResult.geometry.coordinates[0]
              );
            }}
            fill={DARK_ORANGE}
          />
        </Marker>
      ) : null}
      <Geocoder
        mapRef={mapRef}
        bbox={bbox}
        containerRef={geocoderContainerRef}
        onViewportChange={handleViewportChange}
        onResult={(e: any) => setSearchResult(e.result)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClear={() => setSearchResult(null)}
        style={{ maxWidth: "100%", width: "100%" }}
        placeholder={searchResult?.place_name || "Search"}
        // Resets the input value after a search is made.
        // If this isn't done then Mapbox will keep loading the same query.
        inputValue=""
      />
    </ReactMapGL>
  );
};

export default Map;
