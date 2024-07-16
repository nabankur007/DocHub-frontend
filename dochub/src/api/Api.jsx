import axios from "axios";

// Create an axios instance with default settings
const Api = axios.create({
    baseURL:"http://localhost:9999/api"
});

export default Api;
