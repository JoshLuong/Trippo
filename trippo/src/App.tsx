import "./App.css";
import ItieraryPage from "./components/itineraryPage/ItineraryPage";
import mapboxgl from "mapbox-gl";
import WelcomePage from "components/welcomePage/WelcomePage";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  return (
    <div>
      <WelcomePage></WelcomePage>
    </div>
  );
}

export default App;
