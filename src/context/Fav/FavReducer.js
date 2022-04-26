import { ERROR_FAV } from "../../type";

export default (state, action) => {
  switch(action.type){
    case ERROR_FAV:
      return {
        ...state,
        favError: 'Hubo un error'
      }
  }
}