// import dotenv from "dotenv";
import axios from "axios";
import { NODE_BASE_URL } from "../auth/services/jwtService/jwtService";

export const apiClient = () => {
  const token = localStorage.getItem("jwt_access_token");
  return axios.create({
    baseURL: NODE_BASE_URL,
    headers: {
      Authorization: token,
    },
  });
};
