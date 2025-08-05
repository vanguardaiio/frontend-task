<template>
  <div class="p-4">
    <button
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      @click="openAddModal"
    >
      Add Product
    </button>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <DataTable :data="products" :columns="columns" :loading="false" />
    </div>


    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>

        <div class="space-y-4">
          <div>
            <label for="name">Product Name</label>
            <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" placeholder="Product Name" />
            <p v-if="form.name === ''" class="text-red-600 text-sm">{{ formErrors.name }}</p>
          </div>

          <div>
            <label for="category">Category</label>
            <select v-model="form.category" class="w-full border rounded px-3 py-2">
              <option disabled value="">Select Category</option>
              <option value="New">New</option>
              <option value="Fresh">Fresh</option>
              <option value="Old">Old</option>
            </select>
            <p v-if="!form.category" class="text-red-600 text-sm">{{ formErrors.category }}</p>
          </div>

          <div>
            <label for="price">Price</label>
            <input v-model.number="form.price" type="number" class="w-full border rounded px-3 py-2" placeholder="Price" />
            <p v-if="form.price === undefined || form.price < 0" class="text-red-600 text-sm">{{ formErrors.price }}</p>
          </div>

          <div>
            <label for="stockQuantity">Stock Quantity</label>
            <input v-model.number="form.stockQuantity" type="number" class="w-full border rounded px-3 py-2" placeholder="Stock Quantity" />
            <p v-if="form.stockQuantity === undefined || form.stockQuantity < 0" class="text-red-600 text-sm">{{ formErrors.stockQuantity }}</p>
          </div>

          <div>
            <label for="status">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2">
              <option disabled value="">Select Status</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
            <p v-if="!form.status" class="text-red-600 text-sm">{{ formErrors.status }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="saveProduct" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>

    <ConfirmActionDialog action-variant="default" v-model:open="showDeleteDialog" @continue-action="deleteProduct" @cancel-action="cancelDelete" :description="`Are you sure you want to delete this product? ${form.name || ''}`" />
  </div>
</template>

<script setup lang="ts">
import { ref, h, watch } from 'vue'
import type { Product } from './types/Product.type'
import { products } from './mock-data/mock-products'
import DataTable from './DataTable.vue'
import { createColumnHelper } from '@tanstack/vue-table'
import Button from './ui/Button.vue'
import ConfirmActionDialog from './ConfirmActionDialog.vue'

const showDeleteDialog = ref(false)
const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: ({ getValue }) => getValue(),
  }),

  columnHelper.accessor('category', {
    header: 'Category',
    cell: ({ getValue }) => getValue(),
  }),

  columnHelper.accessor('price', {
    header: 'Price',
    cell: ({ getValue }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(getValue()),
  }),

  columnHelper.accessor('stockQuantity', {
    header: 'Stock Quantity',
    cell: ({ getValue }) => {
      const quantity = getValue()
      return h('span', {
        class: quantity < 10 ? 'text-red-600 font-semibold' : ''
      }, quantity.toString())
    },
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue()
      const statusClasses = {
        in_stock: 'bg-green-100 text-green-800',
        out_of_stock: 'bg-yellow-100 text-yellow-800',
        discontinued: 'bg-red-100 text-red-800'
      }
      return h('span', {
        class: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`
      }, status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()))
    }
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row: { original } }) => {
      return h('div', { class: 'flex gap-2' }, [
        h(Button, {
          variant: 'outline',
          size: 'sm',
          onClick: () => editProduct(original)
        }, () => 'Edit'),
        h(Button, {
          variant: 'destructive',
          size: 'sm',
          onClick: () => confirmDelete(original.id)
        }, () => 'Delete')
      ])
    }
  })
]

const showModal = ref(false)
const isEditing = ref(false)
const confirmDeleteId = ref<number | null>(null)
const form = ref<Partial<Product>>({})

const formErrors = {
  name: 'Product name is required.',
  category: 'Category is required.',
  price: 'Price is required.',
  stockQuantity: 'Stock quantity is required.',
  status: 'Status is required.'
}

function openAddModal() {
  form.value = {
    name: '',
    category: '',
    price: 0,
    stockQuantity: 0,
    status: '' as Product['status']
  }
  isEditing.value = false
  showModal.value = true
}

function openEditModal(product: Product) {
  form.value = { ...product }
  isEditing.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveProduct() {
  if (!form.value.name || !form.value.category || form.value.price === undefined || form.value.stockQuantity === undefined || !form.value.status) return

  if (form.value.id === undefined) {
    const newProduct = {
      ...form.value,
      id: Date.now(),
    } as Product
    products.value.push(newProduct)
  } else {
    const index = products.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) {
      products.value[index] = { ...form.value } as Product
    }
  }
products.value = [...products.value] 

  closeModal()
}

function confirmDelete(id: number) {
  confirmDeleteId.value = id
  showDeleteDialog.value = true
}


function deleteProduct() {
  if (confirmDeleteId.value !== null) {
    products.value = products.value.filter(p => p.id !== confirmDeleteId.value)
    confirmDeleteId.value = null
    showDeleteDialog.value = false
  }

}


function editProduct(product: Product) {
  openEditModal(product)

  const index = products.value.findIndex(p => p.id === product.id)
  if (index !== -1) {
  products.value[index] = { ...(form.value as Product) }
  products.value = [...products.value]
}
}

function cancelDelete() {
  confirmDeleteId.value = null
}

</script>
