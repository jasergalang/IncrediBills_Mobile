import loginReducer from './reducers/user/loginReducers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user/userFetchReducer';
import {analyticsReducer} from "./reducers/analytics/analyticsFetchReducer";
import chatbotReducer from './slices/chatbot/chatbotSlice'; 
import billSlice from './slices/bills/billSlice';
const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        analytics: analyticsReducer,
        chatbot: chatbotReducer,
        bills: billSlice,
    },
});
export default store;