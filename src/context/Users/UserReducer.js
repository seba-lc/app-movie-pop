import { ERROR_USERS } from "../../type";

export default (state, action) => {
  switch(action.type){
    case ERROR_USERS:
      return {
        ...state,
        userError: 'Hubo un error'
      }
  }
}