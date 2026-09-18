import React, { useState } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import type { Currency, FamilyProduct } from './types'
import { FAMILY_PRODUCTS } from './familyData'

interface FamilySearchModalProps {
  isOpen: boolean
  onClose: () => void
  currency: Currency
  onSelectProduct: (product: FamilyProduct) => void
}

export const FamilySearchModal: React.FC<FamilySearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  const results = query.trim()
    ? FAMILY_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.demographic.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : FAMILY_PRODUCTS.slice(0, 4)

  const handleSelect = (product: FamilyProduct) => {
    onSelectProduct(product)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs select-none font-['Public_Sans']">
      <div className="w-full max-w-2xl bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Search Input */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#175CD3]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organic layettes, matching sets, polos, dresses..."
            className="flex-1 bg-transparent text-sm sm:text-base font-bold text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[var(--color-border)]">
          <div className="pb-2 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase">
            {query.trim() ? `Found ${results.length} family items` : 'Popular Family Searches'}
          </div>

          {results.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleSelect(prod)}
              className="py-3 flex items-center justify-between hover:bg-[var(--color-surface-soft)] px-3 rounded-2xl transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={prod.defaultImage}
                  alt={prod.title}
                  className="w-12 h-14 object-cover rounded-xl border border-[var(--color-border)]"
                />
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                    <span>{prod.demographic}</span>
                    <span>•</span>
                    <span className="text-[#175CD3] dark:text-[#4E8DFF]">{prod.sku}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#175CD3]">
                    {prod.title}
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">{prod.subtitle}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[var(--color-text-primary)] block font-['Outfit']">
                  {formatPrice(prod.priceBDT, prod.priceUSD)}
                </span>
                <span className="text-[10px] text-[#175CD3] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-xs font-semibold text-[var(--color-text-secondary)]">
              No matching family essentials found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
