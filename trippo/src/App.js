import "./App.css";
import ItineraryPage from "./components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact from="/" render={props => <ItineraryPage {...props} />} />
        <Route exact from="/itineraries" render={props => <ItineraryPage {...props} />} />
        {/* <Route exact from="/login" render={props => <Home {...props} />} />
        <Route exact from="/newItinerary" render={props => <Home {...props} />} /> */}
      </Switch>
      <ItineraryPage></ItineraryPage>
    </div>
  );
}

export default App;
