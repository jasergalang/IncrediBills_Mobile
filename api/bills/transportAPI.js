import api from "../apiInstance";

// Get all transport fuel bills
export const fetchAllTransportBillsApi = async () => {
  const res = await api.get("/transport-fuel-bill/bills");
  return res.data; // { count, bills }
};

export const fetchTransportBillByIdApi = async (id) => {
  const res = await api.get(`/transport-fuel-bill/uploaded/${id}`);
  return res.data;
};

export const fetchTransportPredictionsApi = async () => {
  const res = await api.get("/transport-fuel-bill/predictions");
  return res.data;
};

// Upload transport fuel bill (OCR or manual)
export const uploadTransportBillApi = async (formData) => {
  const res = await api.post("/transport-fuel-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Trigger prediction after upload
export const triggerTransportPredictionApi = async () => {
  const res = await api.post("/transport-fuel-bill/predict");
  return res.data;
};