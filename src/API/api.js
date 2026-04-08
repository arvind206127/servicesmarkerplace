import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api"
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Check karein aapne 'token' naam se hi save kiya hai na?
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token Attached to Header!");
        } else {
            console.log("No Token Found in LocalStorage");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const signUp = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const createBooking = (data) => api.post("/booking/createBooking", data);
export const fetchUserDashboard = () => api.get("/user/userDashboard");
export const submitReview = (data) => api.post("/review/createReview", data);

export default api;