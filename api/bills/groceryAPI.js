import api from "../apiInstance";

export const fetchAllGroceryBillsApi = async () => {
  const res = await api.get("/grocery-bill/bills");
  return res.data; // { count, bills }
};

export const fetchGroceryBillByIdApi = async (id) => {
  const res = await api.get(`/grocery-bill/uploaded/${id}`);
  return res.data;
};

export const fetchGroceryPredictionsApi = async () => {
  const res = await api.get("/grocery-bill/predictions");
  return res.data;
};

export const uploadGroceryBillApi = async (formData) => {
  const res = await api.post("/grocery-bill/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const triggerGroceryPredictionApi = async () => {
  const res = await api.post("/grocery-bill/predict");
  return res.data;
};

export const updateGroceryBillApi = async (billId, updatedData) => {
  const res = await api.put(`/grocery-bill/${billId}`, updatedData);
  return res.data;
}