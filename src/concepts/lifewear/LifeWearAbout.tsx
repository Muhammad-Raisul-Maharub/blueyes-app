import React from 'react'
import { MapPin, Compass, Factory, Truck, Package, Clock, ArrowRight } from 'lucide-react'
import type { LifeWearCategory, LifeWearView } from './types'

interface LifeWearAboutProps {
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
}

export const LifeWearAbout: React.FC<LifeWearAboutProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* Editorial Header */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left space-y-4">
          <div className="inline-flex items-center space-x-2 border border-[var(--color-border)] bg-[var(--color-canvas)] px-2.5 py-1 text-[11px] font-mono">
            <span className="w-2 h-2 bg-[#004CE8] inline-block" />
            <span className="font-semibold text-[var(--color-text-primary)]">LIFEWEAR MANIFESTO</span>
            <span className="text-[var(--color-text-secondary)]">/</span>
            <span className="text-[var(--color-text-secondary)]">ORIGIN: CHATTOGRAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.15]">
            LifeWear Chattogram: Utilitarian Staples Engineered for Daily Life.
          </h1>

          <p className="text-base text-[var(--color-text-secondary)] font-mono leading-relaxed">
            We reject the cycle of seasonal disposable garments. Built at the maritime intersection of the Bay of Bengal, Blu Eyes LifeWear combines Nordic architectural minimalism with Bangladesh’s world-renowned textile knitting heritage.
          </p>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center text-[#004CE8] dark:text-[#387BFF]">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
              Port of Chattogram Manufacturing
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Our partner facilities are situated in the Chattogram Industrial Corridor. By spinning, weaving, garment-dyeing, and testing within a 15km radius of the sea terminal, we slash supply chain transport emissions while upholding rigorous fair-labor protocols.
            </p>
            <div className="pt-2 font-mono text-[10px] text-[var(--color-text-secondary)]">
              PORT TERMINAL // LAT 22.3569° N
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center text-[#004CE8] dark:text-[#387BFF]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
              All 64 Districts In 48 Hours
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              High-speed domestic logistics engineered to reach every corner of Bangladesh. Same-day motorcycle couriers cover Chattogram metro within hours, while express domestic road networks service all 64 districts with transparent tracking.
            </p>
            <div className="pt-2 font-mono text-[10px] text-[var(--color-text-secondary)]">
              DOMESTIC HUB // 64 DISTRICT REACH
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 text-left">
            <div className="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center text-[#004CE8] dark:text-[#387BFF]">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
              100% Unbleached Kraft Packaging
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Every parcel leaves our warehouse in natural, unbleached kraft paper containers bound with biodegradable raw jute cord. Zero plastic films, zero laminates, and fully compostable at end of life.
            </p>
            <div className="pt-2 font-mono text-[10px] text-[var(--color-text-secondary)]">
              CIRCULAR ZERO PLASTIC INITIATIVE
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Location Details */}
      <section className="w-full bg-[var(--color-surface)] border-y border-[var(--color-border)] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">
              FLAGSHIP HEADQUARTERS & ATELIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
              GEC Circle, Chattogram
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Visit our physical studio in the heart of Chattogram. Experience our tactile fabric density library, test sample GSM swatches from 110 to 500 GSM, and pick up online orders with zero courier waiting time.
            </p>

            <div className="p-4 bg-[var(--color-canvas)] border border-[var(--color-border)] font-mono text-xs space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#004CE8] dark:text-[#387BFF]" />
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Level 3, GEC Circle Commercial Complex, Chattogram 4000
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4" />
                <span>Open Daily: 10:00 AM – 09:00 PM BST</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
                <Compass className="w-4 h-4" />
                <span>Coordinates: 22.3569° N, 91.8215° E</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('women', 'women')}
              className="px-6 py-3 bg-[#004CE8] hover:bg-[#0039B4] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-2"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] bg-[var(--color-canvas)] border border-[var(--color-border)] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=80"
              alt="LifeWear Chattogram Facility"
              className="w-full h-full object-cover filter contrast-[105%]"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 text-white font-mono text-[10px] tracking-wider">
              CHATTOGRAM LAB 04 // MATERIAL ARCHIVE
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
