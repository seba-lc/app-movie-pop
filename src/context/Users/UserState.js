import { useReducer } from "react";
import { axiosBackendClient, axiosMovieClient } from "../../config/axiosConfig";
import { GET_USER, POST_FAV, POST_FAV_OBJECT, REMOVE_USER } from "../../type";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = ({ children }) => {
  const initialState = {
    userLogged: {},
    auth: false,
    favMovies: [],
    favObjectMovies: []
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async (data) => {
    let errors = {};
    try {
      const response = await axiosBackendClient.post('/users', data);
      if(response.status === 200){
        localStorage.setItem('ID', response.data.id);
        axiosBackendClient.defaults.headers.common['x-auth-token'] = response.data.id;
        delete response.data.id
        dispatch({
          type: GET_USER,
          payload: response.data
        });
        return errors;
      }else if(response.status === 201){
        errors.data = 'Datos Incorrectos'
        dispatch({
          type: REMOVE_USER,
        })
        return errors;
      }
    } catch (error) {
      console.log(error);
      errors.fail = 'Error, inténtelo nuevamente'
      dispatch({
        type: REMOVE_USER
      })
      return errors;
    }
  }

  const logout = () => {
    dispatch({
      type: REMOVE_USER
    })
  }

  const getAuth = async () => {
    const token = localStorage.getItem('ID');
    if(token){
      axiosBackendClient.defaults.headers.common['x-auth-token'] = token;
      try {
        const response = await axiosBackendClient.get('/users');
        if(response.status === 200){
          dispatch({
            type: GET_USER,
            payload: response.data
          })
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: REMOVE_USER
        })
      }
    }else{
      delete axiosBackendClient.defaults.headers.common['x-auth-token']
    }
  }

  const postFavMovie = async (data) => {
    let errors = {};
    if(state.auth){
      if(state.favMovies.indexOf(data.show.id.toString()) === -1){
        try {
          const dataDB = {
            user: state.userLogged.user,
            movieId: data.show.id.toString()
          }
          const response = await axiosBackendClient.post('/users/favorites', dataDB);
          if(response.status === 200){
            dispatch({
              type: POST_FAV,
              payload: [data.show.id.toString()]
            })
            dispatch({
              type: POST_FAV_OBJECT,
              payload: [data]
            })
          }
          return errors;
        } catch (error) {
          console.log(error);
          errors.servidor = 'Intentelo nuevamente más tarde'
          return errors;
        }
      }else{
        errors.duplicate = 'Película ya agregada a Favoritos'
        return errors;
      }
    }else{
      errors.user = 'Debe iniciar sesión para elegir una película como favorita'
      return errors
    }
  }
  
  const bringFavoriteMovies = async () => {
    let errors = {};
    let favArray = [];
    try {
      for(let i = 0; i < state.favMovies.length; i++){
        const response = await axiosMovieClient.get(`/shows/${state.favMovies[i]}`);
        favArray.push({score: '--', show: response.data})
      }
      dispatch({
        type: POST_FAV_OBJECT,
        payload: favArray
      })
      return errors;
    } catch (error) {
      console.log(error);
      errors.servidor = 'Error al traer las películas favoritas';
      return errors;
    }
  }

  const postComment = async (movieId, comment) => {
    let errors = {};
    let commentDB;
    try {
      const dataDB = {
        user: state.userLogged.user,
        movieId: movieId,
        message: comment
      }
      const response = await axiosBackendClient.post('/comments', dataDB);
      if(response.status === 200){
        commentDB = response.data
        return [errors, commentDB]
      }
    } catch (error) {
      errors.servidor = 'Error al postear el comentario, inténtelo nuevamente'
      return [errors];
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLogged: state.userLogged,
        auth: state.auth,
        favMovies: state.favMovies,
        favObjectMovies: state.favObjectMovies,
        login,
        logout,
        getAuth,
        postFavMovie,
        postComment,
        bringFavoriteMovies
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
