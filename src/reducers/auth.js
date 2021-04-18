import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../constants/auth'

const userInfo = localStorage.getItem("userInfor") ? 
JSON.parse(localStorage.getItem("userInfor")) : null;

const initialState = {
    userInfo,
    isLoading: false,
    error: null,
};

function authReducer( state = initialState, action){
    switch (action.type) {
        case LOGIN_REQUEST:{
            return {...state, isLoading: true, error: null};
        }
        case LOGIN_SUCCESS:{
            return {...state, isLoading: false, userInfo: action.payload.data};
        }
        case LOGIN_FAILURE:{
            return {...state, isLoading: false, error: action.payload.error };
        }

        default:
            return state;
    }
}

export default authReducer;