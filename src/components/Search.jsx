import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "./Context";

const Search = ({ searchValue, setSearchValue }) => {
  const {theme} = useContext(ThemeContext)
  function handleValue(event) {
    setSearchValue(event.target.value.trim().toLowerCase());
  }

  return (
    <div className={`element-${theme} flex items-center gap-x-2  py-1 px-4 rounded-md w-96 drop-shadow-xl`}>
      <FaSearch />
      <input
        className={`element-${theme} py-1 px-2 outline-none w-full`}
        type="text"
        name="search"
        value={searchValue}
        placeholder="Search for a country..."
        onChange={handleValue}
      />
    </div>
  );
};

export default Search;
