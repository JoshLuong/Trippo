import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import Pin from './Marker';
// import { useAppDispatch, useAppSelector } from 'app/store';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
// import { setHighlighted } from 'app/reducers/daySlice';
import './Map.css';
import { useGetItineraryByIdQuery } from 'services/itinerary';
import { useParams } from 'react-router-dom';

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
  const [placeholder, setPlaceholder] = useState('Search');
  const { id } = useParams<{ id: string }>();
  const { data } = useGetItineraryByIdQuery(id);

  useEffect(() => {
    if (data) {
      setViewport({
        longitude: data.dest_coords.lng,
        latitude: data.dest_coords.lat,
        zoom: 10,
        transitionDuration: 5000,
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
      {data?.activities.map((slot) => (
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
            handleNewSlotClick("TODO add name, lat, lon, etc")
            // dispatch(setHighlighted(slot.id))
            }} />
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
