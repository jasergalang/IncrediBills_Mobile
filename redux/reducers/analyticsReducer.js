// redux/analytics/analyticsReducer.js
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
} from "../actions/analyticsAction";

const initialState = {
  utilityKPI: {},
  spendingData: [],
  categories: [],
  dateRange: "month",
  loading: false,
  error: null,
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        utilityKPI: action.payload.utilityKPI,
        categories: action.payload.categories,
        spendingData: action.payload.spendingData,
        dateRange: action.payload.dateRange,
      };

    case FETCH_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
