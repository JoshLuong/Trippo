import mapboxgl from "mapbox-gl";
import "./Map.css";
import { useEffect, useRef, RefObject, FC } from 'react';
import { useAppSelector, useAppDispatch } from 'app/store';
import { setHighlighted, TimeSlot } from 'app/reducers/daySlice';

const initialMapCenter = {
  lng: 0,
  lat: 40,
  zoom: 2,
};

interface Props {
  handleIsLoading: () => void;
}

const Map: FC<Props> = ({ handleIsLoading }) => {
  const mapContainer: RefObject<HTMLDivElement> = useRef(null);
  const mapRef: RefObject<{ map?: mapboxgl.Map }> = useRef({});
  const markers: RefObject<mapboxgl.Marker[]> = useRef([]);
  const day = useAppSelector((state) => state.day.value);
  const dispatch = useAppDispatch();

  const addMarker = (timeSlot: TimeSlot) => {
    if (mapRef.current?.map) {
      const marker = new mapboxgl.Marker();
      markers.current!.push(marker);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        dispatch(setHighlighted(timeSlot.id));
      });
  
      marker.setLngLat(timeSlot.location).addTo(mapRef.current.map);
      console.log(markers.current);
    }
  };

  useEffect(() => {
    const { lng, lat, zoom } = initialMapCenter;
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    mapRef.current!.map = map;

    // map.on("click", (event) => addMarker(event.lngLat));
    map.on("load", () => {
      console.log("change");
      handleIsLoading();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clear all markers
    markers.current?.forEach((marker) => marker.remove());
    markers.current?.splice(0, markers.current.length);
    day.forEach((slot) => addMarker(slot));

    if (day.length && mapRef.current?.map) {
      mapRef.current.map.flyTo({
        center: day[0].location,
        zoom: 10,
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return (
    <div className="map-container">
      <div className="map-div" ref={mapContainer} />
    </div>
  );
};

export default Map;
