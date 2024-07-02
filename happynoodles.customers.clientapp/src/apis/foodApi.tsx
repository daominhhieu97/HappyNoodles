import axiosInstance from "./baseApi.tsx";


const fetchFoods = async () => {
  try {
    const response = await axiosInstance.get('/food/foods');
    console.log('Foods:', response.data);
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error; // Handle or propagate the error as needed
  }
};

export default fetchFoods;
