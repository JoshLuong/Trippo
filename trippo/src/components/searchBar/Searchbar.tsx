import { FC, ReactElement } from "react";
import SearchIcon from "@material-ui/icons/Search";
import * as sc from "./Searchbar.styles";

interface Props {
  children?: ReactElement<any, any>;
  onChange?: (e: any) => void;
}

const Searchbar: FC<Props> = ({ children, onChange }) => {
  return (
    <sc.SearchContainer>
      {children ? (
        <sc.Container>{children}</sc.Container>
      ) : (
        <sc.PaperContainer>
          <sc.RootContainer component="form">
            <sc.InputContainer
              color="primary"
              placeholder="Search your itineraries"
              onChange={onChange}
              inputProps={{ "aria-label": "search itineraries" }}
            />
            <sc.StyledIconButton type="submit" aria-label="search" disabled>
              <SearchIcon />
            </sc.StyledIconButton>
          </sc.RootContainer>
        </sc.PaperContainer>
      )}
    </sc.SearchContainer>
  );
};

export default Searchbar;
