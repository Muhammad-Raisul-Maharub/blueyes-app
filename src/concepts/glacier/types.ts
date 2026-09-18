export type GlacierView =
  | 'home'
  | 'women'
  | 'men'
  | 'kids'
  | 'baby'
  | 'accessories'
  | 'lookbook'
  | 'about'
  | 'pdp'

export type GlacierCategory = 'Women' | 'Men' | 'Kids' | 'Baby' | 'Accessories' | 'All'

export type Currency = 'BDT' | 'USD'

export interface GlacierColor {
  name: string
  hex: string
  borderHex?: string
}

export interface GlacierProduct {
  id: string
  title: string
  subtitle: string
  priceBDT: number
  priceUSD: number
  category: GlacierCategory
  demographic: 'Women' | 'Men' | 'Kids' | 'Baby' | 'Accessories'
  spec: string
  thermalRating: string
  thermalGsm: number
  techFiberType: string
  zeroWasteCred: string
  stockScarcity: string
  scarcityRemaining: number
  scarcityTotal: number
  description: string
  engineeringDetails: string[]
  sizes: string[]
  colors: GlacierColor[]
  images: string[]
  isArchivalDrop?: boolean
  badge?: string
}

export interface GlacierCartItem {
  id: string
  product: GlacierProduct
  selectedSize: string
  selectedColor: string
  quantity: number
}

export interface GlacierFilterState {
  category: GlacierCategory
  fiberType: string
  gsmBracket: string
  size: string
  sortBy: 'featured' | 'scarcity' | 'price-asc' | 'price-desc' | 'gsm-desc'
}
