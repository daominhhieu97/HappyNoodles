export interface OrderItemDto {
    itemId: string;
    quantity: number;
    price: number;
  }
  
  export interface OrderDto {
    id?: string;
    deliveryAddress: string;
    phoneNumber: string;
    orderCode: string;
    orderDate?: Date;
    items: OrderItemDto[];
  }

  export default OrderDto;