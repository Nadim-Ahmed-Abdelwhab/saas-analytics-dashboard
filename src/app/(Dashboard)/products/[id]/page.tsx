import ProductDetailsClient from '@/components/products/ProductDetailsClient';
import axios from "axios";
import { Product, ProductParams } from "@/GlopalTypes/productsTypes";

export default async function ProductDetails({ params }: ProductParams) {
  const { id } = await params;

  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  const product: Product = res.data;

  return <ProductDetailsClient product={product} />;
}