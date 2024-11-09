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
    availableStatus: 'InStock' | 'OutOfStock';
    pictureUrl?: string;
  }

  export default MenuDto;