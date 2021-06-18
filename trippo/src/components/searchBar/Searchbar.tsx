import SearchBar from "material-ui-search-bar";
import * as sc from "./Searchbar.styles";

function Searchbar() {
  return (
    <div
      style={{
        marginTop: "7em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <sc.Container>
        <SearchBar />
      </sc.Container>
    </div>
  );
}

export default Searchbar;
