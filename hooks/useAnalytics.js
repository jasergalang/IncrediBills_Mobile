import { useEffect, useState } from "react";
import axios from "axios";
import { getLatestBill } from "../utils/billUtils";
import { computeChange, matchPrediction } from "../utils/predictionUtils";
import baseURL from "../assets/common/baseUrl";
import { useAuth } from "../context/auth";
import { utilities } from "../constants/utilities";

export function useAnalytics() {
    const { token, getToken } = useAuth();

    
}
