import React, { useState } from 'react'
import type { Product, Demographic } from './types'
import { ATELIER_PRODUCTS, DEMOGRAPHIC_PILLS } from './atelierData'
import { ArrowRight, Calendar, Heart, Anchor, MapPin } from 'lucide-react'

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

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full flex flex-col pb-24 animate-fadeIn">
      {/* 1. Haute Couture Campaign Hero Banner (Fluid & Expansive) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8">
        <div className="w-full bg-[var(--color-card)] border border-[var(--color-border)] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 transition-colors duration-200">
          {/* Split Hero Imagery (Col-span 7 on desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-0.5 w-full h-[360px] sm:h-[420px] lg:h-[560px] bg-[var(--color-surface-container)] relative">
            {/* Left Image: Silk Fluidity */}
            <div
              className="relative w-full h-full overflow-hidden group cursor-pointer"
              onClick={() => onSelectProduct(ATELIER_PRODUCTS[0])}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5uuwct9DRGsuTvQOElQTQs0CtR9j1TiQYYQj-0iEFOJKQU_KBFsEEgZPJHjT9apf99AqR0u-88CZnSRzfa0GoGN9tElxdDUWlnq2yt9vOu-nNYxI6joyVMXVBYSykMTIKI7SiOp7ZDtVBNU0WrWTJ1YCaEtur_UOE8CVxLY4dR7vK3ixaIRhWHiqxzMjkU4OpfBobQALi3mXT2hUMm98dq_VA69LvFo0ciNWha_WH0C1Z0SaZhj4P"
                alt="Mulberry Silk Fluidity"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-3 sm:left-4 flex flex-col">
                <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold">
                  Maison Première
                </span>
                <span className="text-[11px] sm:text-[13px] font-serif uppercase tracking-[0.16em] text-white">
                  Mulberry Silk Cowl Gown
                </span>
              </div>
            </div>

            {/* Right Image: Precision Cut */}
            <div
              className="relative w-full h-full overflow-hidden group cursor-pointer"
              onClick={() => onSelectProduct(ATELIER_PRODUCTS[3])}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOJUWQ_9FRY5jsSEkQYH0mpdQQvtHLSV584mR1K2gmj3qeRSqio-z41KTt1wnWYhvF3-dIrCZILEdQK6h7DBZjOtb7LgUogYz--2fviI7Dm1YtVy7Onn-l1K1FI0FIs1GqWolhPBJ2T_80H40wp60MvTFfp-Qoq9Zu24lk3JZz_28OcXrYiQrE1VKLRSwkG-XSo_dsccAk3itNvuSYNFy6D1tz0-8QugoIqNd7IGrdXqS_eOu2QEZO"
                alt="Imperial Silk Panjabi"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-3 sm:left-4 flex flex-col">
                <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold">
                  Sartorial Masterpiece
                </span>
                <span className="text-[11px] sm:text-[13px] font-serif uppercase tracking-[0.16em] text-white">
                  Rajshahi Raw Silk Panjabi
                </span>
              </div>
            </div>

            {/* Floating Edition Tag */}
            <div className="absolute top-4 right-4 bg-[var(--color-accent-bronze)] text-white px-3 py-1 shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                Chattogram Edition 01
              </span>
            </div>
          </div>

          {/* Hero Narrative & CTAs (Col-span 5 on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left bg-[var(--color-card)] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Anchor className="w-3.5 h-3.5 text-[var(--color-accent-bronze)]" />
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[var(--color-accent-bronze)] font-semibold">
                Maison Chattogram
              </span>
            </div>
            <h2 className="font-serif text-[28px] sm:text-[36px] lg:text-[42px] text-[var(--color-text-primary)] tracking-tight mb-3 leading-tight">
              Maritime Heritage Meets Haute Tailoring
            </h2>
            <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] max-w-md mb-8 leading-relaxed">
              Born along the historic maritime port of Chattogram, weaving pure Rajshahi mulberry silks with architectural tailoring for patrons across Bangladesh and worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="w-full max-w-md flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigateToCategory('Women')}
                className="flex-1 py-4 px-6 bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[var(--color-accent-blue)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore Salon Première</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateToAbout}
                className="flex-1 py-3.5 px-6 bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:border-[var(--color-accent-bronze)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[var(--color-accent-bronze)]" />
                <span>Book Fitting in Chattogram</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Salons (Demographic Pods: Women, Men, Kids, Baby, Accessories) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mb-6 flex items-baseline justify-between border-b border-[var(--color-border)] pb-3">
          <div>
            <h3 className="font-serif text-[22px] sm:text-[26px] text-[var(--color-text-primary)] font-medium">
              Curated Departments
            </h3>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3" />
              Flagship: GEC Circle, Chattogram • Liaison Suite: Gulshan 2, Dhaka
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToCurate}
            className="text-[11px] font-sans uppercase tracking-[0.16em] text-[var(--color-accent-blue)] hover:underline cursor-pointer font-semibold"
          >
            Full Catalog Archive →
          </button>
        </div>

        {/* Responsive Gateway Pods */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {DEMOGRAPHIC_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => onNavigateToCategory(pill.id as Demographic)}
              className="flex flex-col items-center flex-shrink-0 snap-center group cursor-pointer w-[90px] sm:w-[110px] lg:w-full transition-transform duration-200 active:scale-95"
            >
              <div className="w-[76px] h-[76px] sm:w-[94px] sm:h-[94px] lg:w-[110px] lg:h-[110px] p-1 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-accent-blue)] transition-all duration-300 bg-[var(--color-card-subtle)] shadow-sm">
                <img
                  src={pill.image}
                  alt={pill.label}
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="mt-2.5 text-[11.5px] sm:text-[12.5px] font-sans font-semibold text-[var(--color-text-primary)] tracking-wider uppercase group-hover:text-[var(--color-accent-blue)] transition-colors">
                {pill.label}
              </span>
              <span className="text-[9px] font-sans text-[var(--color-accent-bronze)] tracking-widest uppercase">
                {pill.sub}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Selected Atelier Pieces (Multi-Category Spotlight) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-end justify-between mb-6 border-b border-[var(--color-border)] pb-3">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-blue)] font-semibold">
              Seasonal Archive
            </span>
            <h3 className="font-serif text-[26px] sm:text-[32px] text-[var(--color-text-primary)] italic">
              Hand-Loomed & Tailored Masterpieces
            </h3>
          </div>
          <button
            type="button"
            onClick={onNavigateToRunway}
            className="text-[12px] font-sans uppercase tracking-[0.16em] text-[var(--color-accent-bronze)] hover:text-[var(--color-text-primary)] flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Runway Showcase</span>
            <ArrowRight className="w-4 h-4 -rotate-45" />
          </button>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATELIER_PRODUCTS.slice(0, 4).map((product) => {
            const isFav = !!favorites[product.id]
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] p-3.5 shadow-sm flex flex-col group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[var(--color-accent-bronze-light)] text-[var(--color-accent-bronze-dark)] px-2.5 py-0.5 shadow-sm">
                      <span className="text-[9px] font-sans font-semibold uppercase tracking-wider">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(product.id, e)}
                    aria-label="Save to Wishlist"
                    className="absolute top-3 right-3 w-8 h-8 bg-[var(--color-card)]/85 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-text-primary)] shadow-sm hover:text-[var(--color-accent-blue)] active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-[var(--color-accent-blue)] text-[var(--color-accent-blue)]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-medium block mb-1">
                      {product.edition}
                    </span>
                    <h4 className="font-serif text-[17px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-[12px] font-sans text-[var(--color-text-secondary)] mt-1 line-clamp-1">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-baseline justify-between">
                    <span className="text-[14px] font-sans font-semibold text-[var(--color-text-primary)] tabular-nums">
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

      {/* 4. Editorial Signature Manifesto: Maison Chattogram */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="w-full bg-[var(--color-card-subtle)] border border-[var(--color-border)] p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden transition-colors">
          <div className="w-16 h-0.5 bg-[var(--color-accent-bronze)] mb-5" />
          <p className="font-serif text-[20px] sm:text-[26px] italic text-[var(--color-text-primary)] max-w-xl leading-relaxed mb-4">
            “Maison Chattogram: Maritime Heritage Meets Haute Tailoring. Handcrafted in the Port City for patrons across Bangladesh and worldwide.”
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-sans tracking-[0.22em] uppercase text-[var(--color-text-secondary)] mb-6">
            <span>Flagship: GEC Circle, Nasirabad, Chattogram</span>
            <span className="text-[var(--color-text-muted)]">•</span>
            <span>Dhaka Liaison Suite: Gulshan 2</span>
            <span className="text-[var(--color-text-muted)]">•</span>
            <span>DHL Global White-Glove Dispatch</span>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onNavigateToAbout}
              className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer shadow-sm"
            >
              Read Atelier Story
            </button>
            <button
              type="button"
              onClick={onNavigateToVIP}
              className="px-6 py-3 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:border-[var(--color-accent-bronze)] transition-colors cursor-pointer"
            >
              VIP Obsidian Privileges
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
