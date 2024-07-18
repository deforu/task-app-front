import axios from "axios"

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api/v1"
})

export default client
