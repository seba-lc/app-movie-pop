import axios from "axios";
import { URL_BACK } from "../constants";


export const axiosBackendClient = axios.create({
  baseURL: URL_BACK
});

export const axiosMovieClient = axios.create({
  baseURL: "https://api.tvmaze.com"
});

//https://api.tvmaze.com/shows/2269 el número 2269 es el id de la película. Así las voy a tener que buscar para añadirlas a favoritos.
//Quizás me convenga crear un contexto para buscar las películas favoritas apenas el usuario se logee con un for