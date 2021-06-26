import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import Pin from './Marker';
import { useAppDispatch, useAppSelector } from 'app/store';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import { setHighlighted } from 'app/reducers/daySlice';
import './Map.css';

interface Props {
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  handleIsLoading: () => void;
}

const Map: FC<Props> = ({ geocoderContainerRef, handleIsLoading }) => {
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
      style={{ position: 'absolute', minHeight: 700 }}
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
          <Pin className="marker" onClick={() => dispatch(setHighlighted(slot.id))} />
        </Marker>
      ))}
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={setViewport}
        onResult={(e: any) => setPlaceholder(e.result.place_name)}
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
