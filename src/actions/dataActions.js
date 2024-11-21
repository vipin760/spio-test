import { apiClient } from "app/configs/apiClient";

export const fetchData = async (createdBy) => {
  try {
    const response = await apiClient().get(`reviewlink/${createdBy}`);
    const data = await response
    return data;
  } catch (error) {
    return error;
  }
};
export const updateData = async (formData) => {
  try {
    const res = await apiClient().post(
      `reviewlink/uploadfile`, formData
    );
  } catch (error) {
    return error;
  }
};
export const UpdateCustom = async (formData) => {
  try {
    const res = await apiClient().post("/custom", {
      data: formData,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomColums = async () => {
  try {
    const res = await apiClient().get(`/custom`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDashboard = async (companyid) => {
  try {
    const res = await apiClient().get(`/dashboard/`)
    return res.data
  } catch (error) {
    return error
  }
}