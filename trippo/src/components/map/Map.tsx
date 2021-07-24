import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker, Popup } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import { Pin } from './Marker';
import { useAppDispatch, useAppSelector } from 'app/store';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import axios from 'axios';
import { setHighlighted, TimeSlot } from 'app/reducers/daySlice';
import {DARK_ORANGE} from "../../colors/colors";
import './Map.css';
import moment from 'moment';


// TODO ROHIT: when user clicks 'X' button on new activity pop-up, you should setSearchResult(null)
// and update the day and redux store when u send a patch to update activities
interface Props {
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  handleIsLoading: () => void;
  handleNewSlotClick: (name: string, address: string, time: any) => void;
}

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const reverseGeocode = async (lat: number, lng: number) => {
  //the service call returns place at the coordinates passed.
  let address = await axios.get(MAPBOX_API_URL + lng + ',' + lat + '.json?access_token='+ process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
  let exactAddress = address.data.features[0].place_name;
  return exactAddress;
}

const Map: FC<Props> = ({ geocoderContainerRef, handleIsLoading, handleNewSlotClick }) => {
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });


  const day = useAppSelector((state) => state.day.value);
  const dispatch = useAppDispatch();

  const [searchResult, setSearchResult] = useState<any>(null);
  const [activityPopup, setActivityPopup] = useState<number[]>([]);

  useEffect(() => {
    if (day.length) {
      setViewport({
        longitude: day[0].location.lng,
        latitude: day[0].location.lat,
        zoom: 10,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

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
      {day.map((slot, index) => (
        <Marker
          key={slot.id}
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
            const newActivitiyPopup: number[] = filteredArray.length === arrSize ? [...activityPopup, index] : filteredArray;
            setActivityPopup(newActivitiyPopup);
            dispatch(setHighlighted(slot.id))
            }}/>
        </Marker>
      ))}
      {
        activityPopup.map( popupIndex => (
          <Popup
            key={popupIndex}
            latitude={day[popupIndex].location.lat}
            longitude={day[popupIndex].location.lng}
            closeButton={false}
            offsetTop={-47}
            anchor="bottom" 
          >
            <div>Update here with proper destination name and time</div>
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
          <Pin className="marker" onClick={() => {
            alert("TODO")
            }} fill={DARK_ORANGE} />
        </Marker>
        ) : null
      }
      <Geocoder
        mapRef={mapRef}
        zoom={11}
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
