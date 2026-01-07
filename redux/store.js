import loginReducer from './reducers/loginRedcers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});
export default store;