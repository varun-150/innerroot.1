import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register/', {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login/', {
        email,
        password,
    });
};

const verifyOtp = (email, otp) => {
    return axios.post(API_URL + 'verify-otp/', {
        email,
        otp,
    });
};

const setup2FA = (token) => {
    return axios.post(API_URL + 'setup-2fa/', {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const confirm2FA = (token, otp) => {
    return axios.post(API_URL + 'confirm-2fa/', { otp }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const googleLogin = (accessToken) => {
    return axios.post(API_URL + 'social/google/', {
        access_token: accessToken,
    });
};

export default {
    register,
    login,
    verifyOtp,
    setup2FA,
    confirm2FA,
    googleLogin,
};
