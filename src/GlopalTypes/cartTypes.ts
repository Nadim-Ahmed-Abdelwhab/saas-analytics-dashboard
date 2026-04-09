export interface CartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface Cart {
  id: number;
  products: CartProducts[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartProducts {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface CartData {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 1,
    totalProducts: 0,
    totalQuantity: 0,
  }

export interface CartState {
    loading: boolean;
    error: boolean;
    cartData:  Cart | null;
}
