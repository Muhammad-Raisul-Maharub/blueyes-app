export type ConceptId = 'atelier' | 'district' | 'indigo' | 'lifewear' | 'family' | 'glacier'

export interface ConceptInfo {
  id: ConceptId
  number: string
  label: string
  tagline: string
}

export const CONCEPTS: ConceptInfo[] = [
  { id: 'atelier', number: '1', label: 'Atelier', tagline: 'Haute Couture Editorial' },
  { id: 'district', number: '2', label: 'District', tagline: 'Urban Streetwear & Denim' },
  { id: 'indigo', number: '3', label: 'Indigo', tagline: 'Artisanal Heritage Indigo' },
  { id: 'lifewear', number: '4', label: 'LifeWear', tagline: 'Essential Modern Minimal' },
  { id: 'family', number: '5', label: 'Family', tagline: 'Everyday Comfort & Kids' },
  { id: 'glacier', number: '6', label: 'Glacier', tagline: 'Aura of Cold Elegance' },
]

