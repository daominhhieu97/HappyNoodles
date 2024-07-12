import axiosInstance from "./baseApi.tsx";


const fetchFoods = async () => {
  const response = await axiosInstance.get('/food/foods');
    return response.data; // Assuming the API returns JSON data
};

export default fetchFoods;
