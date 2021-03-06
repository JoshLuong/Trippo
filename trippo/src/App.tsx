/* eslint-disable import/no-webpack-loader-syntax */
import "./App.css";
import { useEffect, useState } from "react";
import ItineraryPage from "components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import WelcomePage from "components/welcomePage/WelcomePage";
import AboutPage from "components/aboutPage/AboutPage";
import { setUser, setAppLoaded } from "app/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "app/store";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PrivateRoute from "./PrivateRoute";
import ItinerariesView from "components/itinerariesView/ItinerariesView";

// Mapbox issue fix: https://github.com/mapbox/mapbox-gl-js/issues/10173#issuecomment-750489778
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);

  const history: any = useHistory();
  const [showSignInError, setShowSignInError] = useState(false);

  const handleFeedbackClose = (_event: any, reason: SnackbarCloseReason) => {
    if (reason !== "clickaway") {
      setShowSignInError(false);
    }
  };

  useEffect(() => {
    fetch(`/api/v1/auth/current/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((status) => status.json())
      .then((user) => {
        if (user && !user.error) {
          dispatch(setUser({ isLoggedIn: true, ...user }));
        }
      })
      .catch((e: string) => {
        if (
          history.location.pathname !== "/about" &&
          history.location.pathname !== "/" &&
          !history.location.pathname.includes("/shared")
        )
          history.push("/");
          console.error(e);
      })
      .finally(() => {
        dispatch(setAppLoaded(true));
      });
  }, [dispatch, history]);

  useEffect(() => {
    setShowSignInError(
      ((user && !user.isLoggedIn) || user === null) &&
        history.location.state &&
        history.location.state.from.pathname !== "/"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <Snackbar
        onClose={handleFeedbackClose}
        transitionDuration={900}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showSignInError}
      >
        <Alert severity="error">
          Please sign up or log in to start creating itineraries
        </Alert>
      </Snackbar>
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <WelcomePage />} />
        <Route exact path="/about" component={() => <AboutPage />} />
        <Route exact path="/shared/:id" component={() => <ItineraryPage />} />
        <PrivateRoute
          exact
          path="/itinerary/:id"
          component={() => <ItineraryPage />}
        />
        <PrivateRoute
          exact
          path="/home"
          component={() => <ItinerariesView />}
        />
      </Switch>
    </>
  );
}

export default App;
