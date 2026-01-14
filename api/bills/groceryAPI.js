// api/bills/waterAPI.js
import api from "../apiInstance";

// Get all grocery bills
export const fetchAllGroceryBillsApi = async () => {
  const res = await api.get("/grocery-bill/bills");
  return res.data; // { count, bills }
};

// Upload grocery bill (OCR or manual)
export const uploadGroceryBillApi = async (formData) => {
  const res = await api.post("/grocery-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Trigger prediction after upload
export const triggerGroceryPredictionApi = async () => {
  const res = await api.post("/grocery-bill/predict");
  return res.data;
};