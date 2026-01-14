// api/bills/waterAPI.js
import api from "../apiInstance";

// Get all water bills
export const fetchWaterBillsApi = async () => {
  const res = await api.get("/water-bill/all");
  return res.data; // { count, bills }
};

// Upload water bill (OCR or manual)
export const uploadWaterBillApi = async (formData) => {
  const res = await api.post("/water-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Trigger prediction after upload
export const triggerWaterPredictionApi = async () => {
  const res = await api.post("/water-bill/predict");
  return res.data;
};