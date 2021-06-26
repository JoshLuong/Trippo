import { makeStyles } from "@material-ui/core/styles";
import { FC, ReactElement } from 'react';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import * as sc from "./Searchbar.styles";
import {DARK_BLUE} from "../../colors/colors";

interface Props {
  children?: ReactElement<any, any>;
}
// TODO: refactor
const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: 25,
    boxShadow: '0 3px 2px 0.5px rgba(0, 0, 0, .3)',
    height: "3em"
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: "6px 0 6px 5px"
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const ColoredLine = () => (
  // TODO remove inline style
  <hr
      style={{
          color: DARK_BLUE,
          backgroundColor: DARK_BLUE,
          height: 13,
          width: "120hh",
          position:"relative",
          display:"flex",
          top:"3.3em"
        }}
  />
);

const Searchbar: FC<Props> = ({children}) => {
  const classes = useStyles();
// TODO remove inline line 60... do we need this? should just use margins
  return (
    <>
    <ColoredLine />
    <sc.Container>
      <div
        style={{
          height: "0.5em",
          width: "100%",
        }}
      >
      </div>
      {
        children
          ? children
          : (
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ "aria-label": "search itineraries" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          )
      }
    </sc.Container>
    </>
  );
}

export default Searchbar