import axios from "axios";

export const API = axios.create({
  baseURL: "http://examwebsiteapi.nuhvin.com",
});
