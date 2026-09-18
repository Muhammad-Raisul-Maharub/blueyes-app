export type Currency = 'BDT' | 'USD'

export type LifeWearCategory = 'all' | 'women' | 'men' | 'kids' | 'baby' | 'accessories'

export type LifeWearView = 'home' | 'women' | 'men' | 'kids' | 'baby' | 'accessories' | 'lookbook' | 'about' | 'pdp'

export type BabyAgeBracket = 'all' | '0-3M' | '3-6M' | '6-12M' | '12-24M'
export type KidsAgeBracket = 'all' | '2-7Y' | '8-15Y'
export type AgeBracket = BabyAgeBracket | KidsAgeBracket

export interface ProductColor {
  name: string
  hex: string
  image: string
}

export interface LifeWearProduct {
  id: string
  sku: string
  name: string
  subtitle: string
  category: 'women' | 'men' | 'kids' | 'baby' | 'accessories'
  ageBracket?: '0-3M' | '3-6M' | '6-12M' | '12-24M' | '2-7Y' | '8-15Y'
  priceBDT: number
  priceUSD: number
  bundlePriceBDT?: number
  bundlePriceUSD?: number
  bundleQuantity?: number
  bundleSavingsBDT?: number
  bundleSavingsUSD?: number
  gsm: number
  spec: string
  composition: string
  shrinkage: string
  fit: string
  weave: string
  origin: string
  description: string
  features: string[]
  colors: ProductColor[]
  sizes: string[]
  defaultImage: string
  galleryImages: string[]
  isNew?: boolean
  isClearance?: boolean
  rating: number
  reviewCount: number
}

export interface LifeWearCartItem {
  cartId: string
  productId: string
  product: LifeWearProduct
  color: ProductColor
  size: string
  quantity: number
  isBundle?: boolean
}

export interface CategoryFilterState {
  ageBracket: string
  gsmMin: number
  gsmMax: number
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'gsm-desc'
}
