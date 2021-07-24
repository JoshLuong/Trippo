import { FC, useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, MapRef, Marker, Popup } from 'react-map-gl';
// @ts-ignore No type declaration for this package
import Geocoder from 'react-map-gl-geocoder';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
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

  const { id } = useParams<{ id: string }>();
  const { data } = useGetItineraryByIdQuery(id);

  const [searchResult, setSearchResult] = useState<any>(null);
  const [activityPopup, setActivityPopup] = useState<number[]>([]);

  useEffect(() => {
    if (data?.activities.length) {
      setViewport({
        longitude: data.activities[0].location.lng,
        latitude: data.activities[0].location.lat,
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
            const newActivitiyPopup: number[] = filteredArray.length === arrSize ? [...activityPopup, index] : filteredArray;
            setActivityPopup(newActivitiyPopup);
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
