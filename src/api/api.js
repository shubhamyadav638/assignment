import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const getUsers = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, { params: { page } });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
