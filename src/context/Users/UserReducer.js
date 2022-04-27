import { axiosBackendClient } from "../../config/axiosConfig";
import { GET_USER, POST_FAV, POST_FAV_OBJECT, REMOVE_USER } from "../../type";

export default (state, action) => {
  switch(action.type){
    case GET_USER:
      return {
        ...state,
        userLogged: {
          name: action.payload.name,
          user: action.payload.user
        },
        auth: true,
        favMovies: action.payload.favMovies,
        comments: action.payload.comments
      }
    case REMOVE_USER:
      if(localStorage.getItem('ID')){
        localStorage.removeItem('ID')
      }
      delete axiosBackendClient.defaults.headers.common['x-auth-token'];
      return {
        ...state,
        userLogged: {},
        auth: false,
        favMovies: [],
        comments: [],
        favObjectMovies: []
      }
    case POST_FAV:
      return {
        ...state,
        favMovies: state.favMovies.concat(action.payload)
      }
    case POST_FAV_OBJECT:
      return {
        ...state,
        favObjectMovies: state.favObjectMovies.concat(action.payload)
      }
  }
}