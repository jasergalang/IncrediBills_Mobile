import api from "../apiInstance";

// Get all electric bills
export const fetchElectricBillsApi = async () => {
  const res = await api.get("/electric-bill/all");
  return res.data; // { count, bills }
};

// Upload electric bill (OCR or manual)
export const uploadElectricBillApi = async (formData) => {
  const res = await api.post("/electric-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Trigger prediction after upload
export const triggerElectricPredictionApi = async () => {
  const res = await api.post("/electric-bill/predict");
  return res.data;
};
