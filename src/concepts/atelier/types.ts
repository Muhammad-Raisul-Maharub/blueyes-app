export type AtelierView =
  | 'home'
  | 'women'
  | 'men'
  | 'kids'
  | 'baby'
  | 'accessories'
  | 'lookbook'
  | 'about'
  | 'pdp'
  | 'curate'
  | 'vip'

export type Demographic = 'All' | 'Women' | 'Men' | 'Kids' | 'Baby' | 'Accessories'

export type GarmentFit =
  | 'Architectural Slim'
  | 'Fluid Draped'
  | 'Relaxed Atelier'
  | 'Structured Tailoring'
  | 'Traditional Royal'
  | 'Classic Tailored'

export type GarmentSize =
  | '0-6M'
  | '6-12M'
  | '12-24M'
  | '2-4Y'
  | '5-7Y'
  | '8-11Y'
  | '12-15Y'
  | '36 / XXS'
  | '38 / XS'
  | '40 / S'
  | '42 / M'
  | '44 / L'
  | '46 / XL'
  | 'One Size'
  | 'Bespoke M2M'

export type DeliveryZone =
  | 'chattogram'
  | 'dhaka_nationwide'
  | 'international'

export interface DeliveryEstimate {
  zone: DeliveryZone
  title: string
  eta: string
  costBDT: number
  costUSD: number
  freeThresholdBDT: number
  freeThresholdUSD: number
  courier: string
  description: string
}

export interface Product {
  id: string
  title: string
  edition: string
  category: Demographic
  subcategory?: string
  silhouette?: string
  fabric: string
  priceBDT: number
  priceUSD: number
  vipPriceBDT: number
  vipPriceUSD: number
  badge?: string
  images: string[]
  description: string
  composition: string
  provenance: string
  care: string
  tailoringNotes: string
  sizes: GarmentSize[]
  fits: GarmentFit[]
  colors: { name: string; hex: string; preview: string }[]
  inStock: boolean
  isLimited: boolean
  limitedCount?: number
}

export interface CartItem {
  id: string
  product: Product
  selectedSize: GarmentSize
  selectedColor: string
  quantity: number
}

export interface BookingDetails {
  salon:
    | 'Chattogram Flagship Salon • GEC Circle'
    | 'Dhaka Liaison Suite • Gulshan 2'
    | 'Virtual International Fitting (London / New York)'
  date: string
  time: string
  service:
    | 'Bespoke 28-Point Fitting & Tailoring'
    | 'Bridal & Formal Wedding Trousseau'
    | 'VIP Private Silk & Jamdani Archive'
  guestName: string
  phone: string
  email?: string
  notes?: string
}
