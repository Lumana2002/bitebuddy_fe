type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  role: string;
};

type Restaurant = {
  restaurantId: number;
  name: string;
  email: string;
  contact: string;
  cuisine: string;
  image: string | undefined;
  description: string;
  status: string;
  address: string;
};

type Menu = {
  menuId: number;
  foods: [Food];
  restaurant: Restaurant;
  name: string;
};

type Food = {
  name: string;
  foodId: number;
  menuId: number;
  foodName: string;
  category: string;
  price: string;
  quantity: number;
  spiceLevel: string;
};

type Order = {
  id: number;
  restaurantId: number;
  restaurant: Restaurant;
  user: User;
  userId: number;
  transactionId: number;
  partnerId: number;
  orderDetails: [OrderDetails];
  orderDate?: Date;
  deliveryAddress: string;
  totalPrice: number;
  averagePrice: number;
  paymentStatus: string;
  orderStatus: string;
  specialInstructions: string;
  cancellationReason: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
};

type OrderDetails = {
  id: number;
  foodId: string;
  foodName: string;
  orderId: number;
  quantity: number;
  price: number;
  totalPrice: number;
  notes: string;
  status: string;
};

type UserDetails = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: null | string;
  contact: null | string;
  image: null | string;
  role: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type PaginatedUsersData = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  first: boolean;
  last: boolean;
  size: number;
  content: User[];
  number: number;
  empty: boolean;
  //   sort
  //   pageable
};

type PaginatedRestaurantsData = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Restaurant[];
  number: number;
  empty: boolean;
  //   sort
  //   pageable
};

type PaginatedMenusData = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Menu[];
  number: number;
  empty: boolean;
  //   sort
  //   pageable
};

type PaginatedFoodsData = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Food[];
  number: number;
  empty: boolean;
  //   sort
  //   pageable
};

type PaginatedOrdersData = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Order[];
  number: number;
  empty: boolean;
  //   sort
  //   pageable
};
