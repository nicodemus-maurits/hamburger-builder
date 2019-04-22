import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorMessage: error
    };
};

export const logout = () => {
    /* Remove token when logout */
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

/* Receive expiration time in seconds */
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
            /* Change to milliseconds */
        }, expirationTime * 1000);
    };
};

/* Async code;  */
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_API_KEY;
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_API_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                /* Saving idToken and expiresIn on localStorage to maintain the user login session even when the browser is refreshed */
                /* Create current time + token expire duration */
                const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expireDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(
                    response.data.idToken,
                    response.data.localId
                ));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

/* Action to check if user authenticated on initializing or not */
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            /* Goes to logout if there no token to be fetched */
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime >= new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                /* Return expire time - current time in seconds */
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    };
} 
