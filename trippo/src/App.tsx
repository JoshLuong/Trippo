import "./App.css";
import ItineraryPage from "components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/itineraries" component={() => <ItineraryPage />} />
      </Switch>
      <ItineraryPage></ItineraryPage>
    </div>
  );
}

export default App;
