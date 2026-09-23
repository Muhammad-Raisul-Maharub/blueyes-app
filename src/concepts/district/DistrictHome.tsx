import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { DistrictProduct, DistrictCategory } from './types'
import { DISTRICT_PRODUCTS } from './districtData'
import { ArrowRight, Zap, Shield, Flame, Terminal, Clock, ShoppingCart } from 'lucide-react'

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
  onNavigateRunway: _onNavigateRunway,
  onNavigateAbout,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<DistrictCategory>('All')

  // Top 6 bento hero items
  const hoodieHero = DISTRICT_PRODUCTS.find((p) => p.id === 'dst-m-01') || DISTRICT_PRODUCTS[0]
  const stockCounterItem = DISTRICT_PRODUCTS.find((p) => p.id === 'dst-m-02') || DISTRICT_PRODUCTS[1]
  const accessoryItem = DISTRICT_PRODUCTS.find((p) => p.id === 'dst-a-01') || DISTRICT_PRODUCTS[10]
  const denimItem = DISTRICT_PRODUCTS.find((p) => p.id === 'dst-w-02') || DISTRICT_PRODUCTS[5]
  const kidsItem = DISTRICT_PRODUCTS.find((p) => p.id === 'dst-k-01') || DISTRICT_PRODUCTS[7]

  // Tactical navigation categories
  const tacticalPills: { id: DistrictCategory; label: string; code: string }[] = [
    { id: 'All', label: 'ALL ARCHIVE', code: 'SYS-00' },
    { id: 'Men', label: 'MEN INDUSTRIAL', code: 'SYS-01' },
    { id: 'Women', label: 'WOMEN PARACHUTE', code: 'SYS-02' },
    { id: 'Kids', label: 'JUNIOR SKATE', code: 'SYS-03' },
    { id: 'Accessories', label: 'TACTICAL GEAR', code: 'SYS-04' },
  ]

  // Filtered product grid
  const displayProducts =
    activeTab === 'All'
      ? DISTRICT_PRODUCTS
      : DISTRICT_PRODUCTS.filter((p) => p.category === activeTab)

  return (
    <div className="w-full flex flex-col pb-28 transition-colors duration-200 bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* =========================================================================
          1. CONTINUOUS ANIMATED NEON MARQUEE TICKER (Edge-to-Edge)
          ========================================================================= */}
      <div className="w-full bg-[#0047FF] text-[#CCFF00] py-2 overflow-hidden border-b-2 border-black dark:border-[#CCFF00] font-mono-tech text-[11px] font-extrabold uppercase tracking-widest select-none shadow-sm">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span>🔥 ARCHIVE DROP 02 // CHATTOGRAM PORT TERMINAL // 480 GSM FLEECE DEPLOYED // SAME-DAY CTG METRO // ALL 64 DISTRICTS EXPRESS LOGISTICS // ZERO MASS PRODUCTION // 316L SURGICAL GRADE HARDWARE //</span>
          <span>🔥 ARCHIVE DROP 02 // CHATTOGRAM PORT TERMINAL // 480 GSM FLEECE DEPLOYED // SAME-DAY CTG METRO // ALL 64 DISTRICTS EXPRESS LOGISTICS // ZERO MASS PRODUCTION // 316L SURGICAL GRADE HARDWARE //</span>
          <span>🔥 ARCHIVE DROP 02 // CHATTOGRAM PORT TERMINAL // 480 GSM FLEECE DEPLOYED // SAME-DAY CTG METRO // ALL 64 DISTRICTS EXPRESS LOGISTICS // ZERO MASS PRODUCTION // 316L SURGICAL GRADE HARDWARE //</span>
        </div>
      </div>

      {/* =========================================================================
          2. HIGH-DENSITY BRUTALIST 6-TILE BENTO BOX HERO
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          {/* TILE 1: Oversized Video-Look Hoodie Tile (Col-span 7 on desktop, 2 rows high) */}
          <div
            onClick={() => onSelectProduct(hoodieHero)}
            className="md:col-span-7 bg-black text-white border-2 border-black dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all p-6 sm:p-8 relative overflow-hidden group cursor-pointer shadow-[5px_5px_0px_0px_#0047FF] flex flex-col justify-between min-h-[480px] lg:min-h-[580px]"
          >
            {/* Background Image with Streetwear Gritty Atmosphere */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={hoodieHero.images[0]}
                alt={hoodieHero.title}
                className="w-full h-full object-cover object-top opacity-75 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            </div>

            {/* Overlaid Tactical Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#CCFF00] text-black font-mono-tech text-[10.5px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]">
                  <Flame className="w-3.5 h-3.5 fill-black" />
                  TILE 01 // OVERSIZED DROP
                </span>
                <span className="px-2.5 py-1 bg-[#0047FF] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider">
                  480 GSM FLEECE
                </span>
              </div>
              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-[#CCFF00] font-mono-tech text-[10px] font-bold uppercase">
                CTG ORIGIN
              </span>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 pt-32">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#CCFF00] font-bold block mb-1">
                HEAVYWEIGHT INDUSTRIAL SILHOUETTE
              </span>
              <h2 className="font-syne font-extrabold text-[28px] sm:text-[38px] lg:text-[44px] text-white uppercase leading-[1.02] tracking-tight mb-3">
                {hoodieHero.title}
              </h2>
              <p className="font-dm text-[13px] sm:text-[14px] text-slate-300 max-w-lg mb-6 leading-relaxed line-clamp-2">
                {hoodieHero.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/20">
                <div className="font-mono-tech">
                  <span className="text-[20px] font-extrabold text-white block">
                    ৳{hoodieHero.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#CCFF00]">
                    (${hoodieHero.priceUSD} USD • WORLDWIDE DISPATCH)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onQuickAdd(hoodieHero)
                    }}
                    className="px-5 py-2.5 bg-[#CCFF00] text-black font-mono-tech text-[11px] font-extrabold uppercase hover:bg-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#0047FF] flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>FAST ADD</span>
                  </motion.button>

                  <button
                    type="button"
                    className="px-4 py-2.5 bg-black/60 text-white border border-white/30 font-mono-tech text-[11px] font-bold uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    <span>SPEC VIEW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TILE 2: Live Stock Counter Tile ('Archive: 14 units left') (Col-span 5 on desktop) */}
          <div
            onClick={() => onSelectProduct(stockCounterItem)}
            className="md:col-span-5 bg-white dark:bg-[#13151D] border-2 border-black dark:border-[#2C3142] hover:border-[#FF2A4B] transition-all p-5 sm:p-6 relative overflow-hidden group cursor-pointer shadow-[5px_5px_0px_0px_#FF2A4B] flex flex-col justify-between min-h-[270px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#FF2A4B] text-white font-mono-tech text-[9.5px] font-extrabold uppercase flex items-center gap-1.5 animate-pulse">
                  <Clock className="w-3 h-3" />
                  TILE 02 // ARCHIVE: 14 UNITS LEFT
                </span>
                <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5] uppercase font-bold">
                  {stockCounterItem.gsm} GSM
                </span>
              </div>

              <h3 className="font-syne font-extrabold text-[22px] sm:text-[24px] text-[#090A0E] dark:text-white uppercase leading-tight group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors">
                {stockCounterItem.title}
              </h3>
              <p className="font-dm text-[12.5px] text-[#64748B] dark:text-[#94A3B8] mt-1.5 line-clamp-2">
                {stockCounterItem.description}
              </p>
            </div>

            {/* Live Stock Meter Bar */}
            <div className="my-4">
              <div className="flex justify-between font-mono-tech text-[10px] font-bold mb-1">
                <span className="text-[#FF2A4B]">WAREHOUSE ALLOCATION</span>
                <span className="text-[#090A0E] dark:text-white">14 / 50 UNITS</span>
              </div>
              <div className="w-full h-2 bg-[#ECEEF2] dark:bg-[#1B1E2B] overflow-hidden border border-black/20 dark:border-white/20">
                <div className="h-full bg-[#FF2A4B] w-[28%]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-[#2C3142]">
              <span className="font-mono-tech font-extrabold text-[16px] text-[#090A0E] dark:text-white">
                ৳{stockCounterItem.priceBDT.toLocaleString()}
              </span>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickAdd(stockCounterItem)
                }}
                className="px-4 py-1.5 bg-[#0047FF] text-white font-mono-tech text-[10.5px] font-extrabold uppercase hover:bg-[#CCFF00] hover:text-black transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#000]"
              >
                LOCK PIECE
              </motion.button>
            </div>
          </div>

          {/* TILE 3: Fast-Add Tactical Accessory Tile (Col-span 5 on desktop) */}
          <div
            onClick={() => onSelectProduct(accessoryItem)}
            className="md:col-span-5 bg-[#ECEEF2] dark:bg-[#1B1E2B] border-2 border-black dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all p-5 sm:p-6 relative overflow-hidden group cursor-pointer shadow-[5px_5px_0px_0px_#0047FF] dark:shadow-[5px_5px_0px_0px_#CCFF00] flex flex-col justify-between min-h-[270px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#0047FF] text-white font-mono-tech text-[9.5px] font-extrabold uppercase flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  TILE 03 // 1000D HARDWARE
                </span>
                <span className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] uppercase font-bold">
                  FAST-ADD ACCESSORY
                </span>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-white dark:bg-[#090A0E] border border-black/20 dark:border-white/20 overflow-hidden flex-shrink-0">
                  <img
                    src={accessoryItem.images[0]}
                    alt={accessoryItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-[17px] text-[#090A0E] dark:text-white uppercase leading-snug line-clamp-1">
                    {accessoryItem.title}
                  </h3>
                  <p className="font-dm text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-1 line-clamp-2">
                    {accessoryItem.fabric} • Fidlock magnetic connector
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#CBD5E1] dark:border-[#2C3142] mt-3">
              <span className="font-mono-tech font-extrabold text-[16px] text-[#090A0E] dark:text-white">
                ৳{accessoryItem.priceBDT.toLocaleString()}
              </span>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickAdd(accessoryItem)
                }}
                className="px-4 py-2 bg-[#CCFF00] text-black font-mono-tech text-[10.5px] font-extrabold uppercase hover:bg-[#0047FF] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-black group-hover:fill-white" />
                <span>INSTANT ADD</span>
              </motion.button>
            </div>
          </div>

          {/* TILE 4: Wide Denim Drop Card (Col-span 8 on desktop) */}
          <div
            onClick={() => onSelectProduct(denimItem)}
            className="md:col-span-8 bg-white dark:bg-[#13151D] border-2 border-black dark:border-[#2C3142] hover:border-[#0047FF] transition-all p-6 relative overflow-hidden group cursor-pointer shadow-[5px_5px_0px_0px_#0047FF] flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none">
              <img
                src={denimItem.images[0]}
                alt={denimItem.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#13151D] dark:via-[#13151D]/80 dark:to-transparent" />
            </div>

            <div className="relative z-10 max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#0047FF] text-white font-mono-tech text-[9.5px] font-extrabold uppercase">
                  TILE 04 // 14OZ RIGID SELVEDGE
                </span>
                <span className="font-mono-tech text-[9.5px] font-bold text-[#64748B] dark:text-[#8E95A5]">
                  DENIM SECTOR
                </span>
              </div>
              <h3 className="font-syne font-extrabold text-[24px] sm:text-[28px] text-[#090A0E] dark:text-white uppercase leading-tight mb-2">
                {denimItem.title}
              </h3>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed mb-4">
                Articulated 3D balloon knee architecture with modular ankle bungees for heavy skate stacking.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-[#2C3142]">
              <div>
                <span className="font-mono-tech font-extrabold text-[17px] text-[#090A0E] dark:text-white block">
                  ৳{denimItem.priceBDT.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono-tech text-[#64748B] dark:text-[#8E95A5]">
                  (${denimItem.priceUSD} USD)
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[#0047FF] dark:text-[#CCFF00] font-mono-tech text-[11px] font-extrabold uppercase group-hover:translate-x-1 transition-transform">
                <span>VIEW DENIM ARCHIVE</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* TILE 5: Junior Mini-Me Squad Drop (Col-span 4 on desktop) */}
          <div
            onClick={() => onSelectProduct(kidsItem)}
            className="md:col-span-4 bg-white dark:bg-[#13151D] border-2 border-black dark:border-[#2C3142] hover:border-[#CCFF00] transition-all p-6 relative overflow-hidden group cursor-pointer shadow-[5px_5px_0px_0px_#CCFF00] flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-[#CCFF00] text-black font-mono-tech text-[9.5px] font-extrabold uppercase">
                  TILE 05 // 2–15Y SQUAD
                </span>
                <span className="font-mono-tech text-[9.5px] font-bold text-[#64748B] dark:text-[#8E95A5]">
                  340 GSM FLEECE
                </span>
              </div>
              <h3 className="font-syne font-extrabold text-[20px] text-[#090A0E] dark:text-white uppercase leading-snug">
                {kidsItem.title}
              </h3>
              <p className="font-dm text-[12px] text-[#64748B] dark:text-[#8E95A5] mt-2 line-clamp-2">
                Downscaled industrial fleeces and distressed denim for young skaters.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-[#2C3142] mt-4">
              <span className="font-mono-tech font-extrabold text-[15px] text-[#090A0E] dark:text-white">
                ৳{kidsItem.priceBDT.toLocaleString()}
              </span>
              <span className="font-mono-tech text-[10.5px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase group-hover:translate-x-1 transition-transform">
                EXPLORE JUNIOR →
              </span>
            </div>
          </div>

          {/* TILE 6: Speed Logistics & Terminal Spec Readout Bar (Col-span 12) */}
          <div className="md:col-span-12 bg-black text-white p-4 sm:p-5 border-2 border-black dark:border-[#2C3142] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] shadow-[4px_4px_0px_0px_#0047FF]">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#CCFF00]" />
              <span className="font-bold text-slate-300">
                PORT TERMINAL STATUS: <span className="text-[#CCFF00]">OPERATIONAL</span> // METRO DISPATCH: <span className="text-white font-bold">24H SAME-DAY IN CHATTOGRAM</span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10.5px]">
              <span className="text-[#64748B]">COVERAGE: ALL 64 DISTRICTS</span>
              <span className="px-2 py-0.5 bg-[#0047FF] text-white font-bold uppercase">
                COURIER TRACED
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. STICKY TACTICAL PILL BAR WITH MONOSPACE METADATA & NEON ACCENTS
          ========================================================================= */}
      <section className="sticky top-16 z-20 w-full bg-[var(--color-canvas)]/95 backdrop-blur-md border-y-2 border-black dark:border-[#2C3142] py-3.5 px-4 sm:px-6 lg:px-12 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-0.5">
            {tacticalPills.map((pill) => {
              const isSelected = activeTab === pill.id
              return (
                <motion.button
                  key={pill.id}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => {
                    setActiveTab(pill.id)
                    onNavigateCategory(pill.id)
                  }}
                  className={`px-4 py-2 font-mono-tech text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-2 ${
                    isSelected
                      ? 'bg-[#CCFF00] text-black border-black shadow-[3px_3px_0px_0px_#0047FF]'
                      : 'bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white border-black/30 dark:border-[#2C3142] hover:border-[#0047FF] hover:text-[#0047FF] dark:hover:border-[#CCFF00] dark:hover:text-[#CCFF00]'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{pill.code}</span>
                  <span>[{pill.label}]</span>
                </motion.button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono-tech text-[#64748B] dark:text-[#8E95A5]">
            <span>FILTERED: {displayProducts.length} PIECES</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EXPANSIVE 4-TO-5 COLUMN PRODUCT MATRIX (ZERO DEAD GUTTERS)
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="mb-6 flex items-end justify-between border-b-2 border-black dark:border-[#2C3142] pb-3">
          <div>
            <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-widest">
              DEPLOYED HARDWARE & DENIM
            </span>
            <h3 className="font-syne font-extrabold text-[26px] sm:text-[32px] text-[#090A0E] dark:text-white uppercase">
              District Product Matrix
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCategory('All')}
            className="font-mono-tech text-[11px] font-bold text-[#090A0E] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors uppercase flex items-center gap-1 cursor-pointer"
          >
            <span>FULL 15-PIECE CATALOG →</span>
          </button>
        </div>

        {/* 5-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectProduct(product)}
              className="bg-white dark:bg-[#13151D] border-2 border-black dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all p-3 flex flex-col group cursor-pointer shadow-[3px_3px_0px_0px_#090A0E] dark:shadow-[3px_3px_0px_0px_#CCFF00]"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden border border-black/10 dark:border-white/10 mb-2.5">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#CCFF00] text-black font-mono-tech text-[8.5px] font-extrabold uppercase shadow-sm">
                    {product.badge}
                  </div>
                )}

                {/* GSM Spec Tag */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/85 text-white font-mono-tech text-[8.5px] font-bold uppercase backdrop-blur-sm">
                  {typeof product.gsm === 'number' ? `${product.gsm} GSM` : product.gsm}
                </div>

                {/* Stock Left */}
                {product.stockLeft <= 8 && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#FF2A4B] text-white font-mono-tech text-[8px] font-bold uppercase animate-pulse">
                    ONLY {product.stockLeft} LEFT
                  </div>
                )}
              </div>

              {/* Product Data */}
              <div className="pt-1 pb-1 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono-tech text-[8.5px] text-[#64748B] dark:text-[#8E95A5] uppercase font-bold block mb-1">
                    {product.category} // {product.fit}
                  </span>
                  <h4 className="font-syne font-bold text-[14px] sm:text-[15px] text-[#090A0E] dark:text-white group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors line-clamp-1 leading-snug">
                    {product.title}
                  </h4>
                  <p className="font-dm text-[11px] text-[#64748B] dark:text-[#8E95A5] line-clamp-1 mt-0.5">
                    {product.fabric}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tech font-extrabold text-[15px] text-[#090A0E] dark:text-white block">
                      ৳{product.priceBDT.toLocaleString()}
                    </span>
                    <span className="font-mono-tech text-[9.5px] text-[#64748B] dark:text-[#8E95A5]">
                      (${product.priceUSD})
                    </span>
                  </div>

                  {/* QUICK ADD Action Button */}
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onQuickAdd(product)
                    }}
                    className="px-3 py-1.5 bg-[#CCFF00] text-black font-mono-tech text-[9.5px] font-extrabold uppercase hover:bg-[#0047FF] hover:text-white transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                  >
                    + ADD
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. PORT CITY MANIFESTO FOOTER CARD
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pb-8">
        <div className="w-full bg-[#ECEEF2] dark:bg-[#13151D] border-2 border-black dark:border-[#2C3142] p-8 sm:p-14 flex flex-col items-center text-center relative overflow-hidden transition-colors shadow-[6px_6px_0px_0px_#0047FF]">
          <div className="w-16 h-1.5 bg-[#0047FF] dark:bg-[#CCFF00] mb-4" />
          <h3 className="font-syne font-extrabold text-[24px] sm:text-[34px] text-[#090A0E] dark:text-white uppercase tracking-tight max-w-2xl leading-snug mb-3">
            DISTRICT CHATTOGRAM: RAW PORT CITY TEXTILES FOR THE NATION
          </h3>
          <p className="font-dm text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#94A3B8] max-w-xl mb-6 leading-relaxed">
            Raw industrial textiles manufactured on home soil. Express dispatch to all 64 districts in 24–72 hours with real-time tracking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={onNavigateAbout}
              className="px-7 py-3.5 bg-black text-white dark:bg-white dark:text-black font-mono-tech text-[11px] font-extrabold uppercase hover:bg-[#0047FF] dark:hover:bg-[#CCFF00] transition-colors cursor-pointer shadow-[3px_3px_0px_0px_#0047FF]"
            >
              READ FULL NARRATIVE
            </button>
            <button
              type="button"
              onClick={() => onNavigateCategory('All')}
              className="px-7 py-3.5 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white font-mono-tech text-[11px] font-extrabold uppercase hover:border-[#0047FF] transition-colors cursor-pointer"
            >
              BROWSE ALL 15 DROPS
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
