export const fetchData = async (endpoint, params) => {
  const response = await apiClient().get(endpoint, {
    params,
  });
  return response.data;
};

export const updateData = async (endpoint, body) => {
  const response = await apiClient().post(endpoint, body);
  return response.data;
};
