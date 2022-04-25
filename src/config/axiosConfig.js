import axios from "axios";
import { URL_BACK } from "../constants";


export const axiosBackendClient = axios.create({
  baseURL: URL_BACK
});

export const axiosMovieClient = axios.create({
  baseURL: "http://api.tvmaze.com/search/shows?q=star%20wars"
});