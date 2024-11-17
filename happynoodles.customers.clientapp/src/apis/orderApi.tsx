import OrderDto, { OrderDetailDto, OrderSummaryDto } from "../models/order.tsx";
import axiosInstance from "./baseApi.tsx";

const baseUrl = 'order';

export const saveOrder = async (orderData: OrderDto): Promise<OrderDto> => {
  const url = `${baseUrl}/saveorder`;
  const response = await axiosInstance.post<OrderDto>(url, orderData);
  return response.data;
};

export const getOrders = async (): Promise<OrderSummaryDto[]> => {
  const url = `${baseUrl}/getorders`;
  const response = await axiosInstance.get<OrderSummaryDto[]>(url);
  return response.data;
};

export const getOrderDetails = async (id: string): Promise<OrderDetailDto> => {
  const url = `${baseUrl}/getorderdetails/${id}`;
  const response = await axiosInstance.get<OrderDetailDto>(url);
  return response.data;
};