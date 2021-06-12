import "./App.css";
import WelcomePage from "./components/welcomePage/WelcomePage";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  return (
    <div>
      <WelcomePage></WelcomePage>
    </div>
  );
}

export default App;
