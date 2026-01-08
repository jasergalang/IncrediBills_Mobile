import loginReducer from './reducers/loginRedcers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
    },
});
export default store;