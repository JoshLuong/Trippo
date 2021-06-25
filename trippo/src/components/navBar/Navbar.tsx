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
import ListItem from "@material-ui/core/ListItem";
import { withRouter } from "react-router-dom";
import { BLACK, WHITE } from "../../colors/colors";
import { useStyles } from "./Navbar.styles";
import * as sc from "./Navbar.styles";

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/components/drawers

const Navbar = (props: { history: any }) => {
  const { history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (pageURL: string) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/home",
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
            <sc.LogoButton onClick={() => handleMenuClick("/home")}>
              <img alt="Trippo Logo" src="trippo.png" width="120"></img>
            </sc.LogoButton>
          </sc.Logo>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
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
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
