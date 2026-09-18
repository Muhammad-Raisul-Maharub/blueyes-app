import React from 'react'
import type { DistrictProduct, DistrictCategory } from './types'
import { DISTRICT_PRODUCTS, DISTRICT_GATEWAY_PILLS } from './districtData'
import { ArrowRight, Zap, Shield, Flame, Eye } from 'lucide-react'

interface DistrictHomeProps {
  onSelectProduct: (product: DistrictProduct) => void
  onNavigateCategory: (category: DistrictCategory) => void
  onNavigateRunway: () => void
  onNavigateAbout: () => void
  onQuickAdd: (product: DistrictProduct) => void
}

export const DistrictHome: React.FC<DistrictHomeProps> = ({
  onSelectProduct,
  onNavigateCategory,
  onNavigateRunway,
  onNavigateAbout,
  onQuickAdd,
}) => {
  return (
    <div className="w-full flex flex-col pb-24 animate-fadeIn transition-colors duration-200">
      {/* 1. Kinetic Streetwear Hero Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8">
        <div className="w-full bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 shadow-[4px_4px_0px_0px_#0047FF]">
          {/* Hero Image Visuals (Col-span 7) */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] lg:h-[580px] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"
              alt="District Heavyweight Drop"
              className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gritty Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_0px_#000]">
                <Flame className="w-3.5 h-3.5 fill-[#090A0E]" />
                ARCHIVE DROP 02 // LIVE
              </span>
              <span className="px-2.5 py-1 bg-[#0047FF] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider">
                CHATTOGRAM ORIGIN
              </span>
            </div>

            {/* Bottom Visual Tag */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#CCFF00] font-bold block">
                  HERO PIECE // 480 GSM
                </span>
                <h3 className="font-syne font-extrabold text-[20px] sm:text-[24px] text-white uppercase leading-tight">
                  EXO-SKELETON HEAVYWEIGHT HOODIE
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct(DISTRICT_PRODUCTS[3])}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[11px] font-bold uppercase hover:bg-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
              >
                <span>VIEW SPEC</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Hero Narrative & CTAs (Col-span 5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white dark:bg-[#13151D] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] dark:border-[#2C3142]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#0047FF] dark:bg-[#CCFF00] animate-ping" />
                <span className="font-mono-tech text-[10px] font-bold uppercase tracking-[0.22em] text-[#0047FF] dark:text-[#CCFF00]">
                  PORT CITY INDUSTRIAL STREETWEAR
                </span>
              </div>

              <h2 className="font-syne font-extrabold text-[32px] sm:text-[42px] lg:text-[46px] text-[#090A0E] dark:text-white uppercase leading-[1.05] tracking-tight mb-4">
                BUILT IN <span className="text-[#0047FF]">CHATTOGRAM</span>, FOR THE NATION.
              </h2>

              <p className="font-dm text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                From the container yards of Karnaphuli to the neon streets of Dhaka. Heavyweight 480 GSM fleeces, 14oz rigid selvedge denim, and modular tactical gear engineered with zero compromise.
              </p>

              {/* Quick Tech Specs Highlight */}
              <div className="grid grid-cols-2 gap-2 mb-8 font-mono-tech text-[11px]">
                <div className="p-2.5 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142] flex flex-col">
                  <span className="text-[#64748B] dark:text-[#8E95A5] text-[9px]">SPEED LOGISTICS</span>
                  <span className="text-[#090A0E] dark:text-white font-bold">SAME-DAY IN CTG</span>
                </div>
                <div className="p-2.5 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142] flex flex-col">
                  <span className="text-[#64748B] dark:text-[#8E95A5] text-[9px]">DOMESTIC COVERAGE</span>
                  <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold">ALL 64 DISTRICTS</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigateCategory('Men')}
                className="flex-1 py-4 px-6 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#0047FF]"
              >
                <span>SHOP MEN'S COLLECTION</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onNavigateRunway}
                className="flex-1 py-3.5 px-6 bg-white dark:bg-[#090A0E] text-[#090A0E] dark:text-white border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] font-mono-tech text-[12px] font-bold uppercase tracking-wider active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
                <span>VIEW RUNWAY ARCHIVE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Gateway Pills */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2C3142] pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
            <h3 className="font-syne font-extrabold text-[18px] sm:text-[22px] text-[#090A0E] dark:text-white uppercase tracking-tight">
              SELECT YOUR SECTOR
            </h3>
          </div>
          <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#64748B] dark:text-[#8E95A5]">
            5 DEPARTMENTS ACTIVE
          </span>
        </div>

        {/* 5 Department Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {DISTRICT_GATEWAY_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => onNavigateCategory(pill.id as DistrictCategory)}
              className="p-3 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] hover:shadow-[3px_3px_0px_0px_#0047FF] dark:hover:shadow-[3px_3px_0px_0px_#CCFF00] transition-all flex flex-col items-start text-left group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden mb-2.5 border border-[#E2E8F0] dark:border-[#2C3142]">
                <img
                  src={pill.image}
                  alt={pill.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-syne font-extrabold text-[15px] text-[#090A0E] dark:text-white uppercase tracking-wider group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors">
                {pill.label}
              </span>
              <span className="font-mono-tech text-[9px] font-bold text-[#64748B] dark:text-[#8E95A5] uppercase tracking-wider mt-0.5">
                {pill.sub}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Asymmetrical Bento Merchandising Tiles */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6 flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2C3142] pb-3">
          <div>
            <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] uppercase tracking-widest">
              CURATED ARCHITECTURE
            </span>
            <h3 className="font-syne font-extrabold text-[24px] sm:text-[30px] text-[#090A0E] dark:text-white uppercase">
              BENTO DROP MATRIX
            </h3>
          </div>
          <button
            type="button"
            onClick={onNavigateAbout}
            className="font-mono-tech text-[11px] font-bold uppercase text-[#0047FF] dark:text-[#CCFF00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>ABOUT DISTRICT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Tile 1: Oversized Denim & Balloon Silhouette (Col-span 7) */}
          <div
            onClick={() => onNavigateCategory('Women')}
            className="md:col-span-7 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] p-6 relative overflow-hidden group cursor-pointer hover:border-[#0047FF] hover:shadow-[4px_4px_0px_0px_#0047FF] transition-all min-h-[320px] flex flex-col justify-between"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-60 group-hover:opacity-85 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"
                alt="Parachute Denim"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#13151D] dark:via-[#13151D]/80 dark:to-transparent" />
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="px-2 py-0.5 bg-[#0047FF] text-white font-mono-tech text-[9px] font-bold uppercase">
                14OZ RIGID SELVEDGE
              </span>
              <h4 className="font-syne font-extrabold text-[24px] sm:text-[28px] text-[#090A0E] dark:text-white uppercase mt-2 mb-2 leading-tight">
                OVERSIZED PARACHUTE DENIM
              </h4>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed mb-4">
                Extreme-volume parachute trousers with 3D articulated knee pleats and modular ankle bungee clamps. Built for effortless stacking over chunky skate kicks.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-[#0047FF] dark:text-[#CCFF00] font-mono-tech text-[11px] font-bold uppercase">
              <span>EXPLORE DENIM SECTOR</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 2: Mini-Me Kids Squad (Col-span 5) */}
          <div
            onClick={() => onNavigateCategory('Kids')}
            className="md:col-span-5 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] p-6 relative overflow-hidden group cursor-pointer hover:border-[#CCFF00] hover:shadow-[4px_4px_0px_0px_#CCFF00] transition-all min-h-[320px] flex flex-col justify-between"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-50 group-hover:opacity-75 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
                alt="Junior Mini-Me Set"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#13151D] dark:via-[#13151D]/85 dark:to-transparent" />
            </div>

            <div className="relative z-10 max-w-xs">
              <span className="px-2 py-0.5 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[9px] font-extrabold uppercase">
                2–15Y SQUAD
              </span>
              <h4 className="font-syne font-extrabold text-[22px] sm:text-[26px] text-[#090A0E] dark:text-white uppercase mt-2 mb-2 leading-tight">
                JUNIOR MINI-ME SUITES
              </h4>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed mb-4">
                Downscaled 340 GSM heavy fleeces and distressed denim for young skaters. Identical construction to our adult drops.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-[#090A0E] dark:text-white font-mono-tech text-[11px] font-bold uppercase">
              <span>SHOP KIDS (2–15Y)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 3: Tactical Cordura Gear & Hardware (Col-span 12) */}
          <div
            onClick={() => onNavigateCategory('Accessories')}
            className="md:col-span-12 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer hover:border-[#0047FF] dark:hover:border-[#CCFF00] hover:shadow-[4px_4px_0px_0px_#0047FF] dark:hover:shadow-[4px_4px_0px_0px_#CCFF00] transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] p-2 flex-shrink-0 flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#0047FF] dark:text-[#CCFF00]" />
              </div>
              <div>
                <span className="font-mono-tech text-[9px] font-bold uppercase tracking-widest text-[#0047FF] dark:text-[#CCFF00]">
                  1000D CORDURA // 316L HARDWARE
                </span>
                <h4 className="font-syne font-extrabold text-[22px] sm:text-[26px] text-[#090A0E] dark:text-white uppercase mt-1">
                  TACTICAL GEAR & CARABINER CHAINS
                </h4>
                <p className="font-dm text-[13px] text-[#64748B] dark:text-[#94A3B8] max-w-xl mt-1">
                  Crossbody chest harnesses with magnetic Fidlock clasps, solid industrial chains, and reversible 3M reflective bucket hats.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="py-3 px-6 bg-[#0047FF] text-white font-mono-tech text-[11px] font-bold uppercase tracking-wider group-hover:bg-[#CCFF00] group-hover:text-[#090A0E] transition-colors flex-shrink-0 cursor-pointer shadow-[2px_2px_0px_0px_#090A0E]"
            >
              EXPLORE TACTICAL GEAR
            </button>
          </div>
        </div>
      </section>

      {/* 4. Trending Streetwear Product Matrix */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6 flex items-end justify-between border-b border-[#E2E8F0] dark:border-[#2C3142] pb-3">
          <div>
            <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-widest">
              HOT DROP LIST
            </span>
            <h3 className="font-syne font-extrabold text-[24px] sm:text-[30px] text-[#090A0E] dark:text-white uppercase">
              TRENDING DISTRICT GEAR
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCategory('All')}
            className="font-mono-tech text-[11px] font-bold text-[#090A0E] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors uppercase flex items-center gap-1 cursor-pointer"
          >
            <span>FULL 15-PIECE CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DISTRICT_PRODUCTS.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all p-3 flex flex-col group cursor-pointer shadow-sm hover:shadow-[3px_3px_0px_0px_#0047FF] dark:hover:shadow-[3px_3px_0px_0px_#CCFF00]"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden border border-[#E2E8F0] dark:border-[#2C3142]">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[9px] font-extrabold uppercase shadow-sm">
                    {product.badge}
                  </div>
                )}

                {/* GSM Spec Tag */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white font-mono-tech text-[9px] font-bold uppercase backdrop-blur-sm">
                  {typeof product.gsm === 'number' ? `${product.gsm} GSM` : product.gsm}
                </div>

                {/* Stock Left Indicator */}
                {product.stockLeft <= 8 && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FF2A4B] text-white font-mono-tech text-[8.5px] font-bold uppercase animate-pulse">
                    ONLY {product.stockLeft} LEFT
                  </div>
                )}
              </div>

              {/* Product Data */}
              <div className="pt-3 pb-1 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono-tech text-[9px] text-[#64748B] dark:text-[#8E95A5] uppercase font-bold block mb-1">
                    {product.category} // {product.fit}
                  </span>
                  <h4 className="font-space font-bold text-[15px] text-[#090A0E] dark:text-white group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors line-clamp-1 leading-snug">
                    {product.title}
                  </h4>
                  <p className="font-dm text-[12px] text-[#64748B] dark:text-[#8E95A5] line-clamp-1 mt-0.5">
                    {product.fabric}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between">
                  <div>
                    <span className="font-mono-tech font-extrabold text-[15px] text-[#090A0E] dark:text-white block">
                      ৳{product.priceBDT.toLocaleString()}
                    </span>
                    <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5]">
                      (${product.priceUSD})
                    </span>
                  </div>

                  {/* QUICK ADD Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onQuickAdd(product)
                    }}
                    className="px-3.5 py-1.5 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[10px] font-extrabold uppercase hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all shadow-[2px_2px_0px_0px_#0047FF] cursor-pointer"
                  >
                    QUICK ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Port City Manifesto Footer Card */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden transition-colors">
          <div className="w-12 h-1 bg-[#0047FF] dark:bg-[#CCFF00] mb-4" />
          <h3 className="font-syne font-extrabold text-[24px] sm:text-[32px] text-[#090A0E] dark:text-white uppercase tracking-tight max-w-2xl leading-snug mb-3">
            DISTRICT CHATTOGRAM: PORT CITY UNDERGROUND MEETS GLOBAL STREETWEAR
          </h3>
          <p className="font-dm text-[14px] text-[#64748B] dark:text-[#94A3B8] max-w-xl mb-6 leading-relaxed">
            Raw industrial textiles manufactured on home soil. Express dispatch to all 64 districts in 24–72 hours. Fast global delivery via DHL Express.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={onNavigateAbout}
              className="px-6 py-3 bg-[#090A0E] dark:bg-white text-white dark:text-[#090A0E] font-mono-tech text-[11px] font-extrabold uppercase hover:bg-[#0047FF] dark:hover:bg-[#CCFF00] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
            >
              READ FULL NARRATIVE
            </button>
            <button
              type="button"
              onClick={() => onNavigateCategory('All')}
              className="px-6 py-3 bg-white dark:bg-[#090A0E] text-[#090A0E] dark:text-white border border-[#E2E8F0] dark:border-[#2C3142] font-mono-tech text-[11px] font-bold uppercase hover:border-[#0047FF] dark:hover:border-white transition-colors cursor-pointer"
            >
              BROWSE ALL 15 DROPS
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
