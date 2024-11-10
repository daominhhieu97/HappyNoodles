import { ItemDetailsDto } from "../models/item.tsx";
import axiosInstance from "./baseApi.tsx";

const baseUrl = 'item'

const getItemDetails = async (id : string | undefined) => {
  const url = `${baseUrl}/${id}`;
  const response = await axiosInstance.get<ItemDetailsDto>(url);

  return response.data; // Assuming the API returns JSON data
};

export default getItemDetails;
