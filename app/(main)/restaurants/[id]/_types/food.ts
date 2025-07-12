export interface Food {
  foodId: string;
  menuId: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  spiceLevel: number;
  image?: string;
  description?: string;
  weather?: string;
  href?: string;
}
