import UserDto from "../models/user.tsx";
import axiosInstance from "./baseApi.tsx";

const baseUserApi = axiosInstance.defaults.baseURL + '/user';

interface RegisterUserRequest {
    id : string | null
    address : string
    phonenumber : string
}

const register = async (request : RegisterUserRequest) => {
  try {
    await axiosInstance.post(`${baseUserApi}/register`, request);
  } catch (error) {
    throw error; // Handle or propagate the error as needed
  }
};

export const getUserDetails = async (userId : string) : Promise<UserDto> => {
  const response = await axiosInstance.get<UserDto>(`${baseUserApi}/details`, {
    params: {
      userId
    },
  });

  return response.data;
};

export default register;
