import loginReducer from './reducers/loginRedcers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import {analyticsReducer} from "./reducers/analyticsReducer";
import { billReducer } from './reducers/billReducer';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        analytics: analyticsReducer,
        bills: billReducer,
    },
});
export default store;