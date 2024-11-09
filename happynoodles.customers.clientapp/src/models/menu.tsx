interface CategoryDto {
    id: string;
    name: string;
    items: ItemDto[];
  }
  
  interface MenuDto {
    id: string;
    name: string;
    categories: CategoryDto[];
  }

  export interface ItemDto {
    id: string;
    name: string;
    price: number;
    description: string;
    remainingItem: number;
    availableStatus: 1 | 2; // 1 for in stock, 2 for out of stock
    pictureUrl?: string;
  }

  export default MenuDto;