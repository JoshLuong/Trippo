import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import { Pin } from './Marker';
import { useAppDispatch, useAppSelector } from 'app/store';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import { setHighlighted } from 'app/reducers/daySlice';
import {DARK_ORANGE} from "../../colors/colors";
import './Map.css';


// TODO ROHIT: when user clicks 'X' button on new activity pop-up, you should setSearchResult(null)
// and update the day and redux store when u send a patch to update activities
interface Props {
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  handleIsLoading: () => void;
  handleNewSlotClick: (name: string) => void;
}

const Map: FC<Props> = ({ geocoderContainerRef, handleIsLoading, handleNewSlotClick }) => {
  const mapRef: React.Ref<MapRef> = useRef(null);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(()=> {
    console.log(searchResult)
  }, [searchResult]);

  const day = useAppSelector((state) => state.day.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (day.length) {
      setViewport({
        longitude: day[0].location.lng,
        latitude: day[0].location.lat,
        zoom: 10,
        transitionDuration: 5000,
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
          <Pin className="marker" onClick={() => {
            handleNewSlotClick("TODO add name, lat, lon, etc")
            dispatch(setHighlighted(slot.id))
            }}/>
        </Marker>
      ))}
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
