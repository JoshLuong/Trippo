import "./App.css";
import { useEffect } from 'react'
import ItineraryPage from "components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import WelcomePage from "components/welcomePage/WelcomePage";
import { setUser } from 'app/reducers/userSlice';
import { useAppDispatch } from 'app/store';
import ItinerariesView from "components/itinerariesView/ItinerariesView";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/auth/current/user`, {
      method: "GET",
      credentials: 'include'
    })
    .then(status => status.json())
    .then(user => {
      console.log(user)
      user ? dispatch(setUser({isLoggedIn: true, ...user})) : dispatch(setUser({isLoggedIn: false}));
    });
  },[])
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/itinerary" component={() => <ItineraryPage />} />
        <Route exact path="/" component={() => <WelcomePage />} />
        <Route exact path="/home" component={() => <ItinerariesView />} />
      </Switch>
    </>
  );
}

export default App;
