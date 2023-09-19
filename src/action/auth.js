import Cookies from 'js-cookie';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    isAuthenticated
} from './types';


export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            isAuthenticated = false;
        }
        else if (res.data.isAuthenticated === 'success') {
            isAuthenticated = true;
        }
        else {
            isAuthenticated = false;
        }
    } catch(err) {
        isAuthenticated = false;
    }
};