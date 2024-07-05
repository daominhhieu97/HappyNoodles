import axiosInstance from "./baseApi.tsx";

interface RegisterUserRequest {
    id : string | null
    address : string
    phonenumber : string
}

const register = async (request : RegisterUserRequest) => {
  try {
    await axiosInstance.post('/user/register', request);
  } catch (error) {
    throw error; // Handle or propagate the error as needed
  }
};

export default register;
