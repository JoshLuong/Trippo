import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Marker';
import { Location } from '../../app/reducers/locationSlice';

function Map() {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 40,
    zoom: 2,
  });

  const [markers, setMarkers] = useState<Location[]>([]);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      // className doesn't work here, it styles the wrong element
      style={{ position: 'absolute', minHeight: 700 }}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={(e) => setMarkers([...markers, { lng: e.lngLat[0], lat: e.lngLat[1] }])}
    >
      {markers.map((marker, idx) => (
        <Marker key={idx} latitude={marker.lat} longitude={marker.lng} offsetLeft={-20} offsetTop={-40}>
          <Pin />
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;
