import api from "../apiInstance";

export const fetchAllKitchenGasBillsApi = async () => {
  const res = await api.get("/kitchen-gas-bill");
  return res.data; // { count, bills }
};

export const fetchKitchenGasBillByIdApi = async (id) => {
  const res = await api.get(`/kitchen-gas-bill/${id}`);
  return res.data;
};

export const fetchKitchenGasPredictionsApi = async () => {
  const res = await api.get("/kitchen-gas-bill/predictions/all");
  return res.data;
};


export const uploadKitchenGasBillApi = async (formData) => {
  const res = await api.post("/kitchen-gas-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const triggerKitchenGasPredictionApi = async () => {
  const res = await api.post("/kitchen-gas-bill/predict");
  return res.data;
};

export const updateKitchenGasBillApi = async (billId, updatedData) => {
  const res = await api.put(`/kitchen-gas-bill/${billId}`, updatedData);
  return res.data;
}