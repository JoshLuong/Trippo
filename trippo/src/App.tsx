import "./App.css";
import ItineraryPage from "components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import WelcomePage from "components/welcomePage/WelcomePage";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/itineraries" component={() => <ItineraryPage />} />
        <Route exact path="/" component={() => <WelcomePage />} />
      </Switch>
    </div>
  );
}

export default App;
