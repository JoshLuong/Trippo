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
import { DARK_ORANGE } from "../../colors";
import { Pin } from "./Marker";
import { getIconColor } from "../icons";
import {
  ContextInterface,
  ItineraryContext,
} from "../itineraryPage/ItineraryPage";
import { useHistory } from "react-router-dom";
import "./Map.css";
import { ActivityPopup } from "types/models";
import { useAppSelector } from "app/store";

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
    { method: "GET" }
  )
    .then((res: any) => res.json())
    .then((data: any) => (address = data.features[0].place_name));
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
    { method: "GET" }
  )
    .then((res: any) => res.json())
    .then((data: any) => (name = data.features[0].text));
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
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });

  const history = useHistory();
  const IS_SHARED = history.location.pathname.includes("/shared");
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

  const handleViewportChange = (viewport: any) => {
    setViewport({ ...viewport, zoom: 11, pitch: 30 });
  };

  useEffect(() => {
    if (itinerary) {
      const longitude =
        window.innerWidth <= 700 || IS_SHARED
          ? itinerary.dest_coords.lng
          : itinerary.dest_coords.lng - 0.2;
      setViewport({
        longitude: !isFirstLoad ? viewport.longitude : longitude,
        latitude: !isFirstLoad
          ? viewport.latitude
          : itinerary.dest_coords.lat - 0.1,
        zoom: 10,
        transitionDuration: 400,
        pitch: 30,
        transitionInterpolator: new FlyToInterpolator(),
      });
      if (isFirstLoad) setIsFirstLoad(false);
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
      style={{ position: "absolute" }}
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
              className="marker pointer"
              onClick={() => {
                itineraryContext?.handleSetActivityPopups(slot);
              }}
              fill={
                moment(itineraryContext?.activeDay).format("MMM Do YYYY") ===
                moment(new Date(slot.time)).format("MMM Do YYYY")
                  ? getIconColor(slot.type, "0.95")
                  : getIconColor(slot.type, "0.25")
              }
            />
          </Marker>
        );
      })}
      {itinerary?.activities &&
        itineraryContext?.activityPopups.map((activityPopup: ActivityPopup) => (
          <Popup
            key={activityPopup._id}
            latitude={activityPopup.location.lat}
            longitude={activityPopup.location.lng}
            closeButton={false}
            offsetTop={-47}
            anchor="bottom"
          >
            <div>{activityPopup.destination}</div>
            <div>{new Date(activityPopup.time!).toDateString()}</div>
            <div>
              {moment(new Date(activityPopup.time!), "hh:mm A").format(
                "hh:mm A"
              )}
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
            className={`marker ${IS_SHARED ? `disable` : `pointer`}`}
            onClick={async () => {
              if (!IS_SHARED) {
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
              }
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
