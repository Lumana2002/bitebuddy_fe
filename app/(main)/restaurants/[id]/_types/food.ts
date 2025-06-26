export interface Food {
  foodId: string;
  menuId: string;
  foodName: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  spiceLevel: number;
  image?: string;
}
