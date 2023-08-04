import axios from "axios"
import {API} from "./backend"


export const getAllJobs = () => axios.get(`${API}/jobs`)