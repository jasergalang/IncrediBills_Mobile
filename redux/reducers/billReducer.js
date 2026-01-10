// redux/reducers/billReducer.js
import {
  FETCH_BILLS_REQUEST,
  FETCH_BILLS_SUCCESS,
  FETCH_BILLS_FAILURE,
} from "../actions/billAction";

const initialState = {
  latestAmounts: {},
  computedChanges: {},
  recentBills: [],
  upcomingBills: [],
  categories: [],
  statsData: {
    totalSpent: 0,
    savedAmount: 0,
    billsUploaded: 0,
    efficiency: 0,
  },
  analytics: {
    monthly: [],
    yearly: {},
  },
  loading: false,
  error: null,
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILLS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case FETCH_BILLS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
