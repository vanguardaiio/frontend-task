import { ref } from "vue";
import type { Product } from "../types/Product.type";

export const products = ref<Product[]>([
  { id: 1, name: "Apple", category: "Fresh", price: 23, stockQuantity: 123, status: 'discontinued' },
  { id: 2, name: "Banana", category: "New", price: 25, stockQuantity: 456, status: 'in_stock' },
  { id: 3, name: "Orange", category: "Old", price: 12, stockQuantity: 345, status: 'out_of_stock' },
  { id: 4, name: "Mango", category: "New", price: 12, stockQuantity: 345, status: 'in_stock' }
])
