import React, { useState, useMemo } from 'react'
import type { DistrictProduct } from './types'
import { DISTRICT_PRODUCTS } from './districtData'
import { Search, X, Zap, Eye } from 'lucide-react'

interface DistrictSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: DistrictProduct) => void
}

export const DistrictSearchModal: React.FC<DistrictSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('')

  const quickTags = [
    '480 GSM',
    'Hoodie',
    'Cargo Pants',
    'Denim',
    'Tech-Fleece',
    'Kids Boxy',
    'Baby Romper',
    'Cordura Bag',
  ]

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return DISTRICT_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        String(p.gsm).toLowerCase().includes(q)
    )
  }, [query])

  if (!isOpen) return null

  const handleSelect = (product: DistrictProduct) => {
    onSelectProduct(product)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-16 sm:pt-24 px-4 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#12141C] border border-[#E2E8F0] dark:border-[#2C3142] shadow-[5px_5px_0px_0px_#0047FF] overflow-hidden z-10 transition-colors">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] dark:border-[#2C3142] flex items-center gap-3 bg-[#ECEEF2] dark:bg-[#090A0E]">
          <Search className="w-5 h-5 text-[#0047FF] dark:text-[#CCFF00] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH STREETWEAR ARCHIVE (E.G. '480 GSM', 'CARGO', 'HOODIE')..."
            autoFocus
            className="w-full bg-transparent border-none text-[#090A0E] dark:text-white font-mono-tech text-[12px] sm:text-[13px] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] focus:outline-none uppercase font-bold"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#1B1E2B] text-[#090A0E] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] border border-[#E2E8F0] dark:border-[#2C3142] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-4 bg-[#F4F4F6] dark:bg-[#090A0E] border-b border-[#E2E8F0] dark:border-[#2C3142] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono-tech text-[9px] uppercase text-[#64748B] dark:text-[#94A3B8] tracking-widest whitespace-nowrap">
            TOP TAGS:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-white dark:bg-[#12141C] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] text-[#090A0E] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] font-mono-tech text-[10px] uppercase font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results / Empty State */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="py-10 text-center">
              <Zap className="w-8 h-8 text-[#0047FF] mx-auto mb-2 opacity-80" />
              <p className="font-space font-bold text-[#090A0E] dark:text-white text-[14px] uppercase">
                DISTRICT STREETWEAR CATALOG
              </p>
              <p className="font-dm text-[12px] text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto mt-1">
                Enter keyword, GSM textile weight, or garment name to filter products instantly.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-mono-tech text-[12px] text-[#64748B] dark:text-[#94A3B8] uppercase">
                NO PIECES MATCHED "{query.toUpperCase()}"
              </p>
              <p className="font-dm text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-1">
                Try searching 'Hoodie', 'Cargo', 'Denim', or '480 GSM'.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest mb-3">
                <span>FOUND {results.length} MATCHING ARCHIVE PIECES</span>
                <span className="text-[#0047FF] dark:text-[#CCFF00]">EXPRESS DISPATCH</span>
              </div>
              {results.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelect(prod)}
                  className="flex items-center gap-3 p-2.5 bg-[#F4F4F6] dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all cursor-pointer group"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-14 h-16 object-cover bg-white dark:bg-[#1B1E2B] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono-tech text-[9px] text-[#0047FF] uppercase font-bold">
                        {prod.category}
                      </span>
                      <span className="font-mono-tech text-[9px] text-[#0047FF] dark:text-[#CCFF00] uppercase">
                        {prod.gsm} GSM
                      </span>
                      <span className="font-mono-tech text-[9px] text-[#64748B] dark:text-[#94A3B8] uppercase">
                        {prod.fit}
                      </span>
                    </div>
                    <h4 className="font-space font-bold text-[13px] text-[#090A0E] dark:text-white truncate group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors uppercase">
                      {prod.title}
                    </h4>
                    <p className="font-mono-tech text-[12px] font-bold text-[#090A0E] dark:text-white">
                      ৳{prod.priceBDT.toLocaleString()}
                      <span className="text-[#64748B] dark:text-[#94A3B8] text-[10px] ml-1.5 font-normal">
                        (${prod.priceUSD})
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`View ${prod.title}`}
                    className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#1B1E2B] text-[#090A0E] dark:text-white group-hover:bg-[#CCFF00] group-hover:text-[#090A0E] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
