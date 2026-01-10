import loginReducer from './reducers/loginRedcers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import {analyticsReducer} from "./reducers/analyticsReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        analytics: analyticsReducer,
    },
});
export default store;