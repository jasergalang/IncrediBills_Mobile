import loginReducer from './reducers/user/loginReducers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user/userFetchReducer';
import {analyticsReducer} from "./reducers/analytics/analyticsFetchReducer";
import { billReducer } from './reducers/bills/billsFetchReducer';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        analytics: analyticsReducer,
        bills: billReducer,
    },
});
export default store;