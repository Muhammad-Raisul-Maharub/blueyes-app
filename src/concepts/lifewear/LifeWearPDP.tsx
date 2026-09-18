import React, { useState } from 'react'
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Maximize2,
  Minimize2,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import type { Currency, LifeWearProduct, ProductColor } from './types'

interface LifeWearPDPProps {
  product: LifeWearProduct
  currency: Currency
  onBack: () => void
  onAddToCart: (product: LifeWearProduct, color: ProductColor, size: string, isBundle?: boolean) => void
}

export const LifeWearPDP: React.FC<LifeWearPDPProps> = ({
  product,
  currency,
  onBack,
  onAddToCart,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [isBundleSelected, setIsBundleSelected] = useState(false)
  const [macroZoom, setMacroZoom] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<'specs' | 'fit' | 'shipping' | null>('specs')

  const activeColor = product.colors[selectedColorIndex] || product.colors[0]
  const currentImage = activeColor?.image || product.defaultImage

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Bundle pricing logic
  const hasBundle = Boolean(product.bundlePriceBDT && product.bundleQuantity)
  const singlePriceBDT = product.priceBDT
  const singlePriceUSD = product.priceUSD
  const bundlePriceBDT = product.bundlePriceBDT ?? singlePriceBDT * 3
  const bundlePriceUSD = product.bundlePriceUSD ?? singlePriceUSD * 3
  const bundleSavingsBDT = product.bundleSavingsBDT ?? singlePriceBDT * (product.bundleQuantity ?? 3) - bundlePriceBDT
  const bundleSavingsUSD = product.bundleSavingsUSD ?? singlePriceUSD * (product.bundleQuantity ?? 3) - bundlePriceUSD

  const activePriceBDT = isBundleSelected ? bundlePriceBDT : singlePriceBDT
  const activePriceUSD = isBundleSelected ? bundlePriceUSD : singlePriceUSD

  const handleAdd = () => {
    onAddToCart(product, activeColor, selectedSize, isBundleSelected)
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] pb-24">
      {/* Top Breadcrumbs / Back Bar */}
      <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[#004CE8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CATALOG</span>
          </button>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-[var(--color-text-secondary)]">
            <span className="uppercase">{product.category}</span>
            <span>/</span>
            <span className="text-[var(--color-text-primary)] font-semibold">{product.sku}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Image Gallery on Left, Specs & Purchase on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Studio Gallery with Macro Zoom */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Display Viewport */}
            <div className="relative aspect-[4/5] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-all duration-300 ${
                  macroZoom ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setMacroZoom(!macroZoom)}
              />

              {/* Macro Zoom Trigger Button */}
              <button
                type="button"
                onClick={() => setMacroZoom(!macroZoom)}
                className="absolute bottom-4 right-4 p-2 bg-[var(--color-canvas)]/90 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#004CE8] transition-colors cursor-pointer flex items-center space-x-1.5 text-[11px] font-mono shadow-sm"
              >
                {macroZoom ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{macroZoom ? 'RESET' : 'MACRO ZOOM'}</span>
              </button>

              {/* Technical Blueprint Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                <span className="px-2 py-0.5 bg-[var(--color-canvas)]/95 border border-[var(--color-border)] font-mono text-[11px] font-bold text-[var(--color-text-primary)]">
                  {product.gsm} GSM FABRIC DENSITY
                </span>
                {product.ageBracket && (
                  <span className="px-2 py-0.5 bg-[#004CE8] text-white font-mono text-[10px] font-bold tracking-wider">
                    AGE BRACKET: {product.ageBracket}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.slice(0, 4).map((img, i) => (
                <div
                  key={img}
                  className="aspect-square bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden cursor-pointer hover:border-[#004CE8]"
                >
                  <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Garment Engineering Blueprint Callout Box */}
            <div className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs text-left space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">TEXTILE ARCHITECTURE SPECIFICATION</span>
                <span className="text-[10px] text-[var(--color-text-secondary)]">ORIGIN: CHATTOGRAM</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[var(--color-text-secondary)] block">COMPOSITION:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{product.composition}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)] block">WEAVE STRUCTURE:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{product.weave}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)] block">SHRINKAGE TOLERANCE:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{product.shrinkage}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)] block">FACILITY:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{product.origin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sizing, Multi-Pack Bundle Calculator & Purchase Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Header Lockup */}
            <div className="space-y-2 border-b border-[var(--color-border)] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">
                  BLU EYES LIFEWEAR // SKU: {product.sku}
                </span>
                <span className="text-xs font-mono text-[#004CE8] dark:text-[#387BFF] font-semibold">
                  ★ {product.rating} ({product.reviewCount} REVIEWS)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm font-mono text-[var(--color-text-secondary)]">
                {product.subtitle}
              </p>

              {/* Price Display */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--color-text-primary)]">
                  {formatPrice(activePriceBDT, activePriceUSD)}
                </span>
                {isBundleSelected && (
                  <span className="text-xs font-mono text-[#004CE8] dark:text-[#387BFF] font-semibold">
                    [SAVINGS: {currency === 'USD' ? `$${bundleSavingsUSD}` : `৳${bundleSavingsBDT.toLocaleString()}`}]
                  </span>
                )}
              </div>
            </div>

            {/* INTERACTIVE MULTI-PACK BUNDLE CALCULATOR */}
            {hasBundle && (
              <div className="p-4 bg-[var(--color-surface)] border-2 border-[#004CE8] dark:border-[#387BFF] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#004CE8] dark:text-[#387BFF]" />
                    <span>MULTI-PACK BUNDLE SAVINGS ENGINE</span>
                  </span>
                  <span className="px-2 py-0.5 bg-[#004CE8] text-white text-[10px] font-mono font-bold">
                    RECOMMENDED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {/* Single Option */}
                  <button
                    type="button"
                    onClick={() => setIsBundleSelected(false)}
                    className={`p-3 border text-left transition-colors cursor-pointer ${
                      !isBundleSelected
                        ? 'bg-[var(--color-canvas)] border-[#004CE8] ring-1 ring-[#004CE8]'
                        : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <span className="block font-semibold text-[var(--color-text-primary)]">BUY 1 SINGLE</span>
                    <span className="block text-[13px] font-bold mt-1 text-[var(--color-text-primary)]">
                      {formatPrice(singlePriceBDT, singlePriceUSD)}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-secondary)] block mt-0.5">Standard single unit</span>
                  </button>

                  {/* 3-Pack Bundle Option */}
                  <button
                    type="button"
                    onClick={() => setIsBundleSelected(true)}
                    className={`p-3 border text-left transition-colors cursor-pointer relative ${
                      isBundleSelected
                        ? 'bg-[var(--color-canvas)] border-[#004CE8] ring-1 ring-[#004CE8]'
                        : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--color-text-primary)]">BUY 3-PACK BUNDLE</span>
                      <span className="text-[10px] bg-[#004CE8] text-white px-1 font-bold">SAVE {currency === 'USD' ? `$${bundleSavingsUSD}` : `৳${bundleSavingsBDT}`}</span>
                    </div>
                    <span className="block text-[13px] font-bold mt-1 text-[#004CE8] dark:text-[#387BFF]">
                      {formatPrice(bundlePriceBDT, bundlePriceUSD)}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-secondary)] block mt-0.5">
                      Save {currency === 'USD' ? `$${bundleSavingsUSD}` : `৳${bundleSavingsBDT.toLocaleString()}`} instantly
                    </span>
                  </button>
                </div>

                <p className="text-[11px] font-mono text-[var(--color-text-secondary)]">
                  {isBundleSelected
                    ? `✓ Active Tier: 3-Pack Bundle selected. You save ${currency === 'USD' ? `$${bundleSavingsUSD}` : `৳${bundleSavingsBDT.toLocaleString()}`}. Colors will be coordinated automatically.`
                    : 'Select 3-Pack Bundle for engineered volume pricing and complimentary shipping eligibility.'}
                </p>
              </div>
            )}

            {/* Color Swatch Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--color-text-secondary)] uppercase">
                  COLORWAY: <strong className="text-[var(--color-text-primary)]">{activeColor.name}</strong>
                </span>
                <span className="text-[11px] text-[var(--color-text-secondary)]">
                  {product.colors.length} TECHNICAL SHADES
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    title={color.name}
                    className={`w-8 h-8 border transition-all cursor-pointer flex items-center justify-center ${
                      idx === selectedColorIndex
                        ? 'border-[#004CE8] scale-105 ring-2 ring-[#004CE8]'
                        : 'border-[var(--color-border)] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {idx === selectedColorIndex && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Box Grid: Sharp Level 0 Corners */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--color-text-secondary)] uppercase">
                  SIZE: <strong className="text-[var(--color-text-primary)]">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveAccordion('specs')}
                  className="text-[11px] text-[#004CE8] dark:text-[#387BFF] hover:underline cursor-pointer"
                >
                  SIZING SPECIFICATIONS
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 text-xs font-mono font-medium transition-colors cursor-pointer border ${
                      selectedSize === sz
                        ? 'bg-[#111827] dark:bg-white text-white dark:text-black border-[#111827] dark:border-white font-bold'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment Features Checklist */}
            <div className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[var(--color-text-primary)] block">
                ENGINEERING STANDARDS
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#004CE8] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Accordions: Specs, Shrinkage, Shipping */}
            <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
              {/* Accordion 1: Fabric & Shrinkage */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                  className="w-full p-3.5 flex items-center justify-between text-xs font-mono font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer"
                >
                  <span>TECHNICAL FABRIC & SHRINKAGE DATA</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'specs' ? 'rotate-180 text-[#004CE8]' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'specs' && (
                  <div className="p-4 bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] font-mono space-y-2 border-t border-[var(--color-border)]">
                    <p>• <strong>Fabric Weight:</strong> {product.gsm} GSM heavy interlock knit.</p>
                    <p>• <strong>Tolerance:</strong> {product.shrinkage}. Pre-steamed at 120°C.</p>
                    <p>• <strong>Yarn Spec:</strong> Extra-long staple Supima single-twist yarn.</p>
                    <p>• <strong>Care:</strong> Machine wash cold 30°C. Line dry in shade. Low iron.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Chattogram & Nationwide Logistics */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-3.5 flex items-center justify-between text-xs font-mono font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer"
                >
                  <span>CHATTOGRAM & NATIONWIDE DISPATCH</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'shipping' ? 'rotate-180 text-[#004CE8]' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="p-4 bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] font-mono space-y-2 border-t border-[var(--color-border)]">
                    <p>• <strong>Chattogram Metro:</strong> Same-day dispatch from GEC Hub (৳80 or Free over ৳2,000 / $20).</p>
                    <p>• <strong>All 64 Districts:</strong> 48H domestic courier transit (৳120 or Free over ৳2,500 / $25).</p>
                    <p>• <strong>International:</strong> 3–5 days DHL Global Express with end-to-end tracking.</p>
                    <p>• <strong>Packaging:</strong> 100% recyclable unbleached kraft box packaging.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Add to Bag Action Button */}
            <div className="hidden lg:block pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 bg-[#004CE8] hover:bg-[#0039B4] text-white font-mono text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  ADD TO BAG • {formatPrice(activePriceBDT, activePriceUSD)}
                  {isBundleSelected ? ' [3-PACK]' : ''}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom "ADD TO BAG" Bar on Mobile / Desktop Viewports */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[var(--color-canvas)]/95 backdrop-blur-md border-t border-[var(--color-border)] p-3 lg:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="text-left font-mono">
            <span className="text-[10px] text-[var(--color-text-secondary)] block uppercase">
              {product.name} ({selectedSize})
            </span>
            <span className="text-base font-bold text-[var(--color-text-primary)]">
              {formatPrice(activePriceBDT, activePriceUSD)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-[#004CE8] text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG {isBundleSelected ? '(3-PACK)' : ''}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
