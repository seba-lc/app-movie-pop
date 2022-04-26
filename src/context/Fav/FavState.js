import { useReducer } from "react";
import FavContext from "./FavContext";
import FavReducer from "./FavReducer";

const FavState = ({ children }) => {
  const initialState = {
    favMovies: [],
    favError: "",
  };

  const [state, dispatch] = useReducer(FavReducer, initialState);

  return (
    <FavContext.Provider
      value={{
        favMovies: state.favMovies,
        favError: state.favError,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export default FavState;
