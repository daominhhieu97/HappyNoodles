import axiosInstance from "./baseApi.tsx";

const baseUrl = 'menu'

const getAllMenus = async () => {
  const url = `${baseUrl}/getmenus`;
  const response = await axiosInstance.get(url);
  
  return response.data; // Assuming the API returns JSON data
};

export default getAllMenus;
