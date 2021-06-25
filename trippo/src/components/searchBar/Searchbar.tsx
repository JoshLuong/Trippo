import * as sc from "./Searchbar.styles";
import Search from "./Search";

function Searchbar() {
  return (
    <div
      style={{
        marginTop: "10em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <sc.Container>
      <Search
          searchValue
          onChangeHandler
        />
      </sc.Container>
    </div>
  );
}

export default Searchbar;
