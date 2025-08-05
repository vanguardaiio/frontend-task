import type { Product } from "../components/types/Product.type"

export function statusText(status: Product['status']) {
  switch (status) {
    case 'in_stock':
      return 'In Stock'
    case 'out_of_stock':
      return 'Out of Stock'
    case 'discontinued':
      return 'Discontinued'
  }
}

export function getStatusClass(status: Product['status']) {
  return {
    in_stock: 'bg-green-100 text-green-800',
    out_of_stock: 'bg-yellow-100 text-yellow-800',
    discontinued: 'bg-red-100 text-red-800'
  }[status] ?? ''
}
