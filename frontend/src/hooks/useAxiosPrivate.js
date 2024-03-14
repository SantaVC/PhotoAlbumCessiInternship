import { useEffect } from "react";
import { axiosPrivateClient } from "../axios";
import { getAuthToken } from "../services/authService";

const useAxiosPrivate = () => {
  const token = getAuthToken();
};
