import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextLoop from "react-text-loop";
import { hexColorList } from "../../app/destinations/destinationTypes";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SnackbarCloseReason,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LinkIcon from "@material-ui/icons/Link";
import { setUser } from "app/reducers/userSlice";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import moment from "moment";
import FadeIn from "react-fade-in";
import { useAppDispatch, useAppSelector } from "app/store";
import { BLACK, WHITE } from "../../colors/colors";
import { useStyles } from "./Navbar.styles";
import * as sc from "./Navbar.styles";

const Navbar = (props: { history: any }) => {
  const { history } = props;
  const IS_SHARED = history.location.pathname.includes("/shared");
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShareableLinkOpen, setIsShareableLinkOpen] = useState(false);
  const [sharedID, setSharedID] = useState(null);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const user = useAppSelector((state) => state.user.value);
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const dispatch = useAppDispatch();

  const handleDropdownClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleErrorClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`/api/v1/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });
      dispatch(setUser({ isLoggedIn: false }));
      window.localStorage.removeItem("user");
      handleMenuClick("/");
    } catch (e: any) {
      setErrorSnackbar(true);
    }
  };

  const handleGetShareableLink = async () => {
    try {
      const res = await fetch(
        `/api/itineraries/shareable-link/` + itinerary?._id,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const id = await res.json();
      setSharedID(id);
    } catch (e: any) {
      setErrorSnackbar(true);
    }
  };

  const getLoopSpan = (text: string) => {
    const max = hexColorList.length;
    const min = 0;
    return (
      <span
        aria-hidden
        style={{
          color: hexColorList[Math.floor(Math.random() * (max - min) + min)],
        }}
      >
        {text}
      </span>
    );
  };

  const getLoopText = () => {
    return (
      <sc.LoopDiv>
        {`Where would you like to visit? `}
        <TextLoop>
          {getLoopSpan("Bora Bora Island, French Polynesia?")}
          {getLoopSpan("Machu Picchu, Peru?")}
          {getLoopSpan("Great Barrier Reef, Australia?")}
          {getLoopSpan("Bangkok, Thailand?")}
          {getLoopSpan("Cappadocia, Turkey?")}
          {getLoopSpan("Paris, France?")}
          {getLoopSpan("New York, United States?")}
          {getLoopSpan("Rothenburg – Germany?")}
          {getLoopSpan("Guanajuato, Mexico?")}
          {getLoopSpan("Angkor Wat, Cambodia?")}
          {getLoopSpan("Cinque Terre, Italy?")}
          {getLoopSpan("Taj Mahal, India?")}
          {getLoopSpan("Bali, Indonesia?")}
          {getLoopSpan("Singapore – City of Garden?")}
          {getLoopSpan("Santorini, Greece?")}
          {getLoopSpan("Milford Sound, New Zealand?")}
          {getLoopSpan("Blue Lake Luzern, Switzerland?")}
          {getLoopSpan("Madrid, Spain?")}
          {getLoopSpan("London, United Kingdom?")}
          {getLoopSpan("The Colosseum Rome, Italy?")}
          {getLoopSpan("Bryce Canyon Bryce, Utah?")}
          {getLoopSpan("Niagara Falls, Canada?")}
          {getLoopSpan("Budapest, Hungary?")}
        </TextLoop>
      </sc.LoopDiv>
    );
  };

  const getInvalidItineraryDialog = () => {
    const link: string = "https://trippoapp.herokuapp.com/shared/" + sharedID;
    return (
      <Dialog
        open={isShareableLinkOpen && sharedID !== null}
        onClose={() => setIsShareableLinkOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Anyone with this link has <strong>restricted</strong> read-only
          access.
          <br />
          <sc.StyledLink value={link} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To allow read and write access, add collaborators to your itinerary!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <sc.StyledButton
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(link);
              setIsShareableLinkOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Copy link
          </sc.StyledButton>
        </DialogActions>
      </Dialog>
    );
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (pageURL: string) => {
    history.push(pageURL);
    handleDrawerClose();
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/home?page=1",
    },
  ];

  return (
    <sc.Root>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: WHITE }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon style={{ color: BLACK }} />
          </IconButton>
          <sc.Logo>
            <sc.LogoButton onClick={() => handleMenuClick("/home?page=1")}>
              <>
                <img
                  id="full-logo"
                  alt="Trippo Logo"
                  src="/trippo.png"
                  width="120"
                ></img>
                <img
                  id="icon-logo"
                  alt="Trippo Logo"
                  src="/trippo-icon.png"
                  width="25"
                ></img>
              </>
            </sc.LogoButton>
          </sc.Logo>
          {history.location.pathname.includes("/home") && (
            <sc.ItineraryTitleContainer>
              {getLoopText()}
            </sc.ItineraryTitleContainer>
          )}
          {(history.location.pathname.includes("itinerary") || IS_SHARED) &&
          itinerary ? (
            <sc.ItineraryTitleContainer>
              <FadeIn transitionDuration={600} delay={500}>
                <sc.ItineraryTitle>
                  <span>{itinerary?.name}</span>
                  {!IS_SHARED && (
                    <sc.StyledTooltip
                      title="Get shareable link"
                      aria-label="Get shareable link"
                    >
                      <sc.StyledIconButton
                        onClick={() => {
                          setIsShareableLinkOpen(true);
                          handleGetShareableLink();
                        }}
                      >
                        <LinkIcon />
                      </sc.StyledIconButton>
                    </sc.StyledTooltip>
                  )}
                </sc.ItineraryTitle>
                <sc.DateGrid container item lg={12} sm={12}>
                  <i className="far fa-calendar-alt"></i>
                  {moment(itinerary?.start_date).format("MMM Do YYYY") +
                    ` - ` +
                    moment(itinerary?.end_date).format("MMM Do YYYY")}
                </sc.DateGrid>
              </FadeIn>
            </sc.ItineraryTitleContainer>
          ) : null}
          <IconButton
            style={{ position: "absolute", right: 20 }}
            onClick={handleDropdownClick}
          >
            <sc.StyledAccountCircle />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            {user ? <MenuItem disabled>{user.name}</MenuItem> : null}
            <MenuItem
              onClick={() => {
                if (user?.isLoggedIn) {
                  handleLogout();
                } else {
                  handleMenuClick("/");
                }
                handleDropdownClose();
              }}
            >
              {user?.isLoggedIn ? "Logout" : "Sign In"}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        onBackdropClick={handleDrawerClose}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((menuItem, index) => {
            const { menuTitle, pageURL } = menuItem;
            return (
              <ListItem
                button
                onClick={() => handleMenuClick(pageURL)}
                key={index}
              >
                {menuTitle}
              </ListItem>
            );
          })}
          <ListItem button onClick={() => handleMenuClick("/about")}>
            {"About"}
          </ListItem>
        </List>
      </Drawer>
      {getInvalidItineraryDialog()}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={() => setErrorSnackbar(false)} severity="error">
          An unexpected error has occurred, please try again later.
        </Alert>
      </Snackbar>
    </sc.Root>
  );
};

export default withRouter(Navbar);
