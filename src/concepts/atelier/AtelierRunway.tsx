import React, { useState } from 'react'
import type { Product } from './types'
import { ATELIER_PRODUCTS } from './atelierData'
import { ArrowRight, Play } from 'lucide-react'

interface AtelierRunwayProps {
  onSelectProduct: (product: Product) => void
}

export const AtelierRunway: React.FC<AtelierRunwayProps> = ({ onSelectProduct }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0)

  const runwayLooks = [
    {
      lookNumber: 'LOOK 01',
      title: 'Obsidian Cowl Gown with Silk Train',
      model: 'Ananya • Elite Paris',
      product: ATELIER_PRODUCTS[0],
      music: 'Debussy — Clair de Lune (Atelier Edit)',
      duration: '42s Reel',
      image: ATELIER_PRODUCTS[0].images[0],
    },
    {
      lookNumber: 'LOOK 02',
      title: 'Sculpted Cobalt Tuxedo with Grosgrain Trim',
      model: 'Rahim • Milan Men',
      product: ATELIER_PRODUCTS[1],
      music: 'Ravel — Pavane in Blue',
      duration: '38s Reel',
      image: ATELIER_PRODUCTS[1].images[0],
    },
    {
      lookNumber: 'LOOK 03',
      title: 'Imperial Rajshahi Raw Tussar Panjabi',
      model: 'Tariq • Bengal Heritage',
      product: ATELIER_PRODUCTS[3],
      music: 'Artisan Loom Acoustic Harmonics',
      duration: '50s Reel',
      image: ATELIER_PRODUCTS[3].images[0],
    },
  ]

  const currentLook = runwayLooks[activeLookIndex]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 animate-fadeIn">
      {/* Runway Header */}
      <div className="pb-4 border-b border-[var(--color-border)] mb-6">
        <span className="text-[10px] font-sans uppercase tracking-[0.26em] text-[var(--color-accent-blue)] font-semibold">
          Paris • Dhaka Couture Week
        </span>
        <h2 className="font-serif text-[28px] sm:text-[36px] text-[var(--color-text-primary)] mt-1">
          S/S 2025 Runway Showcase
        </h2>
        <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] mt-1">
          Direct from the runway stage at Grand Palais Salon. Tap any look to examine haute couture craftsmanship.
        </p>
      </div>

      {/* Responsive Layout on Desktop (Grid: Large cinematic reel on left, looks on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Featured Runway Reel View (Col-span 8 on desktop) */}
        <div className="lg:col-span-8">
          <div className="w-full bg-black text-white relative aspect-[9/14] sm:aspect-[16/10] lg:aspect-[16/10] overflow-hidden border border-[#1C1B1B] shadow-2xl flex flex-col justify-between p-6">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

            {/* Top Bar inside Reel */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-[var(--color-accent-bronze)] text-white text-[10px] font-sans uppercase tracking-widest font-semibold shadow-sm">
                LIVE RUNWAY REEL
              </span>
              <span className="text-[11px] font-mono text-white/80">
                {currentLook.duration}
              </span>
            </div>

            {/* Center Play Button indicator */}
            <div className="relative z-10 self-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>

            {/* Bottom details & Quick PDP action */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/20">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[var(--color-accent-blue-light)]">
                  {currentLook.lookNumber} • {currentLook.model}
                </span>
                <h3 className="font-serif text-[22px] sm:text-[26px] text-white mt-1 leading-snug">
                  {currentLook.title}
                </h3>
                <span className="text-[11px] font-sans text-white/70 italic block mt-1">
                  ♪ {currentLook.music}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectProduct(currentLook.product)}
                className="px-5 py-2.5 bg-white text-[#1C1B1B] text-[11px] font-sans uppercase tracking-[0.16em] font-semibold flex items-center gap-2 hover:bg-[var(--color-accent-blue)] hover:text-white transition-colors cursor-pointer shadow-md flex-shrink-0"
              >
                <span>Inspect Piece</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Runway Look Thumbnails / Selector (Col-span 4 on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[var(--color-text-primary)] mb-1">
            Collection Looks ({runwayLooks.length})
          </span>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 scrollbar-none">
            {runwayLooks.map((look, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveLookIndex(idx)}
                className={`flex-shrink-0 w-36 lg:w-full p-2.5 border text-left cursor-pointer transition-all flex flex-col lg:flex-row gap-3 items-start lg:items-center ${
                  activeLookIndex === idx
                    ? 'border-[var(--color-accent-blue)] bg-[var(--color-card)] shadow-md'
                    : 'border-[var(--color-border)] bg-[var(--color-card-subtle)] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="w-full lg:w-16 aspect-[3/4] lg:aspect-square overflow-hidden bg-black/10 flex-shrink-0">
                  <img src={look.image} alt={look.lookNumber} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-sans uppercase font-bold text-[var(--color-text-primary)] block">
                    {look.lookNumber}
                  </span>
                  <h4 className="text-[12px] font-serif text-[var(--color-text-primary)] line-clamp-1">
                    {look.title}
                  </h4>
                  <span className="text-[10px] font-sans text-[var(--color-accent-bronze)] block mt-0.5">
                    Model: {look.model}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
