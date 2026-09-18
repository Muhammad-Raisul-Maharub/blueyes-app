import React, { useState } from 'react'
import {
  ArrowLeft,
  Truck,
  Box,
  Check,
  ChevronRight,
} from 'lucide-react'
import type { GlacierProduct, GlacierCategory, Currency } from './types'

interface GlacierPDPProps {
  product: GlacierProduct
  onBack: () => void
  onNavigateHome: () => void
  onNavigateCategory: (category: GlacierCategory) => void
  onAddToBag: (product: GlacierProduct, size: string, color: string) => void
  currency: Currency
}

export const GlacierPDP: React.FC<GlacierPDPProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateCategory,
  onAddToBag,
  currency,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'FR 36')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard')
  const [activeTab, setActiveTab] = useState<'specs' | 'engineering' | 'logistics'>('specs')

  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  const handleAcquire = () => {
    onAddToBag(product, selectedSize, selectedColor)
  }

  // Allocation scarcity percentage
  const scarcityPct = Math.round(
    ((product.scarcityTotal - product.scarcityRemaining) / product.scarcityTotal) * 100
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 pb-36">
      {/* 1. Breadcrumbs & Back */}
      <div className="flex items-center gap-2.5 text-[11px] font-space-mono text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[#0284C7] dark:text-[#7DD3FC] hover:underline cursor-pointer font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#0284C7] dark:hover:text-[#7DD3FC] transition-colors cursor-pointer"
        >
          GLACIER
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => onNavigateCategory(product.category)}
          className="hover:text-[#0284C7] dark:hover:text-[#7DD3FC] transition-colors cursor-pointer uppercase"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#082F49] dark:text-[#F0F9FF] font-bold truncate max-w-[220px]">
          {product.title}
        </span>
      </div>

      {/* 2. Main Two-Column Runway Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left Column: Multi-Angle Runway Visual Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Hero Look View */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-slate-950 overflow-hidden border border-sky-300 dark:border-sky-400/25 shadow-lg group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.title} runway view ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-105"
            />

            {/* Scarcity Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-[#7DD3FC] text-[10px] font-space-mono font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                {product.stockScarcity} ALLOCATION
              </span>
            </div>

            {/* Image Angle Indicator */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="px-2.5 py-1 bg-slate-950/70 backdrop-blur-md border border-sky-400/30 text-sky-200 text-[10px] font-space-mono uppercase">
                RUNWAY ANGLE 0{selectedImageIndex + 1} / 0{product.images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
            {product.images.map((img, idx) => {
              const isSelected = selectedImageIndex === idx
              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 overflow-hidden bg-slate-950 border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0284C7] dark:border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                      : 'border-sky-200 dark:border-sky-400/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-sky-400/10 pointer-events-none" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Garment Specs & Ordering Matrix (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Demographic & Category Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#7DD3FC] text-[10px] font-space-mono font-bold tracking-wider uppercase border border-sky-300 dark:border-sky-400/30">
                {product.category}
              </span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-space-mono font-bold tracking-wider uppercase">
                {product.techFiberType}
              </span>
              {product.badge && (
                <span className="px-2 py-0.5 bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#030712] text-[10px] font-space-mono font-extrabold tracking-wider uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-syne font-extrabold text-[28px] sm:text-[36px] text-[#082F49] dark:text-[#F0F9FF] leading-[1.05] tracking-tight uppercase mb-2">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="font-space text-[13px] text-slate-500 dark:text-sky-200/80 mb-5">
              {product.subtitle}
            </p>

            {/* Price Box */}
            <div className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/20 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-space-mono text-slate-400 uppercase block mb-0.5">
                  ARCHIVAL ACQUISITION VALUE
                </span>
                <span className="font-space-mono font-extrabold text-[24px] text-[#082F49] dark:text-[#F0F9FF]">
                  {formatPrice(product.priceBDT, product.priceUSD)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-space-mono text-slate-400 uppercase block mb-0.5">
                  SECONDARY VALUATION
                </span>
                <span className="text-[12px] font-space-mono font-bold text-[#0284C7] dark:text-[#7DD3FC]">
                  {currency === 'BDT' ? `$${product.priceUSD} USD` : `৳${product.priceBDT.toLocaleString()} BDT`}
                </span>
              </div>
            </div>

            {/* Scarcity Allocation Bar */}
            <div className="mb-6 p-3.5 bg-slate-950/70 border border-sky-400/25">
              <div className="flex items-center justify-between text-[11px] font-space-mono mb-2">
                <span className="text-[#7DD3FC] font-bold">
                  {product.scarcityRemaining} OF {product.scarcityTotal} ALLOCATIONS REMAINING
                </span>
                <span className="text-sky-300 font-bold">{scarcityPct}% CLAIMED</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-none overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#7DD3FC] shadow-[0_0_8px_#38BDF8]"
                  style={{ width: `${scarcityPct}%` }}
                />
              </div>
            </div>

            {/* Colorway Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-space-mono text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300">
                  REFLECTIVE PALETTE:
                </span>
                <span className="font-space-mono text-[11px] text-[#0284C7] dark:text-[#7DD3FC] font-semibold">
                  {selectedColor}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative p-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-[#0284C7] dark:ring-[#38BDF8] ring-offset-2 ring-offset-[#030712]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      title={color.name}
                    >
                      <div
                        className="w-7 h-7 border border-white/20 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-space-mono text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300">
                  PROPORTIONAL SIZING:
                </span>
                <span className="font-space-mono text-[11px] text-[#0284C7] dark:text-[#7DD3FC]">
                  {selectedSize}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-2 text-[11px] font-space-mono font-bold tracking-wider uppercase border transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#030712] border-[#0284C7] dark:border-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                          : 'bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-sky-200 dark:border-sky-400/20 hover:border-sky-400'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Primary Acquire CTA Button */}
            <button
              type="button"
              onClick={handleAcquire}
              className="w-full py-4 bg-[#0284C7] dark:bg-[#38BDF8] hover:bg-sky-700 dark:hover:bg-[#7DD3FC] text-white dark:text-[#030712] font-space font-extrabold text-[13px] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 mb-8"
            >
              <span>ACQUIRE PIECE • {formatPrice(product.priceBDT, product.priceUSD)}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* 3. Technical Spec Sheet Accordion Tabs */}
            <div className="border border-sky-200 dark:border-sky-400/25 bg-white/50 dark:bg-slate-950/60 backdrop-blur-md">
              <div className="flex border-b border-sky-200 dark:border-sky-400/20">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-2.5 text-[11px] font-space-mono font-bold uppercase transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'bg-sky-500/10 text-[#0284C7] dark:text-[#7DD3FC] border-b-2 border-[#0284C7] dark:border-[#38BDF8]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-sky-300'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('engineering')}
                  className={`flex-1 py-2.5 text-[11px] font-space-mono font-bold uppercase transition-colors cursor-pointer ${
                    activeTab === 'engineering'
                      ? 'bg-sky-500/10 text-[#0284C7] dark:text-[#7DD3FC] border-b-2 border-[#0284C7] dark:border-[#38BDF8]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-sky-300'
                  }`}
                >
                  Cryo Engineering
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('logistics')}
                  className={`flex-1 py-2.5 text-[11px] font-space-mono font-bold uppercase transition-colors cursor-pointer ${
                    activeTab === 'logistics'
                      ? 'bg-sky-500/10 text-[#0284C7] dark:text-[#7DD3FC] border-b-2 border-[#0284C7] dark:border-[#38BDF8]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-sky-300'
                  }`}
                >
                  64 Districts
                </button>
              </div>

              <div className="p-4 sm:p-5">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-space-mono">
                    <div className="p-2.5 bg-sky-950/40 border border-sky-400/20">
                      <span className="text-slate-400 block text-[9px] uppercase">THERMAL RATING</span>
                      <strong className="text-[#7DD3FC]">{product.thermalRating}</strong>
                    </div>
                    <div className="p-2.5 bg-sky-950/40 border border-sky-400/20">
                      <span className="text-slate-400 block text-[9px] uppercase">FABRIC DENSITY</span>
                      <strong className="text-[#7DD3FC]">{product.thermalGsm} GSM Monolithic</strong>
                    </div>
                    <div className="p-2.5 bg-sky-950/40 border border-sky-400/20">
                      <span className="text-slate-400 block text-[9px] uppercase">TECH-FIBER</span>
                      <strong className="text-[#7DD3FC]">{product.spec}</strong>
                    </div>
                    <div className="p-2.5 bg-sky-950/40 border border-sky-400/20">
                      <span className="text-slate-400 block text-[9px] uppercase">ZERO-WASTE AUDIT</span>
                      <strong className="text-[#7DD3FC]">{product.zeroWasteCred}</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'engineering' && (
                  <ul className="space-y-2 text-[12px] font-sans text-slate-300 text-left">
                    {product.engineeringDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'logistics' && (
                  <div className="space-y-3 text-[12px] font-sans text-slate-300 text-left">
                    <div className="flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-[#7DD3FC] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#F0F9FF] block font-space-mono text-[11px]">
                          CHATTOGRAM METRO: 24H DISPATCH
                        </strong>
                        <span>Direct delivery from Maison Chattogram Flagship (GEC Circle).</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Box className="w-4 h-4 text-[#7DD3FC] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#F0F9FF] block font-space-mono text-[11px]">
                          ALL 64 DISTRICTS: 48H INSURED COURIER
                        </strong>
                        <span>Numbered tamper-evident cold vault packaging with real-time SMS tracking.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sticky Glassmorphic Bottom Buy Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#030712]/90 backdrop-blur-xl border-t border-sky-400/30 p-3 sm:p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-10 h-12 object-cover border border-sky-400/30 hidden sm:block shrink-0"
            />
            <div className="flex flex-col">
              <h4 className="font-syne font-bold text-[13px] sm:text-[14px] text-[#F0F9FF] uppercase line-clamp-1">
                {product.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] font-space-mono text-slate-400">
                <span>{selectedSize}</span>
                <span>•</span>
                <span className="text-[#7DD3FC]">{selectedColor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <span className="text-[9px] font-space-mono text-slate-400 uppercase block">
                TOTAL ACQUISITION
              </span>
              <span className="font-space-mono font-bold text-[16px] text-[#7DD3FC]">
                {formatPrice(product.priceBDT, product.priceUSD)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAcquire}
              className="px-6 py-2.5 sm:py-3 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#030712] font-space font-extrabold text-[11px] sm:text-[12px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] whitespace-nowrap"
            >
              Acquire Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
