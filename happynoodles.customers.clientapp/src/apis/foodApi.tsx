import axiosInstance from "./baseApi.tsx";

const baseUrl = 'items'

const getItems = async () => {
  const response = await axiosInstance.get(baseUrl);
    return response.data; // Assuming the API returns JSON data
};

export default getItems;
