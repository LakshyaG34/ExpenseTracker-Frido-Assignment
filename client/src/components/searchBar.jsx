import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/categorySlice";

const SearchBar = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  return (
    <div className="max-w-3xl w-full mx-auto">
      <input
        placeholder="Search by category"
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
