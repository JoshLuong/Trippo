import React from "react";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import ItineraryPage from "../itineraryPage/ItineraryPage";
// import Drawer from 'react-motion-drawer';
import "./navstyle.css";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default function Navbar() {
  return (
    <div>
    <BrowserRouter>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/itineraries">My Itineraries</Link>
          </li>
          <li>
            <Link to="/newItinerary">New Itinerary</Link>
          </li>
        </ul>
      </nav>
{/* 
    <Drawer open={false} onChange={onChange}>
    <ul>
      <li>Home</li>
      <li>My Itineraries</li>
      <li>New Itinerary</li>
    </ul>
    </Drawer> */}


      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/itineraries">
          <ItineraryPage />
        </Route>
        <Route path="/login">
          {/* <Login /> */}
        </Route>
        <Route path="/newItinerary">
            {/* <NewItinerary/> */}
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}
