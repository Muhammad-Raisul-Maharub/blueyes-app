import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowUpRight } from 'lucide-react'
import type { GlacierProduct, Currency } from './types'
import { GLACIER_PRODUCTS } from './glacierData'

interface GlacierSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: GlacierProduct) => void
  currency: Currency
}

export const GlacierSearchModal: React.FC<GlacierSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  currency,
}) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Filter products by keyword
  const results = GLACIER_PRODUCTS.filter((p) => {
    if (!query.trim()) return false
    const q = query.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.spec.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.techFiberType.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  })

  const quickKeywords = ['Hydro-Silk', 'Thermal Crepe', 'Down Coat', 'Merino Wool', 'Panjabi', 'Titanium', 'Puffer']

  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  const handleSelect = (product: GlacierProduct) => {
    onSelectProduct(product)
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#030712]/92 text-[#F0F9FF] backdrop-blur-2xl border border-sky-400/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-sky-400/20 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#38BDF8]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH ARCHIVE (E.G., HYDRO-SILK, OVERCOAT, MERINO)..."
                className="flex-1 bg-transparent text-[14px] sm:text-[15px] font-space-mono text-white placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="px-2.5 py-1 text-[11px] font-space-mono bg-slate-900 border border-sky-400/20 text-slate-400 hover:text-white cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Quick Keyword Pills */}
            <div className="p-3.5 bg-slate-950/60 border-b border-sky-400/15 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-space-mono text-slate-400 shrink-0">TAGS:</span>
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setQuery(kw)}
                  className="px-2 py-0.5 text-[10px] font-space-mono bg-sky-950/50 hover:bg-sky-900 text-[#7DD3FC] border border-sky-400/30 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2.5">
              {query.trim() && results.length === 0 && (
                <div className="py-12 text-center text-slate-400 font-space text-[13px]">
                  No sub-zero garments match "{query}". Try searching by fiber or garment type.
                </div>
              )}

              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="p-3 bg-slate-950/60 border border-sky-400/20 hover:border-sky-400/60 hover:bg-sky-950/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-12 h-14 object-cover border border-sky-400/30 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-space-mono text-[9px] text-[#7DD3FC] font-bold uppercase">
                          {product.category}
                        </span>
                        <span className="font-space-mono text-[9px] text-slate-400">
                          {product.thermalGsm} GSM
                        </span>
                      </div>
                      <h4 className="font-syne font-bold text-[14px] text-white group-hover:text-[#7DD3FC] transition-colors line-clamp-1">
                        {product.title}
                      </h4>
                      <span className="font-space-mono text-[10px] text-slate-400 line-clamp-1">
                        {product.spec}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-space-mono font-bold text-[13px] text-[#7DD3FC]">
                      {formatPrice(product.priceBDT, product.priceUSD)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}

              {!query.trim() && (
                <div className="py-8 text-center text-slate-500 font-space-mono text-[11px]">
                  ENTER KEYWORDS TO EXPLORE THE 15 SUB-ZERO ARCHIVAL PIECES
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
