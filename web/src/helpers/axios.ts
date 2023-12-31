import axios from 'axios'
import { BASE_URL } from '../configs/constants'
import { refreshToken } from '../services/user.service';
import { setAuthenticatedStatus } from '../redux/slices/authSlice';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses here
        return response;
    },
    (error) => {
        // Handle error responses here
        if (error.response.status === 401 || error.response.status === 403) {
            refreshToken().then(value => {
                if (value) {
                    // Update the accessToken in Redux
                    setAuthenticatedStatus(true);
                    // Update the accessToken in axios headers
                    axiosInstance.defaults.headers.common['Authorization'] = value.access_token;
                } else {
                    setAuthenticatedStatus(false)
                }
            })
        }
        return Promise.reject(error);
    }
);

export default axiosInstance