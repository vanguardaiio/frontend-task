export interface Product {
  id: number
  name: string
  category: "New" | "Old" | "Fresh"| ""
  price: number
  stockQuantity: number
  status: 'in_stock' | 'out_of_stock' | 'discontinued'
  createdAt?: string | Date
}