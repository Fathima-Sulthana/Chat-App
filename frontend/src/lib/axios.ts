import axios from "axios";

export const axioInstance = axios.create({
    baseURL : "http://localhost:5001/api", 
    withCredentials: true,
});

