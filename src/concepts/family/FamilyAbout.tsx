import React from 'react'
import { MapPin, Heart, ShieldCheck, Factory, Truck, Clock, ArrowRight } from 'lucide-react'
import type { FamilyDemographic, FamilyView } from './types'

interface FamilyAboutProps {
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
}

export const FamilyAbout: React.FC<FamilyAboutProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans']">
      {/* Editorial Header */}
      <section className="w-full bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] py-14 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-[1400px] mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#175CD3]/10 text-[#175CD3] text-xs font-bold uppercase">
            <Heart className="w-3.5 h-3.5 text-[#F76C5E] fill-[#F76C5E]" />
            <span>OUR MULTI-GENERATIONAL MANIFESTO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] font-['Outfit'] leading-tight">
            Maison Chattogram: Clothing Every Generation of Bangladesh.
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            Founded with a singular vision: to dress parents, children, and infants in garments that are as gentle on sensitive skin as they are enduring in coastal humidity. Mindfully knitted and finished at the Port of Chattogram.
          </p>
        </div>
      </section>

      {/* 3 Family Pillars */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#175CD3]/10 flex items-center justify-center text-[#175CD3]">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit']">
              Port of Chattogram Ethical Mill
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              We collaborate with master knitters along the Karnaphuli river delta. By maintaining our dye labs, garment ateliers, and packaging facilities in Chattogram, we ensure 100% fair-wage artisan employment and rigorous safety auditing.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F76C5E]/15 flex items-center justify-center text-[#F76C5E]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit']">
              Non-Toxic Baby-Safe Dyes
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              All infant layettes and children's sets comply with OEKO-TEX Standard 100 Class 1 (Baby Safe). Our natural botanical dyes contain zero lead, nickel, or formaldehyde, protecting newborn barrier layers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 flex items-center justify-center text-[#b5730a] dark:text-[#FDB843]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit']">
              Nationwide 64-District Reach
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Same-day direct dispatch for families across Chattogram metro. Dedicated express domestic road logistics delivering celebratory gift packages to all 64 districts within 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Store Profile */}
      <section className="w-full bg-[var(--color-surface-soft)] border-y border-[var(--color-border)] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#175CD3] uppercase tracking-wider">
              VISIT OUR PHYSICAL EXPERIENCE STORE
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              Flagship Studio: GEC Circle, Chattogram
            </h2>

            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Bring your family to our warm community atelier. Experience tactile touch-tests of our organic cloud cotton, measure developmental growth milestones on our interactive nursery wall, and customize celebration gift boxes in person.
            </p>

            <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2 text-xs font-semibold text-[var(--color-text-secondary)]">
              <div className="flex items-center space-x-2 text-[var(--color-text-primary)]">
                <MapPin className="w-4 h-4 text-[#175CD3]" />
                <span>Level 2, GEC Circle Commercial Centre, Chattogram 4000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#F76C5E]" />
                <span>Open Daily: 10:00 AM – 9:00 PM BST</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('category', 'all')}
              className="px-7 py-3.5 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer shadow-md flex items-center space-x-2"
            >
              <span>Explore Family Wardrobes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 border border-[var(--color-border)] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80"
              alt="Family Store Chattogram"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
