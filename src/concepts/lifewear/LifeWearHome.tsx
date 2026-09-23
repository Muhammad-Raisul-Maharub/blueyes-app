import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, RefreshCw, Layers, Calculator, Check } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearProduct, LifeWearView } from './types'
import { LIFEWEAR_PRODUCTS } from './lifewearData'

interface LifeWearHomeProps {
  currency: Currency
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  onSelectProduct: (product: LifeWearProduct) => void
  onQuickAdd: (product: LifeWearProduct) => void
}

export const LifeWearHome: React.FC<LifeWearHomeProps> = ({
  currency,
  onNavigate: _onNavigate,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeDemographic, setActiveDemographic] = useState<LifeWearCategory>('all')
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({})
  const [bundleItems, setBundleItems] = useState<string[]>([])

  const demographics: { id: LifeWearCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
    { id: 'baby', label: 'Baby' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Filtered direct 5-column product matrix
  const displayProducts =
    activeDemographic === 'all'
      ? LIFEWEAR_PRODUCTS
      : LIFEWEAR_PRODUCTS.filter((p) => p.category === activeDemographic)

  const handleColorChange = (productId: string, colorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIndex }))
  }

  const toggleBundleSelection = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setBundleItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  // Calculate bundle discount
  const isBundleActive = bundleItems.length >= 3

  return (
    <div className="w-full flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)] pb-28 transition-colors duration-200">
      {/* =========================================================================
          1. ZERO LIFESTYLE BANNER: IMMEDIATE UTILITARIAN CATALOG HEADER & SPEC BAR
          ========================================================================= */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] py-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 border border-[var(--color-border)] bg-[var(--color-canvas)] px-2.5 py-1 text-[11px] font-mono mb-2">
              <span className="w-2 h-2 bg-[#004CE8] inline-block" />
              <span className="font-semibold text-[var(--color-text-primary)]">SERIES 04 // UTILITARIAN CATALOG</span>
              <span className="text-[var(--color-text-secondary)]">/</span>
              <span className="text-[var(--color-text-secondary)]">110–500 GSM STANDARDS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] text-left">
              Scandinavian Utilitarian Catalog
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[var(--color-text-secondary)] mt-1 text-left">
              Zero lifestyle fluff. Instant demographic switching, GSM fabric weight indexing, and live colorway swatches.
            </p>
          </div>

          {/* Quick Technical Guarantee Pills */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 font-mono text-[11px]">
            <div className="p-2 sm:p-2.5 bg-[var(--color-canvas)] border border-[var(--color-border)]">
              <span className="block text-[9px] text-[var(--color-text-secondary)] uppercase">DENSITY</span>
              <span className="font-bold text-[var(--color-text-primary)]">110–500 GSM</span>
            </div>
            <div className="p-2 sm:p-2.5 bg-[var(--color-canvas)] border border-[var(--color-border)]">
              <span className="block text-[9px] text-[var(--color-text-secondary)] uppercase">SHRINKAGE</span>
              <span className="font-bold text-[var(--color-text-primary)]">&lt; 2.0% WASH</span>
            </div>
            <div className="p-2 sm:p-2.5 bg-[var(--color-canvas)] border border-[var(--color-border)]">
              <span className="block text-[9px] text-[var(--color-text-secondary)] uppercase">DISPATCH</span>
              <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">SAME-DAY CTG</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STICKY DEMOGRAPHIC TABS & MULTI-PACK BUNDLE CALCULATOR
          Tabs: [All] [Women] [Men] [Kids] [Baby] [Accessories]
          ========================================================================= */}
      <section className="sticky top-16 z-20 w-full bg-[var(--color-canvas)]/95 backdrop-blur-md border-b border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-12 shadow-xs">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Instant Demographic Switcher Pills */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-none py-0.5">
            <span className="hidden sm:inline text-[11px] font-mono text-[var(--color-text-secondary)] mr-1 uppercase">
              TAB:
            </span>
            {demographics.map((dem) => {
              const isSelected = activeDemographic === dem.id
              const count =
                dem.id === 'all'
                  ? LIFEWEAR_PRODUCTS.length
                  : LIFEWEAR_PRODUCTS.filter((p) => p.category === dem.id).length

              return (
                <button
                  key={dem.id}
                  type="button"
                  onClick={() => setActiveDemographic(dem.id)}
                  className={`px-3.5 py-1.5 text-[12px] font-mono uppercase tracking-wider transition-colors cursor-pointer border whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold shadow-xs'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                  }`}
                >
                  [{dem.label} ({count})]
                </button>
              )
            })}
          </div>

          {/* Quick Multi-Pack Bundle Calculator Bar */}
          <div className="flex items-center gap-3 font-mono text-[11px] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#004CE8] dark:text-[#387BFF]" />
            <span className="text-[var(--color-text-secondary)]">
              BUNDLE CALCULATOR: {bundleItems.length} SELECTED
            </span>
            {isBundleActive ? (
              <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">
                15% MULTI-PACK SAVINGS ACTIVE ✓
              </span>
            ) : (
              <span className="text-[var(--color-text-muted)] text-[10px]">
                (Select {3 - bundleItems.length} more for 15% off)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DIRECT 5-COLUMN PRODUCT MATRIX ON DESKTOP (2-COL ON MOBILE)
          Features live colorway swatches directly on cards, GSM badges & bundle tools
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[var(--color-border)] font-mono">
          <div>
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
              DIRECT CATALOG FEED // {activeDemographic.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mt-0.5">
              Standard Issue Matrix
            </h2>
          </div>
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            {displayProducts.length} ARTICLES ACTIVE
          </span>
        </div>

        {/* 5-Column Responsive Grid on Desktop (grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemographic}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08, ease: 'linear' }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
          >
            {displayProducts.map((product) => {
              const activeColorIndex = selectedColors[product.id] ?? 0
              const activeColor = product.colors[activeColorIndex] || product.colors[0]
              const displayImage = activeColor?.image || product.defaultImage
              const isSelectedForBundle = bundleItems.includes(product.id)

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className={`group bg-[var(--color-canvas)] border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelectedForBundle
                      ? 'border-[#004CE8] ring-2 ring-[#004CE8]/20 shadow-md'
                      : 'border-[var(--color-border)] hover:border-[#004CE8]'
                  }`}
                >
                  {/* Top Image Stage with 4:5 Aspect Ratio */}
                  <div className="relative aspect-[4/5] bg-[var(--color-surface)] overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Top Badges: GSM & Bundle */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      <span className="px-1.5 py-0.5 bg-[var(--color-canvas)]/90 backdrop-blur-sm border border-[var(--color-border)] font-mono text-[9.5px] font-semibold text-[var(--color-text-primary)]">
                        {product.gsm} GSM
                      </span>
                      {product.bundlePriceBDT && (
                        <span className="px-1.5 py-0.5 bg-[#004CE8] text-white font-mono text-[8.5px] font-bold tracking-wider">
                          MULTI-PACK
                        </span>
                      )}
                    </div>

                    {/* Bundle Checkbox Indicator */}
                    <button
                      type="button"
                      onClick={(e) => toggleBundleSelection(product.id, e)}
                      title="Add to 3-Pack Bundle Calculator"
                      className={`absolute top-2 right-2 w-6 h-6 border flex items-center justify-center transition-all cursor-pointer z-10 ${
                        isSelectedForBundle
                          ? 'bg-[#004CE8] border-[#004CE8] text-white'
                          : 'bg-black/50 border-white/40 text-white hover:border-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick Add Overlay on Hover / Touch */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onQuickAdd(product)
                      }}
                      className="absolute bottom-0 inset-x-0 py-2.5 bg-[#004CE8] text-white font-mono text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 cursor-pointer min-h-[44px]"
                    >
                      <span>QUICK ADD</span>
                    </button>
                  </div>

                  {/* Metadata Block */}
                  <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between text-left space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[9.5px] font-mono text-[var(--color-text-secondary)] mb-0.5">
                        <span className="uppercase">{product.category}</span>
                        <span>{product.sku}</span>
                      </div>
                      <h3 className="text-[13px] sm:text-[14px] font-semibold text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[#004CE8] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[10.5px] text-[var(--color-text-secondary)] font-mono line-clamp-1 mt-0.5">
                        {product.spec}
                      </p>
                    </div>

                    {/* Interactive Live Colorway Swatches */}
                    <div className="flex items-center space-x-1.5 pt-1">
                      {product.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={(e) => handleColorChange(product.id, idx, e)}
                          title={`${color.name} (Click to switch)`}
                          className={`w-3.5 h-3.5 border transition-all cursor-pointer ${
                            idx === activeColorIndex
                              ? 'border-[#004CE8] scale-110 ring-1 ring-[#004CE8]'
                              : 'border-[var(--color-border)] hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                      <span className="text-[9.5px] font-mono text-[var(--color-text-secondary)] pl-1">
                        {product.colors.length} COL
                      </span>
                    </div>

                    {/* Price and Multi-Pack Bundle Calculator Info */}
                    <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[13px] font-bold text-[var(--color-text-primary)] block">
                          {formatPrice(product.priceBDT, product.priceUSD)}
                        </span>
                        {isBundleActive && (
                          <span className="font-mono text-[9px] text-[#004CE8] dark:text-[#387BFF] block">
                            Bundle: {formatPrice(Math.round(product.priceBDT * 0.85), Math.round(product.priceUSD * 0.85))}
                          </span>
                        )}
                      </div>

                      {product.bundlePriceBDT && (
                        <span className="text-[9.5px] font-mono text-[var(--color-text-secondary)]">
                          3-Pack: {formatPrice(product.bundlePriceBDT, product.bundlePriceUSD!)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =========================================================================
          4. COMPACT SCANDINAVIAN ENGINEERING & DISPATCH GUARANTEE
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-left">
          <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-3 text-[#004CE8] dark:text-[#387BFF]">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
              Dense Supima Cotton Calibration
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              Knitted from 100% extra-long staple Supima yarns yielding 240 GSM structural density that will not twist or deform.
            </p>
          </div>

          <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-3 text-[#004CE8] dark:text-[#387BFF]">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
              Port of Chattogram Dispatch
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              Same-day courier dispatch across Chattogram metro. 48-hour secure transit to all 64 districts in Bangladesh.
            </p>
          </div>

          <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-3 text-[#004CE8] dark:text-[#387BFF]">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
              Plastic-Free Scandinavian Packaging
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              Every shipment is sealed in 100% recycled unbleached kraft paper with zero single-use plastic films.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
