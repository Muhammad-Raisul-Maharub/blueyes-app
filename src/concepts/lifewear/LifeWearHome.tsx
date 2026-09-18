import React, { useState } from 'react'
import { ArrowRight, Truck, RefreshCw, Layers } from 'lucide-react'
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
  onNavigate,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeDemographic, setActiveDemographic] = useState<LifeWearCategory>('all')
  // Active colorway state for fast-browse cards
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({})

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

  // Filtered fast-browse rail products
  const fastBrowseProducts =
    activeDemographic === 'all'
      ? LIFEWEAR_PRODUCTS.slice(0, 8)
      : LIFEWEAR_PRODUCTS.filter((p) => p.category === activeDemographic)

  const handleColorChange = (productId: string, colorIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIndex }))
  }

  return (
    <div className="w-full flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* 1. Hero Section: Architectural Split Layout */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px]">
          {/* Left Column: Spec Sheet & Manifesto */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
            <div className="space-y-4">
              {/* Technical Badge */}
              <div className="inline-flex items-center space-x-2 border border-[var(--color-border)] bg-[var(--color-canvas)] px-2.5 py-1 text-[11px] font-mono">
                <span className="w-2 h-2 bg-[#004CE8] inline-block" />
                <span className="font-semibold text-[var(--color-text-primary)]">SERIES 04</span>
                <span className="text-[var(--color-text-secondary)]">/</span>
                <span className="text-[var(--color-text-secondary)]">PORT OF CHATTOGRAM</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] text-[var(--color-text-primary)] text-left">
                Utilitarian Staples Engineered for Daily Life.
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg text-left">
                Scandinavian functionalism meets Bangladesh textile excellence. Every garment is calibrated for climate endurance, high-density GSM, and structural comfort.
              </p>
            </div>

            {/* Spec Matrix Grid */}
            <div className="my-8 grid grid-cols-3 gap-3 border-y border-[var(--color-border)] py-4 font-mono text-[11px]">
              <div>
                <span className="block text-[var(--color-text-secondary)] text-[10px] uppercase">FABRIC RANGE</span>
                <span className="font-bold text-[var(--color-text-primary)]">110–500 GSM</span>
              </div>
              <div className="border-x border-[var(--color-border)] px-3">
                <span className="block text-[var(--color-text-secondary)] text-[10px] uppercase">SHRINKAGE</span>
                <span className="font-bold text-[var(--color-text-primary)]">&lt; 2.0% WASH</span>
              </div>
              <div className="pl-2">
                <span className="block text-[var(--color-text-secondary)] text-[10px] uppercase">DISPATCH</span>
                <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">SAME-DAY CTG</span>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('men', 'men')}
                className="px-6 py-3.5 bg-[#004CE8] hover:bg-[#0039B4] text-white font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <span>SHOP MEN ESSENTIALS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('women', 'women')}
                className="px-6 py-3.5 border border-[var(--color-border)] bg-[var(--color-canvas)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-mono text-[12px] font-medium tracking-wider uppercase transition-colors cursor-pointer"
              >
                SHOP WOMEN
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual & Garment Blueprint Overlay */}
          <div className="lg:col-span-6 relative bg-[var(--color-canvas)] overflow-hidden min-h-[360px] lg:min-h-full flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
              alt="Blu Eyes LifeWear Heavyweight Supima"
              className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-[105%]"
            />
            {/* Tech Blueprint Callout Tag */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-4 bg-[var(--color-canvas)]/95 backdrop-blur-md border border-[var(--color-border)] font-mono text-[11px] shadow-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)]">
                <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">LW-M240 // SIGNATURE</span>
                <span className="text-[10px] text-[var(--color-text-secondary)]">240 GSM</span>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-tight text-left">
                Double-needle ribbed crew collar with zero side-twist tubular knitting construction.
              </p>
              <div className="mt-2 text-right">
                <span className="font-bold text-[var(--color-text-primary)]">
                  {formatPrice(850, 8)} • 3-Pack {formatPrice(2100, 19)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demographic Quick-Switch Pill Bar */}
      <div className="sticky top-[105px] z-30 w-full bg-[var(--color-canvas)]/95 backdrop-blur-md border-b border-[var(--color-border)] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="hidden sm:inline text-[11px] font-mono text-[var(--color-text-secondary)] mr-2 uppercase">
              FILTER:
            </span>
            {demographics.map((dem) => {
              const isSelected = activeDemographic === dem.id
              return (
                <button
                  key={dem.id}
                  type="button"
                  onClick={() => setActiveDemographic(dem.id)}
                  className={`px-3.5 py-1.5 text-[12px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                  }`}
                >
                  [{dem.label}]
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate(activeDemographic === 'all' ? 'women' : (activeDemographic as LifeWearView), activeDemographic)}
            className="hidden md:inline-flex items-center space-x-1.5 text-[11px] font-mono text-[#004CE8] dark:text-[#387BFF] hover:underline uppercase"
          >
            <span>VIEW FULL GRID</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Modular Bento Essentials Showcase (NO AGE/YEAR SUBTITLES) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[var(--color-border)]">
          <div>
            <span className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest">
              DEPARTMENT GATEWAYS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] text-left">
              Engineered Wardrobes
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">
            5 MODULAR DEPARTMENTS
          </span>
        </div>

        {/* Modular Grid: Clean labels: [Women], [Men], [Kids], [Baby], [Accessories] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Women - Span 2 */}
          <div
            onClick={() => onNavigate('women', 'women')}
            className="lg:col-span-2 group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden min-h-[300px]"
          >
            <div className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-4 flex justify-between items-start text-white">
              <span className="px-2 py-0.5 bg-black/60 border border-white/20 font-mono text-[10px] tracking-wider uppercase">
                DEPT 01
              </span>
            </div>
            <div className="relative p-5 text-white text-left">
              <h3 className="text-2xl font-bold tracking-tight uppercase">Women</h3>
              <p className="text-xs text-white/80 font-mono mt-1">Linen Trousers • AIR-Touch Tees • Packable Shells</p>
              <div className="mt-3 inline-flex items-center space-x-1 text-xs font-mono text-[#93C5FD] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Men - Span 2 */}
          <div
            onClick={() => onNavigate('men', 'men')}
            className="lg:col-span-2 group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden min-h-[300px]"
          >
            <div className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-4 flex justify-between items-start text-white">
              <span className="px-2 py-0.5 bg-black/60 border border-white/20 font-mono text-[10px] tracking-wider uppercase">
                DEPT 02
              </span>
            </div>
            <div className="relative p-5 text-white text-left">
              <h3 className="text-2xl font-bold tracking-tight uppercase">Men</h3>
              <p className="text-xs text-white/80 font-mono mt-1">240 GSM Supima • Oxford Cloth • Chino Joggers</p>
              <div className="mt-3 inline-flex items-center space-x-1 text-xs font-mono text-[#93C5FD] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Kids - Span 2 */}
          <div
            onClick={() => onNavigate('kids', 'kids')}
            className="lg:col-span-2 group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden min-h-[300px]"
          >
            <div className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-4 flex justify-between items-start text-white">
              <span className="px-2 py-0.5 bg-black/60 border border-white/20 font-mono text-[10px] tracking-wider uppercase">
                DEPT 03
              </span>
            </div>
            <div className="relative p-5 text-white text-left">
              <h3 className="text-2xl font-bold tracking-tight uppercase">Kids</h3>
              <p className="text-xs text-white/80 font-mono mt-1">Playground Heavy Tees • Terry Shorts • Zip Hoodies</p>
              <div className="mt-3 inline-flex items-center space-x-1 text-xs font-mono text-[#93C5FD] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Baby - Span 3 */}
          <div
            onClick={() => onNavigate('baby', 'baby')}
            className="lg:col-span-3 group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-4 flex justify-between items-start text-white">
              <span className="px-2 py-0.5 bg-black/60 border border-white/20 font-mono text-[10px] tracking-wider uppercase">
                DEPT 04
              </span>
            </div>
            <div className="relative p-5 text-white text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">Baby</h3>
              <p className="text-xs text-white/80 font-mono mt-1">Oeko-Tex Snap Bodysuits • 2-Way Zip Sleepsuits • Drool Bibs</p>
              <div className="mt-3 inline-flex items-center space-x-1 text-xs font-mono text-[#93C5FD] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Accessories - Span 3 */}
          <div
            onClick={() => onNavigate('accessories', 'accessories')}
            className="lg:col-span-3 group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-4 flex justify-between items-start text-white">
              <span className="px-2 py-0.5 bg-black/60 border border-white/20 font-mono text-[10px] tracking-wider uppercase">
                DEPT 05
              </span>
            </div>
            <div className="relative p-5 text-white text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">Accessories</h3>
              <p className="text-xs text-white/80 font-mono mt-1">500D Cordura Backpacks • Merino Beanies • Vulcanized Sneakers</p>
              <div className="mt-3 inline-flex items-center space-x-1 text-xs font-mono text-[#93C5FD] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fast-Browse Product Rail with Instant Colorway Switching & GSM Badges */}
      <section className="w-full bg-[var(--color-surface)] border-y border-[var(--color-border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">
                TACTICAL CATALOG // {activeDemographic.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] text-left">
                Essential Standards
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-2 sm:mt-0">
              CLICK COLORWAY TO SWITCH • TAP QUICK ADD
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fastBrowseProducts.map((product) => {
              const activeColorIndex = selectedColors[product.id] ?? 0
              const activeColor = product.colors[activeColorIndex] || product.colors[0]
              const displayImage = activeColor?.image || product.defaultImage

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-[var(--color-canvas)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col"
                >
                  {/* Image Container with 4:5 Aspect Ratio */}
                  <div className="relative aspect-[4/5] bg-[var(--color-surface)] overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Top Badges: GSM & Bundle */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-1.5 py-0.5 bg-[var(--color-canvas)]/90 backdrop-blur-sm border border-[var(--color-border)] font-mono text-[10px] font-semibold text-[var(--color-text-primary)]">
                        {product.gsm} GSM
                      </span>
                      {product.bundlePriceBDT && (
                        <span className="px-1.5 py-0.5 bg-[#004CE8] text-white font-mono text-[9px] font-bold tracking-wider">
                          MULTI-PACK
                        </span>
                      )}
                    </div>

                    {/* Quick Add Overlay */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onQuickAdd(product)
                      }}
                      className="absolute bottom-0 inset-x-0 py-2.5 bg-[#004CE8] text-white font-mono text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>QUICK ADD</span>
                    </button>
                  </div>

                  {/* Metadata Block */}
                  <div className="p-3.5 flex flex-col flex-1 justify-between text-left space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-secondary)] mb-1">
                        <span className="uppercase">{product.category}</span>
                        <span>{product.sku}</span>
                      </div>
                      <h4 className="text-[13px] sm:text-[14px] font-semibold text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[#004CE8] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[var(--color-text-secondary)] font-mono line-clamp-1">
                        {product.spec}
                      </p>
                    </div>

                    {/* Interactive Swatches */}
                    <div className="flex items-center space-x-1.5 pt-1">
                      {product.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={(e) => handleColorChange(product.id, idx, e)}
                          title={color.name}
                          className={`w-3.5 h-3.5 border transition-all cursor-pointer ${
                            idx === activeColorIndex
                              ? 'border-[#004CE8] scale-110 ring-1 ring-[#004CE8]'
                              : 'border-[var(--color-border)] hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-[var(--color-text-secondary)] pl-1">
                        {product.colors.length} COL
                      </span>
                    </div>

                    {/* Price Display */}
                    <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                      <span className="font-mono text-[13px] font-bold text-[var(--color-text-primary)]">
                        {formatPrice(product.priceBDT, product.priceUSD)}
                      </span>
                      {product.bundlePriceBDT && (
                        <span className="text-[10px] font-mono text-[#004CE8] dark:text-[#387BFF]">
                          3-Pack: {formatPrice(product.bundlePriceBDT, product.bundlePriceUSD!)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Engineering & Craft Manifesto Banner */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-canvas)] py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)] text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-4 text-[#004CE8] dark:text-[#387BFF]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
              Dense Supima Cotton
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Knitted from 100% extra-long staple Supima yarns yielding 240 GSM structural density that will not twist, pill, or deform.
            </p>
          </div>

          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)] text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-4 text-[#004CE8] dark:text-[#387BFF]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
              Chattogram Dispatch
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Same-day courier dispatch across Chattogram metro. 48-hour secure transit to all 64 districts in Bangladesh via domestic express.
            </p>
          </div>

          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)] text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-4 text-[#004CE8] dark:text-[#387BFF]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
              Unbleached Packaging
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Every shipment is enclosed in 100% recycled unbleached Scandinavian kraft paper with zero single-use plastic films.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
