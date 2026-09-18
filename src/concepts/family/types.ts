export type Currency = 'BDT' | 'USD'

export type FamilyDemographic = 'all' | 'baby' | 'kids' | 'mom' | 'dad' | 'matching'

export type FamilyAgeBracket = 'all' | 'newborn-0-3m' | 'infant-3-6m' | 'toddler-2-7y' | 'junior-8-15y'

export type FamilyView = 'home' | 'category' | 'pdp' | 'hub' | 'about'

export interface SizingMetricRow {
  size: string
  height: string
  weight: string
  chest?: string
  waist?: string
}

export interface FamilyProductColor {
  name: string
  hex: string
  image: string
}

export interface MatchingMemberOption {
  role: 'Mom' | 'Dad' | 'Toddler' | 'Baby' | 'Sibling'
  title: string
  priceBDT: number
  priceUSD: number
  image: string
}

export interface FamilyProduct {
  id: string
  sku: string
  title: string
  subtitle: string
  demographic: FamilyDemographic
  ageBracket?: FamilyAgeBracket
  priceBDT: number
  priceUSD: number
  matchFamilyTag?: string
  matchingMembers?: MatchingMemberOption[]
  organicCert: string
  developmentalStage: string
  fabricDescription: string
  sizingData: {
    metric: SizingMetricRow[]
    imperial: SizingMetricRow[]
  }
  colors: FamilyProductColor[]
  sizes: string[]
  defaultImage: string
  galleryImages: string[]
  rating: number
  reviewCount: number
  badge?: string
}

export interface FamilyCartItem {
  id: string
  productId: string
  product: FamilyProduct
  selectedColor: FamilyProductColor
  selectedSize: string
  quantity: number
  bundledMembers?: string[]
}

export interface FamilyLoyaltyChild {
  id: string
  name: string
  birthdate: string
  ageYears: number
  stageLabel: string
  nextMilestone: string
  voucherCode: string
  discountPercent: number
}
