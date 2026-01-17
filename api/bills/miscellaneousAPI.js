import api from "../apiInstance";

// Get all miscellaneous bills
export const fetchAllMiscellaneousBillsApi = async () => {
  const res = await api.get("/miscellaneous-bill/bills");
  return res.data; // { count, bills }
};

export const fetchMiscellaneousBillByIdApi = async (id) => {
  const res = await api.get(`/miscellaneous-bill/uploaded/${id}`);
  return res.data;
};

export const fetchMiscellaneousPredictionsApi = async () => {
  const res = await api.get("/miscellaneous-bill/predictions");
  return res.data;
};

// Upload miscellaneous bill (OCR or manual)
export const uploadMiscellaneousBillApi = async (formData) => {
  const res = await api.post("/miscellaneous-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Trigger prediction after upload
export const triggerMiscellaneousPredictionApi = async () => {
  const res = await api.post("/miscellaneous-bill/predict");
  return res.data;
};