export type DistrictView =
  | 'home'
  | 'women'
  | 'men'
  | 'kids'
  | 'baby'
  | 'accessories'
  | 'lookbook'
  | 'about'
  | 'pdp'

export type DistrictCategory = 'All' | 'Women' | 'Men' | 'Kids' | 'Baby' | 'Accessories'

export interface DistrictProduct {
  id: string
  title: string
  category: DistrictCategory
  subcategory: string
  gsm: number | string
  fit: string
  fabric: string
  priceBDT: number
  priceUSD: number
  badge?: string
  stockLeft: number
  images: string[]
  videoBadge?: boolean
  description: string
  specs: string[]
  sizes: string[]
  colors: { name: string; hex: string; preview: string }[]
  inStock: boolean
}

export interface DistrictCartItem {
  id: string
  product: DistrictProduct
  selectedSize: string
  selectedColor: string
  quantity: number
}

export type PaymentMethod = 'bkash' | 'cod' | 'card'
