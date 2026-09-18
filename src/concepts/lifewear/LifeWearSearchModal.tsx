import React, { useState } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import type { Currency, LifeWearProduct } from './types'
import { LIFEWEAR_PRODUCTS } from './lifewearData'

interface LifeWearSearchModalProps {
  isOpen: boolean
  onClose: () => void
  currency: Currency
  onSelectProduct: (product: LifeWearProduct) => void
}

export const LifeWearSearchModal: React.FC<LifeWearSearchModalProps> = ({
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
    ? LIFEWEAR_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.spec.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : LIFEWEAR_PRODUCTS.slice(0, 4)

  const handleSelect = (product: LifeWearProduct) => {
    onSelectProduct(product)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl bg-[var(--color-canvas)] border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#004CE8] dark:text-[#387BFF]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GSM, Supima, Cotton, Backpack, SKU..."
            className="flex-1 bg-transparent text-sm sm:text-base font-mono text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-canvas)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[var(--color-border)]">
          <div className="pb-2 text-[10px] font-mono text-[var(--color-text-secondary)] uppercase">
            {query.trim() ? `FOUND ${results.length} MATCHING SPECIFICATIONS` : 'POPULAR ESSENTIAL STANDARDS'}
          </div>

          {results.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleSelect(prod)}
              className="py-3 flex items-center justify-between hover:bg-[var(--color-surface)] px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={prod.defaultImage}
                  alt={prod.name}
                  className="w-12 h-14 object-cover border border-[var(--color-border)]"
                />
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--color-text-secondary)]">
                    <span className="uppercase">{prod.category}</span>
                    <span>•</span>
                    <span className="text-[#004CE8] dark:text-[#387BFF] font-bold">{prod.gsm} GSM</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[#004CE8]">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-secondary)] font-mono">{prod.spec}</p>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                  {formatPrice(prod.priceBDT, prod.priceUSD)}
                </span>
                <span className="text-[10px] text-[#004CE8] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>SELECT</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-xs font-mono text-[var(--color-text-secondary)]">
              No matching utilitarian garment specifications found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
