import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import Pin from './Marker';
import { useAppDispatch, useAppSelector } from 'app/store';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import { setHighlighted } from 'app/reducers/daySlice';
import axios from 'axios';
import './Map.css';
import moment from 'moment';

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
  const [placeholder, setPlaceholder] = useState('Search');


  const day = useAppSelector((state) => state.day.value);
  const dispatch = useAppDispatch();


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
      {day.map((slot) => (
        <Marker
          key={slot.id}
          latitude={slot.location.lat}
          longitude={slot.location.lng}
          // SVG width / 2
          offsetLeft={-13.415}
          // SVG height + 1px
          offsetTop={-41}
        >
         <Pin className="marker" onClick={ async () => {
            handleNewSlotClick(slot.destination!, await reverseGeocode(slot.location.lat, slot.location.lng), moment(slot.time, "dd DD-MMM-YYYY, hh:mm").format("HH:mm"))
            dispatch(setHighlighted(slot.id))
            }} />
        </Marker>
      ))}
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={setViewport}
        onResult={(e: any) => setPlaceholder(e.result.place_name) }
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ maxWidth: '100%', width: '100%' }}
        placeholder={placeholder}
        // Resets the input value after a search is made.
        // If this isn't done then Mapbox will keep loading the same query.
        inputValue=""
      />
    </ReactMapGL>
  );
};

export default Map;
