import React, { useState, useMemo } from 'react'
import { ArrowLeft, RotateCcw, ThermometerSnowflake } from 'lucide-react'
import type { GlacierProduct, GlacierCategory, Currency } from './types'
import { GLACIER_PRODUCTS } from './glacierData'

interface GlacierCategoryPageProps {
  category: GlacierCategory
  onSelectProduct: (product: GlacierProduct) => void
  onNavigateHome: () => void
  onSelectCategory: (cat: GlacierCategory) => void
  onQuickAdd: (product: GlacierProduct) => void
  currency: Currency
}

export const GlacierCategoryPage: React.FC<GlacierCategoryPageProps> = ({
  category,
  onSelectProduct,
  onNavigateHome,
  onSelectCategory,
  onQuickAdd,
  currency,
}) => {
  // Filter state
  const [selectedFiber, setSelectedFiber] = useState<string>('All')
  const [selectedGsmBracket, setSelectedGsmBracket] = useState<string>('All')
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'featured' | 'scarcity' | 'gsm-desc' | 'price-asc' | 'price-desc'>('featured')

  // Available fiber types
  const fiberTypes = [
    'All',
    'Hydro-Silk',
    'Thermal Crepe',
    'Alpine Wool',
    'Bonded Tech',
    'Insulated Down',
    'Merino',
    'Titanium & Optical',
  ]

  // Available GSM brackets
  const gsmBrackets = [
    { label: 'All GSM', value: 'All' },
    { label: 'Ultralight (<250)', value: 'light' },
    { label: 'Mid-Dense (250–450)', value: 'mid' },
    { label: 'Sub-Zero Heavy (450+)', value: 'heavy' },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return GLACIER_PRODUCTS.filter((product) => {
      // Category filter
      if (category !== 'All' && product.category !== category) {
        return false
      }

      // Fiber type filter
      if (selectedFiber !== 'All' && product.techFiberType !== selectedFiber) {
        return false
      }

      // GSM filter
      if (selectedGsmBracket === 'light' && product.thermalGsm >= 250) {
        return false
      }
      if (selectedGsmBracket === 'mid' && (product.thermalGsm < 250 || product.thermalGsm > 450)) {
        return false
      }
      if (selectedGsmBracket === 'heavy' && product.thermalGsm <= 450) {
        return false
      }

      // Size filter
      if (selectedSize !== 'All') {
        const hasSize = product.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase()))
        if (!hasSize) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'scarcity') {
        return a.scarcityRemaining - b.scarcityRemaining
      }
      if (sortBy === 'gsm-desc') {
        return b.thermalGsm - a.thermalGsm
      }
      if (sortBy === 'price-asc') {
        return (currency === 'BDT' ? a.priceBDT - b.priceBDT : a.priceUSD - b.priceUSD)
      }
      if (sortBy === 'price-desc') {
        return (currency === 'BDT' ? b.priceBDT - a.priceBDT : b.priceUSD - a.priceUSD)
      }
      return 0
    })
  }, [category, selectedFiber, selectedGsmBracket, selectedSize, sortBy, currency])

  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  const resetFilters = () => {
    setSelectedFiber('All')
    setSelectedGsmBracket('All')
    setSelectedSize('All')
    setSortBy('featured')
  }

  const categoriesList: GlacierCategory[] = ['All', 'Women', 'Men', 'Kids', 'Baby', 'Accessories']

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 pb-28">
      {/* 1. Breadcrumb & Title */}
      <div className="flex flex-col gap-3 mb-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-[11px] font-space-mono text-slate-500 dark:text-sky-300/70 hover:text-[#0284C7] dark:hover:text-[#7DD3FC] transition-colors w-fit cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO GLACIER HUB</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-200 dark:border-sky-400/20 pb-6">
          <div>
            <span className="font-space-mono text-[11px] font-bold tracking-[0.25em] text-[#0284C7] dark:text-[#7DD3FC] uppercase block mb-1">
              SUITE CATALOG • {category.toUpperCase()}
            </span>
            <h1 className="font-syne font-extrabold text-[32px] sm:text-[46px] tracking-[-0.03em] text-[#082F49] dark:text-[#F0F9FF] uppercase leading-none">
              {category === 'All' ? 'All Archival Works' : `${category} Collection`}
            </h1>
          </div>
          <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 max-w-md text-left">
            Sub-zero architectural garments engineered from closed-loop hydro-powered fibers. Audited for thermal retention across variable winter conditions.
          </p>
        </div>
      </div>

      {/* 2. Demographic Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-6">
        {categoriesList.map((cat) => {
          const isActive = category === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 font-space text-[12px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#030712] shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-white/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 border border-sky-200 dark:border-sky-400/20 hover:border-[#38BDF8]'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* 3. Luminescent Filter Controls Bar */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/25 p-4 sm:p-5 mb-8 shadow-sm flex flex-col gap-4">
        {/* Row 1: Tech-Fiber Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-space-mono text-[10px] font-bold text-slate-400 uppercase shrink-0 min-w-[110px]">
            TECH-FIBER:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {fiberTypes.map((fiber) => {
              const isSelected = selectedFiber === fiber
              return (
                <button
                  key={fiber}
                  type="button"
                  onClick={() => setSelectedFiber(fiber)}
                  className={`px-2.5 py-1 text-[11px] font-space-mono rounded-none whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold border border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-transparent hover:border-sky-400/30'
                  }`}
                >
                  {fiber}
                </button>
              )
            })}
          </div>
        </div>

        {/* Row 2: Thermal GSM Brackets & Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-sky-100 dark:border-sky-400/15">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-space-mono text-[10px] font-bold text-slate-400 uppercase shrink-0 min-w-[110px]">
              THERMAL GSM:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {gsmBrackets.map((gsm) => {
                const isSelected = selectedGsmBracket === gsm.value
                return (
                  <button
                    key={gsm.value}
                    type="button"
                    onClick={() => setSelectedGsmBracket(gsm.value)}
                    className={`px-2.5 py-1 text-[11px] font-space-mono rounded-none whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0284C7] dark:bg-[#7DD3FC] text-white dark:text-[#030712] font-bold shadow-[0_0_12px_rgba(125,211,252,0.3)]'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-transparent hover:border-sky-400/30'
                    }`}
                  >
                    {gsm.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="font-space-mono text-[10px] font-bold text-slate-400 uppercase">
              ORDER:
            </span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'featured'
                    | 'scarcity'
                    | 'gsm-desc'
                    | 'price-asc'
                    | 'price-desc'
                )
              }
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-sky-200 border border-sky-300 dark:border-sky-400/30 font-space-mono text-[11px] px-3 py-1.5 rounded-none cursor-pointer focus:outline-none focus:border-sky-400"
            >
              <option value="featured">Featured Archive</option>
              <option value="scarcity">Scarcity (Fewest Left)</option>
              <option value="gsm-desc">Thermal GSM (Highest)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {(selectedFiber !== 'All' || selectedGsmBracket !== 'All' || selectedSize !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="p-1.5 text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                title="Reset active filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Filter Counter & Results Indicator */}
      <div className="flex items-center justify-between text-[11px] font-space-mono text-slate-500 dark:text-slate-400 mb-6">
        <span>
          SHOWING <strong className="text-[#0284C7] dark:text-[#7DD3FC]">{filteredProducts.length}</strong> ARCHIVAL RELEASES
        </span>
        <span className="hidden sm:inline">
          CHATTOGRAM 24H DISPATCH • ALL 64 DISTRICTS
        </span>
      </div>

      {/* 5. Product Grid (4-col on desktop, 2-col on mobile) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-sky-200 dark:border-sky-400/20 hover:border-[#38BDF8] transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(125,211,252,0.18)]"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative w-full aspect-[4/5] overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />

                {/* Scarcity Tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-[#7DD3FC] text-[9px] font-space-mono font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                    {product.stockScarcity}
                  </span>
                </div>

                {/* Multi-angle indicator */}
                <div className="absolute bottom-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-1.5 py-0.5 bg-black/70 text-sky-200 text-[8px] font-space-mono uppercase">
                    {product.images.length} ANGLES
                  </span>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-space-mono text-[9px] uppercase font-bold text-[#0284C7] dark:text-[#7DD3FC]">
                      {product.techFiberType}
                    </span>
                    <span className="font-space-mono text-[9px] text-slate-400">
                      {product.thermalGsm} GSM
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-syne font-extrabold text-[14px] sm:text-[16px] text-[#082F49] dark:text-[#F0F9FF] leading-snug cursor-pointer group-hover:text-[#0284C7] dark:group-hover:text-[#7DD3FC] transition-colors line-clamp-1 mb-1"
                  >
                    {product.title}
                  </h3>

                  <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 text-left mb-3">
                    {product.spec}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-sky-100 dark:border-sky-400/15 flex items-center justify-between gap-1.5">
                  <span className="font-space-mono font-bold text-[14px] sm:text-[15px] text-[#082F49] dark:text-[#F0F9FF]">
                    {formatPrice(product.priceBDT, product.priceUSD)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className="px-2.5 py-1.5 bg-[#0284C7] dark:bg-sky-500/20 hover:bg-sky-700 dark:hover:bg-[#38BDF8] text-white dark:text-[#7DD3FC] dark:hover:text-[#030712] border border-sky-400/30 font-space font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Acquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-sky-300/30 flex flex-col items-center justify-center">
          <ThermometerSnowflake className="w-12 h-12 text-[#7DD3FC] mb-3" />
          <h3 className="font-syne font-bold text-[20px] text-white uppercase mb-2">
            No Archival Matches Found
          </h3>
          <p className="font-sans text-[13px] text-slate-400 max-w-sm mb-6">
            There are currently no garments matching your selected fiber type and GSM parameters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#38BDF8] text-[#030712] font-space font-bold text-[11px] uppercase tracking-wider cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
