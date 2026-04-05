
//  Root Response

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


//  Product

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}


//  Dimensions

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}


//  Review

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}


//  Meta

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}


//  Availability Status

export type AvailabilityStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";


//  State (Redux)

export interface ProductState {
  loading: boolean;
  error: boolean;
  productData: ProductsResponse | null;
}


//  Params (Next.js)

export interface ProductParams {
  params: {
    id: string;
  };
}

export interface ProductsState  {
    loading: boolean,
    error: boolean,
    product: ProductsResponse | null  
}