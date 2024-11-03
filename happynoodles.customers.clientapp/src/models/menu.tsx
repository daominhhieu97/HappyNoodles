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

  interface ItemDto {
    id: string;
    name: string;
    price: number;
    description: string;
    remainingItem: number;
  }