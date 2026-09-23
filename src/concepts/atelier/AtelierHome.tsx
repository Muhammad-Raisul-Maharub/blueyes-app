import React, { useState } from 'react'
import type { Product, Demographic } from './types'
import { ATELIER_PRODUCTS } from './atelierData'
import { ArrowRight, Calendar, Heart, Anchor, MapPin, Sparkles, Scissors } from 'lucide-react'

interface AtelierHomeProps {
  onSelectProduct: (product: Product) => void
  onNavigateToCategory: (demographic: Demographic) => void
  onNavigateToCurate: () => void
  onNavigateToVIP: () => void
  onNavigateToRunway: () => void
  onNavigateToAbout: () => void
}

export const AtelierHome: React.FC<AtelierHomeProps> = ({
  onSelectProduct,
  onNavigateToCategory,
  onNavigateToCurate,
  onNavigateToVIP,
  onNavigateToRunway,
  onNavigateToAbout,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<Demographic>('Women')

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Minimalist text ribbon categories (NO circular bubbles)
  const categoryRibbon: { id: Demographic; label: string; tag: string }[] = [
    { id: 'Women', label: "Women's Salon", tag: 'Mulberry Silks & Jamdani' },
    { id: 'Men', label: "Men's Salon", tag: 'Raw Silk & Tuxedos' },
    { id: 'Baby', label: 'Baby Heirloom', tag: 'Muslin & Organic Layettes' },
    { id: 'Accessories', label: 'Artisanal Jewelry', tag: 'Filigree & Gold Leaf' },
  ]

  return (
    <div className="w-full flex flex-col pb-28 transition-colors duration-300">
      {/* =========================================================================
          1. HAUTE EDITORIAL ASYMMETRICAL 70/30 HERO LOOKBOOK
          Single massive 70vw vertical hero runway shot with floating micro-typography
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column (67% width / 8 cols on desktop): Massive Vertical Runway Shot */}
          <div className="lg:col-span-8 relative min-h-[580px] sm:min-h-[680px] lg:min-h-[820px] bg-[#121212] overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[var(--color-border)]">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90"
              alt="Blu Eyes Atelier Haute Runway"
              className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-105 brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            {/* Top Micro-Typography Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white">
                <Anchor className="w-3.5 h-3.5 text-[var(--color-accent-bronze-light)]" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-white">
                  Maison Chattogram • Flagship
                </span>
              </div>

              <div className="px-3 py-1.5 bg-[var(--color-accent-bronze)] text-white text-[9.5px] font-sans font-bold uppercase tracking-[0.24em] shadow-sm">
                Runway Collection 01
              </div>
            </div>

            {/* Floating Micro-Typography & Headline Overlay */}
            <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 z-10 text-white">
              <div className="flex items-center gap-2 mb-2 text-[var(--color-accent-bronze-light)]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em]">
                  Maritime Haute Sartorial
                </span>
              </div>

              <h1 className="font-serif text-[38px] sm:text-[58px] lg:text-[68px] leading-[0.98] tracking-tight text-white mb-4 drop-shadow-sm max-w-2xl">
                The Poetics of Bengali Silk.
              </h1>

              <p className="text-[13px] sm:text-[15px] font-sans text-white/80 max-w-xl mb-6 leading-relaxed">
                Hand-draped from 22-momme pure Rajshahi mulberry silks and 200-count Shitalakshya Jamdani muslin. Tailored in Chattogram for global patrons.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigateToCategory('Women')}
                  className="px-8 py-4 bg-white text-[#1C1B1B] hover:bg-[var(--color-accent-blue)] hover:text-white transition-all font-sans text-[12px] uppercase tracking-[0.22em] font-semibold cursor-pointer shadow-lg active:scale-98 flex items-center gap-2.5"
                >
                  <span>Explore Salon Première</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToRunway}
                  className="px-7 py-4 bg-black/50 hover:bg-black/75 backdrop-blur-md text-white border border-white/30 transition-all font-sans text-[12px] uppercase tracking-[0.22em] font-semibold cursor-pointer flex items-center gap-2"
                >
                  <span>Runway Lookbook</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (33% width / 4 cols on desktop): Curated 2-Piece Showcase + Bespoke Module */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Editorial Showcase 1: Silk Draped Gown */}
            <div
              onClick={() => onSelectProduct(ATELIER_PRODUCTS[0])}
              className="group bg-[var(--color-card)] border border-[var(--color-border)] p-4 sm:p-5 flex flex-col cursor-pointer hover:border-[var(--color-accent-blue)] transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] mb-2 font-semibold">
                <span>Curated Piece 01</span>
                <span>Limited 25 Pcs</span>
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-surface-container)] mb-3">
                <img
                  src={ATELIER_PRODUCTS[0].images[0]}
                  alt={ATELIER_PRODUCTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white font-sans text-[9px] uppercase tracking-wider backdrop-blur-sm">
                  {ATELIER_PRODUCTS[0].fabric}
                </div>
              </div>
              <h3 className="font-serif text-[18px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors leading-snug line-clamp-1">
                {ATELIER_PRODUCTS[0].title}
              </h3>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-[var(--color-border)]">
                <span className="font-sans font-bold text-[15px] text-[var(--color-text-primary)]">
                  ৳{ATELIER_PRODUCTS[0].priceBDT.toLocaleString()}
                </span>
                <span className="text-[11px] font-sans text-[var(--color-accent-blue)] font-medium group-hover:translate-x-1 transition-transform">
                  View Silhouette →
                </span>
              </div>
            </div>

            {/* Editorial Showcase 2: Imperial Raw Silk Panjabi */}
            <div
              onClick={() => onSelectProduct(ATELIER_PRODUCTS[3])}
              className="group bg-[var(--color-card)] border border-[var(--color-border)] p-4 sm:p-5 flex flex-col cursor-pointer hover:border-[var(--color-accent-blue)] transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] mb-2 font-semibold">
                <span>Curated Piece 02</span>
                <span>Heritage Tussar</span>
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-surface-container)] mb-3">
                <img
                  src={ATELIER_PRODUCTS[3].images[0]}
                  alt={ATELIER_PRODUCTS[3].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white font-sans text-[9px] uppercase tracking-wider backdrop-blur-sm">
                  {ATELIER_PRODUCTS[3].fabric}
                </div>
              </div>
              <h3 className="font-serif text-[18px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors leading-snug line-clamp-1">
                {ATELIER_PRODUCTS[3].title}
              </h3>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-[var(--color-border)]">
                <span className="font-sans font-bold text-[15px] text-[var(--color-text-primary)]">
                  ৳{ATELIER_PRODUCTS[3].priceBDT.toLocaleString()}
                </span>
                <span className="text-[11px] font-sans text-[var(--color-accent-blue)] font-medium group-hover:translate-x-1 transition-transform">
                  View Silhouette →
                </span>
              </div>
            </div>

            {/* Bespoke Tailoring Consultation Module */}
            <div className="bg-[var(--color-card-subtle)] border border-[var(--color-border)] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-accent-bronze)]">
                  <Scissors className="w-4 h-4" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]">
                    Bespoke Salon
                  </span>
                </div>
                <h4 className="font-serif text-[18px] text-[var(--color-text-primary)] leading-tight">
                  Private Fitting & 28-Point Custom Tailoring
                </h4>
                <p className="text-[12px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
                  Book a confidential 1-on-1 consultation at our GEC Circle Chattogram salon or Gulshan 2 Dhaka suite.
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={onNavigateToAbout}
                  className="flex-1 py-3 px-4 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Fitting</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateToVIP}
                  className="py-3 px-4 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] text-[11px] font-sans uppercase tracking-[0.2em] font-medium hover:border-[var(--color-accent-bronze)] transition-colors cursor-pointer text-center"
                >
                  Obsidian VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MINIMALIST HORIZONTAL TEXT RIBBON (NO CIRCULAR BUBBLES)
          [Women's Salon] [Men's Salon] [Baby Heirloom] [Artisanal Jewelry]
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pb-12">
        <div className="border-y border-[var(--color-border)] py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[var(--color-accent-bronze)] font-semibold block mb-1">
                Departmental Lookbook Ribbons
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] text-[var(--color-text-primary)]">
                The Editorial Salons
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-sans text-[var(--color-text-muted)] tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-bronze)]" />
              <span>GEC Circle Flagship • Gulshan 2 Suite • DHL Worldwide</span>
            </div>
          </div>

          {/* Minimalist Horizontal Text Ribbon Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {categoryRibbon.map((item) => {
              const isSelected = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id)
                    onNavigateToCategory(item.id)
                  }}
                  className={`p-4 sm:p-5 border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-[var(--color-card)] border-[var(--color-text-primary)] shadow-sm'
                      : 'bg-[var(--color-card-subtle)] border-[var(--color-border)] hover:border-[var(--color-accent-bronze)]'
                  }`}
                >
                  <span className="text-[13px] sm:text-[15px] font-serif font-medium text-[var(--color-text-primary)] tracking-wide">
                    [{item.label}]
                  </span>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border)] text-[10px] font-sans tracking-widest uppercase text-[var(--color-accent-bronze)]">
                    <span>{item.tag}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXPANSIVE 4-TO-5 COLUMN PRODUCT MATRIX (ZERO EMPTY GUTTERS)
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="flex items-end justify-between mb-8 border-b border-[var(--color-border)] pb-4">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-blue)] font-semibold">
              Curated Archival Selection
            </span>
            <h3 className="font-serif text-[28px] sm:text-[34px] text-[var(--color-text-primary)] italic">
              Seasonal Haute Masterpieces
            </h3>
          </div>
          <button
            type="button"
            onClick={onNavigateToCurate}
            className="text-[12px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] hover:text-[var(--color-accent-blue)] flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
          >
            <span>Full Catalog Archive</span>
            <ArrowRight className="w-4 h-4 -rotate-45" />
          </button>
        </div>

        {/* 5-Column Responsive Grid on Wide Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {ATELIER_PRODUCTS.slice(0, 10).map((product) => {
            const isFav = !!favorites[product.id]
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] p-3 shadow-xs flex flex-col group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:shadow-md"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-[var(--color-accent-bronze-light)] text-[var(--color-accent-bronze-dark)] px-2 py-0.5 shadow-xs">
                      <span className="text-[8.5px] font-sans font-semibold uppercase tracking-wider">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(product.id, e)}
                    aria-label="Save to Wishlist"
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-[var(--color-card)]/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-text-primary)] shadow-xs hover:text-[var(--color-accent-blue)] active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-[var(--color-accent-blue)] text-[var(--color-accent-blue)]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[8.5px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold block mb-1">
                      {product.category} • {product.edition}
                    </span>
                    <h4 className="font-serif text-[15px] sm:text-[16px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors line-clamp-1 leading-snug">
                      {product.title}
                    </h4>
                    <p className="text-[11.5px] font-sans text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-baseline justify-between">
                    <span className="text-[14px] font-sans font-bold text-[var(--color-text-primary)] tabular-nums">
                      ৳{product.priceBDT.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-sans text-[var(--color-text-muted)]">
                      (${product.priceUSD})
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* =========================================================================
          4. MAISON CHATTOGRAM MANIFESTO FULL-WIDTH FOOTER CARD
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pb-8">
        <div className="w-full bg-[var(--color-card-subtle)] border border-[var(--color-border)] p-8 sm:p-14 flex flex-col items-center text-center relative overflow-hidden transition-colors">
          <div className="w-16 h-0.5 bg-[var(--color-accent-bronze)] mb-5" />
          <p className="font-serif text-[22px] sm:text-[28px] italic text-[var(--color-text-primary)] max-w-2xl leading-relaxed mb-4">
            “Maison Chattogram: Maritime Heritage Meets Haute Tailoring. Handcrafted in the Port City for patrons across Bangladesh and worldwide.”
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-sans tracking-[0.24em] uppercase text-[var(--color-text-secondary)] mb-8">
            <span>Flagship: GEC Circle, Nasirabad, Chattogram</span>
            <span className="text-[var(--color-text-muted)]">•</span>
            <span>Dhaka Liaison Suite: Gulshan 2</span>
            <span className="text-[var(--color-text-muted)]">•</span>
            <span>DHL Global White-Glove Dispatch</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={onNavigateToAbout}
              className="px-8 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer shadow-md"
            >
              Read Atelier Story
            </button>
            <button
              type="button"
              onClick={onNavigateToVIP}
              className="px-8 py-3.5 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:border-[var(--color-accent-bronze)] transition-colors cursor-pointer"
            >
              VIP Obsidian Privileges
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
