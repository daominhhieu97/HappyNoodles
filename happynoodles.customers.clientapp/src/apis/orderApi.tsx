import OrderDto from "../models/order.tsx";
import axiosInstance from "./baseApi.tsx";

const baseUrl = 'order';

export const saveOrder = async (orderData: OrderDto): Promise<OrderDto> => {
  const url = `${baseUrl}/saveorder`;
  const response = await axiosInstance.post<OrderDto>(url, orderData);
  return response.data;
};