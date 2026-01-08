// redux/user/userReducer.js
import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from "../actions/userAction";

const initialState = {
    userData: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        profilePic: null,
        level: 0,
        points: 0,
    },
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, userData: action.payload };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userData: {
                    ...state.userData,
                    ...action.payload,
                    profilePic: action.payload.profilePic?.[0]?.url || state.userData.profilePic,
                },
            };

        case FETCH_USER_FAILURE:
        case UPDATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
