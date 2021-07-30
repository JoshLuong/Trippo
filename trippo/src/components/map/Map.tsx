import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker, Popup } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import moment from "moment";
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import axios from 'axios';
// import { setHighlighted, TimeSlot } from 'app/reducers/daySlice';
import {DARK_ORANGE} from "../../colors/colors";
import { Pin } from './Marker';
// import { useAppDispatch, useAppSelector } from 'app/store';
import './Map.css';
import { useGetItineraryByIdQuery } from 'services/itinerary';
import { useParams } from 'react-router-dom';


// TODO ROHIT: when user clicks 'X' button on new activity pop-up, you should setSearchResult(null)
// and update the day and redux store when u send a patch to update activities
interface Props {
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  searchResult: any;
  setSearchResult: any;
  handleIsLoading: () => void;
  handleNewSlotClick: (name: string, address: string, lat: number, lng: number) => void;
}

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const reverseGeocodeAddress = async (lat: number, lng: number) => {
  //the service call returns place at the coordinates passed.
  let address = await axios.get(MAPBOX_API_URL + lng + ',' + lat + '.json?access_token='+ process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
  let exactAddress = address.data.features[0].place_name;
  return exactAddress;
}

const reverseGeocodeName = async (lat: number, lng: number) => {
  //the service call returns place at the coordinates passed.
  let address = await axios.get(MAPBOX_API_URL + lng + ',' + lat + '.json?access_token='+ process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
  let exactName = address.data.features[0].text;
  return exactName;
}

const Map: FC<Props> = ({ geocoderContainerRef, handleIsLoading, handleNewSlotClick, searchResult, setSearchResult }) => {
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });

  const { id } = useParams<{ id: string }>();
  const { data } = useGetItineraryByIdQuery(id);

  const bbox = viewport.longitude && viewport.latitude ? [viewport.longitude - 1, viewport.latitude - 1, viewport.longitude + 1, viewport.latitude + 1] : [];

  const [activityPopup, setActivityPopup] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setViewport({
        longitude: data.dest_coords.lng,
        latitude: data.dest_coords.lat - 0.1,
        zoom: 10,
        transitionDuration: 700,
        pitch: 30,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width="100%"
      height="100%"
      // className doesn't work here, it styles the wrong element
      style={{ position: 'absolute', minHeight: "80vh" }}
      onViewportChange={setViewport}
      onLoad={handleIsLoading}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {data?.activities.map((slot, index) => (
        <Marker
          key={slot._id}
          latitude={slot.location.lat}
          longitude={slot.location.lng}
          // SVG width / 2
          offsetLeft={-13.415}
          // SVG height + 1px
          offsetTop={-41}
        >
          <Pin className="marker" onClick={() => {
            const arrSize = activityPopup.length;
            const filteredArray = activityPopup.filter((a) => a !== index);
            const newActivityPopup: number[] = filteredArray.length === arrSize ? [...activityPopup, index] : filteredArray;
            setActivityPopup(newActivityPopup);
            // dispatch(setHighlighted(slot.id))
          }}
          />
        </Marker>
      ))}
      { data?.activities &&
        activityPopup.map(popupIndex => (
          <Popup
            key={popupIndex}
            latitude={data?.activities[popupIndex].location.lat}
            longitude={data?.activities[popupIndex].location.lng}
            closeButton={false}
            offsetTop={-47}
            anchor="bottom"
          >
              <div>{data?.activities[popupIndex].destination}</div>
              <div>{new Date(data?.activities[popupIndex].time!).toDateString()}</div>
              <div>{moment(new Date(data?.activities[popupIndex].time!), "hh:mm A").format("hh:mm A")}</div>
          </Popup>
        ))
      }
      {
        searchResult ? (
        <Marker
          latitude={searchResult.geometry.coordinates[1]}
          longitude={searchResult.geometry.coordinates[0]}
          // SVG width / 2
          offsetLeft={-13.415}
          // SVG height + 1px
          offsetTop={-41}
        >
          <Pin className="marker" onClick={async () => {
            handleNewSlotClick(await reverseGeocodeName(searchResult.geometry.coordinates[1], searchResult.geometry.coordinates[0]), 
            await reverseGeocodeAddress(searchResult.geometry.coordinates[1], searchResult.geometry.coordinates[0]),
            searchResult.geometry.coordinates[1],
            searchResult.geometry.coordinates[0])
            }} fill={DARK_ORANGE} />
        </Marker>
        ) : null
      }
      <Geocoder
        mapRef={mapRef}
        zoom={10}
        bbox={bbox}
        containerRef={geocoderContainerRef}
        onViewportChange={setViewport}
        onResult={(e: any) => setSearchResult(e.result)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClear={() => setSearchResult(null)}
        style={{ maxWidth: '100%', width: '100%' }}
        placeholder={searchResult?.place_name || 'Search'}
        // Resets the input value after a search is made.
        // If this isn't done then Mapbox will keep loading the same query.
        inputValue=""
      />
    </ReactMapGL>
  );
};

export default Map;
