import React, { useState } from 'react'
import type { Product, GarmentSize, Demographic, DeliveryZone } from './types'
import { DELIVERY_ESTIMATES } from './atelierData'
import {
  ArrowLeft,
  Crown,
  ChevronDown,
  ChevronUp,
  Check,
  Ruler,
  ShoppingBag,
  ShieldCheck,
  Truck,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react'

interface AtelierPDPProps {
  product: Product
  onBack: () => void
  onNavigateHome: () => void
  onNavigateCategory: (category: Demographic) => void
  onAddToBag: (product: Product, size: GarmentSize, color: string) => void
}

export const AtelierPDP: React.FC<AtelierPDPProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateCategory,
  onAddToBag,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isVipPricing, setIsVipPricing] = useState(false)
  const [selectedSize, setSelectedSize] = useState<GarmentSize>(product.sizes[0] || '40 / S')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Obsidian Black')
  const [addedToast, setAddedToast] = useState(false)
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>('chattogram')

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    composition: true,
    provenance: false,
    care: false,
    tailoring: false,
  })

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAdd = () => {
    onAddToBag(product, selectedSize, selectedColor)
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2400)
  }

  const activePriceBDT = isVipPricing ? product.vipPriceBDT : product.priceBDT
  const activePriceUSD = isVipPricing ? product.vipPriceUSD : product.priceUSD
  const activeDelivery = DELIVERY_ESTIMATES[selectedZone] || DELIVERY_ESTIMATES['chattogram']

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] pb-28 lg:pb-16 animate-fadeIn transition-colors">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-card)] sticky top-16 z-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none text-[11px] font-sans uppercase tracking-[0.16em]">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors cursor-pointer mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Clickable Breadcrumbs */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <span className="text-[var(--color-text-muted)]">/</span>
            <button
              type="button"
              onClick={() => onNavigateCategory(product.category)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors cursor-pointer whitespace-nowrap"
            >
              {product.category}
            </button>
            <span className="text-[var(--color-text-muted)]">/</span>
            <span className="text-[var(--color-text-primary)] font-semibold truncate max-w-[180px] sm:max-w-sm">
              {product.title}
            </span>
          </div>

          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold flex-shrink-0 hidden md:inline">
            {product.edition}
          </span>
        </div>
      </div>

      {/* 2-Column Split View on Desktop (lg:grid lg:grid-cols-12 gap-12) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Large Image Gallery (Col-span 7 on desktop, sticky) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky top-32">
            {/* Main Display Image */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)] border border-[var(--color-border)] shadow-sm">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[var(--color-accent-bronze-light)] text-[var(--color-accent-bronze-dark)] px-3 py-1 shadow-sm">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-sans tracking-widest uppercase">
                0{selectedImageIndex + 1} / 0{product.images.length}
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 border-2 overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[var(--color-accent-blue)] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Purchase Details & Specs (Col-span 5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6 mt-6 lg:mt-0">
            {/* Title, Edition & Description */}
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                {product.category} • Hand-Crafted Atelier Piece
              </span>
              <h1 className="font-serif text-[28px] sm:text-[34px] text-[var(--color-text-primary)] leading-tight mb-3">
                {product.title}
              </h1>
              <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* VIP Obsidian Pricing Toggle */}
            <div className="bg-[#121212] text-white p-5 border border-[#8C7355]/40 shadow-md flex flex-col gap-3.5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#8C7355]/15 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#FDDDB9]" />
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#FDDDB9]">
                    Obsidian Club Privilege
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVipPricing}
                    onChange={(e) => setIsVipPricing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#313030] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-blue)]"></div>
                </label>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-white/60 block">
                    {isVipPricing ? 'Exclusive Obsidian Tier Price (15% Privilege)' : 'Atelier Standard Price'}
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="font-serif text-[24px] sm:text-[28px] font-medium text-white tabular-nums">
                      ৳{activePriceBDT.toLocaleString()}
                    </span>
                    <span className="text-[13px] font-sans text-white/70">
                      (${activePriceUSD})
                    </span>
                    {isVipPricing && (
                      <span className="text-[13px] font-sans text-white/40 line-through tabular-nums">
                        ৳{product.priceBDT.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                {isVipPricing && (
                  <span className="px-2.5 py-1 bg-[#8C7355] text-white text-[9px] font-sans uppercase tracking-wider font-semibold shadow-sm">
                    Tier Active
                  </span>
                )}
              </div>
              <p className="text-[11px] font-sans text-white/65 leading-normal">
                Includes complimentary bespoke custom-tailoring fitting and white-glove champagne dispatch.
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[var(--color-text-primary)] font-semibold block mb-2">
                Garment Shade: <span className="text-[var(--color-accent-bronze)]">{selectedColor}</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 border cursor-pointer transition-all ${
                      selectedColor === c.name
                        ? 'border-[var(--color-accent-blue)] bg-[var(--color-card)] shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-card-subtle)] hover:border-[var(--color-text-primary)]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: c.preview }}
                    />
                    <span className="text-[12px] font-sans text-[var(--color-text-primary)] font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[var(--color-text-primary)] font-semibold">
                  Garment Dimension / Sizing
                </span>
                <button
                  type="button"
                  className="text-[11px] font-sans uppercase tracking-wider text-[var(--color-accent-blue)] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Bespoke Size Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 px-2 text-[11px] font-sans uppercase tracking-wider text-center border cursor-pointer transition-all ${
                      selectedSize === sz
                        ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold shadow-sm'
                        : 'bg-[var(--color-card)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-accent-blue)]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Add to Bag Button (Prominent in flow) */}
            <div className="hidden lg:flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 px-6 bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-sans text-[13px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[var(--color-accent-blue)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#BAC3FF]" />
                    <span>Added to Couture Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ৳{activePriceBDT.toLocaleString()}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] font-sans text-center text-[var(--color-text-muted)]">
                Complimentary 24hr White-Glove Courier across Dhaka & Global 3-Day Express
              </p>
            </div>

            {/* Fabric Specs Accordion */}
            <div className="border-t border-[var(--color-border)] pt-2 flex flex-col divide-y divide-[var(--color-border)]">
              {/* Composition */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('composition')}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[12px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)]">
                    Composition & Weave
                  </span>
                  {openAccordions.composition ? (
                    <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                  )}
                </button>
                {openAccordions.composition && (
                  <p className="mt-2 text-[13px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {product.composition}
                  </p>
                )}
              </div>

              {/* Provenance */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('provenance')}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[12px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)]">
                    Provenance & Loom Origin
                  </span>
                  {openAccordions.provenance ? (
                    <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                  )}
                </button>
                {openAccordions.provenance && (
                  <p className="mt-2 text-[13px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {product.provenance}
                  </p>
                )}
              </div>

              {/* Care */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[12px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)]">
                    Garment Care & Archive Storage
                  </span>
                  {openAccordions.care ? (
                    <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                  )}
                </button>
                {openAccordions.care && (
                  <p className="mt-2 text-[13px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {product.care}
                  </p>
                )}
              </div>

              {/* Tailoring */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('tailoring')}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[12px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)]">
                    Bespoke Tailoring & Alteration Policy
                  </span>
                  {openAccordions.tailoring ? (
                    <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                  )}
                </button>
                {openAccordions.tailoring && (
                  <p className="mt-2 text-[13px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {product.tailoringNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Local & Global Logistics Engine */}
            <div className="p-4 bg-[var(--color-card-subtle)] border border-[var(--color-border)] shadow-sm flex flex-col gap-3 transition-colors">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[var(--color-accent-blue)]" />
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-text-primary)]">
                    Local & Global Logistics Engine
                  </span>
                </div>
                <span className="text-[9px] font-sans uppercase tracking-wider text-[var(--color-accent-bronze)] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Flagship: GEC Circle, Chattogram
                </span>
              </div>

              {/* Delivery Zone Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[var(--color-card)] border border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setSelectedZone('chattogram')}
                  className={`py-1.5 px-1 text-[10px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                    selectedZone === 'chattogram'
                      ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Chattogram Metro
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedZone('dhaka_nationwide')}
                  className={`py-1.5 px-1 text-[10px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                    selectedZone === 'dhaka_nationwide'
                      ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Dhaka & 64 Dists
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedZone('international')}
                  className={`py-1.5 px-1 text-[10px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                    selectedZone === 'international'
                      ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Global DHL
                </button>
              </div>

              {/* Active Zone Detail Card */}
              <div className="p-3 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-accent-bronze)]" />
                    <span className="text-[12px] font-sans font-semibold text-[var(--color-text-primary)]">
                      {activeDelivery.eta}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans font-semibold text-[var(--color-accent-blue)]">
                    {product.priceBDT >= activeDelivery.freeThresholdBDT ? (
                      <span className="flex items-center gap-1 text-[var(--color-accent-blue)]">
                        <Sparkles className="w-3 h-3" />
                        Complimentary Dispatch
                      </span>
                    ) : selectedZone === 'international' ? (
                      `$${activeDelivery.costUSD} flat`
                    ) : (
                      `৳${activeDelivery.costBDT}`
                    )}
                  </span>
                </div>

                <p className="text-[11px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                  {activeDelivery.description} Hand-steamed, wrapped in unbleached tissue, and sealed with tamper-proof security ribbon.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px] font-sans text-[var(--color-text-muted)]">
                  <span>Courier: <strong>{activeDelivery.courier}</strong></span>
                  <span>
                    Free over{' '}
                    <strong>
                      {selectedZone === 'international'
                        ? `$${activeDelivery.freeThresholdUSD}`
                        : `৳${activeDelivery.freeThresholdBDT.toLocaleString()}`}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Certified Guarantee Footnote */}
              <div className="flex items-center justify-between text-[10px] font-sans text-[var(--color-text-muted)] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-bronze)]" />
                  Maison Chattogram Authenticity Seal
                </span>
                <span>28-Point Custom Tailoring Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Sticky Bottom 'Add to Bag' Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 w-full bg-[var(--color-card)]/95 backdrop-blur-xl border-t border-[var(--color-border)] p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)]">
            {selectedSize} • {selectedColor}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-[18px] font-medium text-[var(--color-text-primary)] tabular-nums">
              ৳{activePriceBDT.toLocaleString()}
            </span>
            <span className="text-[11px] font-sans text-[var(--color-text-muted)]">(${activePriceUSD})</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 py-3.5 px-4 bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[var(--color-accent-blue)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          {addedToast ? (
            <>
              <Check className="w-4 h-4 text-[#BAC3FF]" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
