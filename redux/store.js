import loginReducer from './reducers/user/loginReducers';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user/userFetchReducer';

import chatbotReducer from './slices/chatbot/chatbotSlice'; 
import billSlice from './slices/bills/billSlice';
import analyticsSlice  from './slices/analytics/analyticsSlice';
import predictionsSlice from './slices/prediction/predictionSlice';
import electricSlice from './slices/bills/electricSlice';
import waterSlice from './slices/bills/waterSlice';
const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        analytics: analyticsSlice,
        chatbot: chatbotReducer,
        bills: billSlice,
        predictions: predictionsSlice,
        electric: electricSlice,
        water: waterSlice,
    },
});
export default store;