import "./App.css";
import ItineraryPage from "./components/itineraryPage/ItineraryPage";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  return (
    <div>
      <ItineraryPage></ItineraryPage>
    </div>
  );
}

export default App;
