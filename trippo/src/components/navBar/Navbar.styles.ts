import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button, Tooltip } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as c from "../../colors/colors";

const drawerWidth = 240;

export const StyledAccountCircle = styled(AccountCircle)`
  width: 35px;
  height: 35px;
  color: ${c.GREY};

  @media (max-width: 800px) {
    width: 30px;
    height: 30px;
  }
`;
export const LoopDiv = styled.div`
  position: absolute;
  color: ${c.BLACK};
  font-size: 16px;
  left: 40%;
  top: 38%;

  @media (max-width: 1780px) {
    left: 38%;
  }

  @media (max-width: 1400px) {
    left: 35%;
  }

  @media (max-width: 1200px) {
    left: 30%;
  }

  @media (max-width: 950px) {
    display: none;
  }
`;

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
  justify-content: center;
  color: ${c.DARK_GREY};
  i {
    color: ${c.DARK_ORANGE};
    margin-top: 0.2em;
    margin-right: 0.35em;
  }
  @media (max-width: 660px) {
    font-size: 0.5em;
  }
  @media (max-width: 400px) {
    font-size: 0.45em;
  }
`;

export const ItineraryTitleContainer = styled.div`
  margin: auto;
  font-size: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;

  @media (max-width: 660px) {
    max-width: 160px;
    overflow: hidden;
  }
`;

export const ItineraryTitle = styled.div`
  margin: auto;
  text-align: center;
  overflow-x: scroll;
  white-space: nowrap;
  color: ${c.DARK_BLUE};

  @media (max-width: 660px) {
    max-width: 140px;
    font-size: 0.65em;
  }
  ::-webkit-scrollbar {
    height: 0px;
    width: 0px;
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
  color: ${c.BLACK};
`;

export const Root = styled.div`
  display: flex;
`;

export const useStyles = makeStyles((theme) => ({
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
