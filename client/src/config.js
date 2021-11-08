import axios from "axios"

export const axiosInstance = axios.create({
    baseURL = "https://mern-movie-api.herokuapp.com/"
})