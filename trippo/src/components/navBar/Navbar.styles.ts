import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button, Tooltip } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import * as c from "../../colors/colors";

const drawerWidth = 240;

export const StyledButton = styled(Button)`
  span {
    color: ${c.DARK_ORANGE};
  }
`;

export const StyledTooltip = styled(Tooltip)`
  margin-left: 0.5em;
`;

export const Logo = styled.div`
  position: absolute;
  left: 64px;

  @media (max-width: 660px) {
    left: 50px;
  }
`;

export const DateGrid = styled(Grid)`
  font-size: 0.65em;
  display: flex;
  color: ${c.DARK_GREY};
  i {
    color: ${c.DARK_ORANGE};
    margin-top: 0.2em;
    margin-right: 0.35em;
  }
  @media (max-width: 660px) {
    font-size: 0.5em;
  }
`;

export const ItineraryTitle = styled.div`
  margin: auto;
  text-align: center;
  color: ${c.DARK_BLUE};
  font-size: 1.5em;

  @media (max-width: 660px) {
    max-width: 160px;
    overflow: hidden;
  }
`;

export const StyledLink = styled.input`
  width: 100%;
  border: none;
  border-color: transparent;
  :focus {
    border: none;
  }
`;

export const LogoButton = styled.button`
  &:hover {
    cursor: pointer;
  }

  border: none;
  background: transparent;

  #icon-logo {
    display: none;
  }

  @media (max-width: 800px) {
    #full-logo {
      display: none;
    }
    #icon-logo {
      display: block;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  width: 24px !important;
  height: 24px !important;
  margin-top: -6px;
  position: relative;
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {},
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
