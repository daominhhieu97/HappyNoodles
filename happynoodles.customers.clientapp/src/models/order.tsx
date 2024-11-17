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

  // OrderSummaryDto.ts
export interface OrderSummaryDto {
    id: string;
    orderCode: string;
    orderDate: string;
    total: number;
}

// OrderLineItemDto.ts
export interface OrderLineItemDto {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

// OrderDetailDto.ts
export interface OrderDetailDto {
    orderCode: string;
    orderDate: string;
    deliveryAddress: string;
    phoneNumber: string;
    lineItems: OrderLineItemDto[];
    total: number;
}

  export default OrderDto;