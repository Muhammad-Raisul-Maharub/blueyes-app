export type Language = 'en' | 'bn'

export type IndigoCategory = 'Women' | 'Men' | 'Kids' | 'Baby' | 'Accessories'

export type IndigoView =
  | 'home'
  | 'women'
  | 'men'
  | 'kids'
  | 'baby'
  | 'accessories'
  | 'lookbook'
  | 'about'
  | 'pdp'

export interface ColorSwatch {
  name: string
  nameBn: string
  hex: string
}

export interface SizeMeasurement {
  size: string
  chest?: string
  length?: string
  waist?: string
  hips?: string
}

export interface IndigoProduct {
  id: string
  title: string
  titleBn: string
  category: IndigoCategory
  craftTag: string
  craftTagBn: string
  artisanOrigin: string
  artisanOriginBn: string
  fabric: string
  fabricBn: string
  weaveTimeDays: number
  priceBDT: number
  priceUSD: number
  images: string[]
  description: string
  descriptionBn: string
  features: string[]
  featuresBn: string[]
  sizes: string[]
  sizeMeasurements: SizeMeasurement[]
  colors: ColorSwatch[]
  inStock: boolean
  isHero?: boolean
  isFeatured?: boolean
  ageBracket?: string[]
}

export interface IndigoCartItem {
  id: string
  product: IndigoProduct
  selectedSize: string
  selectedColor: string
  quantity: number
}

export type DeliveryZone = 'chattogram' | 'nationwide' | 'global'
