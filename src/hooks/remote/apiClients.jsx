import Axios from "axios";
import { base_url, getApiHeaders } from "../constants";

export const apiClient = Axios.create(
    {
        baseURL: base_url,
        headers: getApiHeaders(),
    }
)
