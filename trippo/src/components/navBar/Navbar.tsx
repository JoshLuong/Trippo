import React from "react";
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
import AccountCircle from "@material-ui/icons/AccountCircle";
import { setUser } from 'app/reducers/userSlice';
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import moment from "moment";
import FadeIn from "react-fade-in";
import { useAppDispatch, useAppSelector } from 'app/store';
import { BLACK, GREY, WHITE } from "../../colors/colors";
import { useStyles } from "./Navbar.styles";
import * as sc from "./Navbar.styles";

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/components/drawers

const Navbar = (props: { history: any }) => {
  const { history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = useAppSelector((state) => state.user.value);
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const dispatch = useAppDispatch();

  const handleDropdownClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/auth/logout`, {
          method: "DELETE",
          credentials: 'include'
        })
        dispatch(setUser({isLoggedIn: false}));
        handleMenuClick("/");
    } catch(e) {
        console.log(e);
    }
    // store returned user somehow
  }

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
    }
  ];

  return (
    <div className={classes.root}>
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
            <sc.LogoButton disabled={!user?.isLoggedIn} onClick={() => handleMenuClick("/home?page=1")}>
              <img alt="Trippo Logo" src="/trippo.png" width="120"></img>
            </sc.LogoButton>
          </sc.Logo>
          {
            history.location.pathname.includes("itinerary") && itinerary ? (
            <sc.ItineraryTitle >
              <FadeIn transitionDuration={600} delay={500}>
                {itinerary?.name}
                <sc.DateGrid container item lg={12} sm={12}>
                <i className="far fa-calendar-alt"></i>
                {moment(itinerary?.start_date).format("MMM Do YYYY") +
                  ` - ` +
                  moment(itinerary?.end_date).format("MMM Do YYYY")}
                </sc.DateGrid>
              </FadeIn>
            </sc.ItineraryTitle>
            ) : null
          }
          <IconButton
            style={{ position: "absolute", right: 20 }}
            onClick={handleDropdownClick}
          >
            <AccountCircle style={{ width: 35, height: 35, color: GREY }} />
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
            { user ? <MenuItem disabled>{user.name}</MenuItem> : null}
            <MenuItem onClick={() => {
              if (user?.isLoggedIn) {
                handleLogout(); 
              } else {
                handleMenuClick("/");
              }
              handleDropdownClose();
              }}>{user?.isLoggedIn ? 'Logout' : 'Sign In'}</MenuItem>
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
                disabled={!user?.isLoggedIn}
                button
                onClick={() => handleMenuClick(pageURL)}
                key={index}
              >
                {menuTitle}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
