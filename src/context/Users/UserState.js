import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = ({ children }) => {
  const initialState = {
    userLogged: {},
    userError: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userLogged: state.userLogged,
        userError: state.userError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
