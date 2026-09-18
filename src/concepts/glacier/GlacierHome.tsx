import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ShieldCheck,
  Droplets,
  Zap,
  Sparkles,
  ThermometerSnowflake,
  ChevronRight,
  Truck,
  Box,
} from 'lucide-react'
import type { GlacierProduct, GlacierCategory, Currency } from './types'
import { GLACIER_PRODUCTS } from './glacierData'

interface GlacierHomeProps {
  onSelectProduct: (product: GlacierProduct) => void
  onNavigateCategory: (category: GlacierCategory) => void
  onNavigateRunway: () => void
  onNavigateAbout: () => void
  onQuickAdd: (product: GlacierProduct) => void
  currency: Currency
}

export const GlacierHome: React.FC<GlacierHomeProps> = ({
  onSelectProduct,
  onNavigateCategory,
  onNavigateRunway,
  onNavigateAbout,
  onQuickAdd,
  currency,
}) => {
  // Format price helper
  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  // Gateway categories for the Curated Lineages
  const lineages = [
    {
      title: 'WOMEN',
      category: 'Women' as GlacierCategory,
      tagline: 'Sculptural Capes & Bias-Cut Crepe',
      spec: 'Sub-Zero Hydro Tech-Silk',
      image:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Archival Pieces',
    },
    {
      title: 'MEN',
      category: 'Men' as GlacierCategory,
      tagline: 'Ultrasonic Tailoring & Silk Loom',
      spec: 'Hydro-Powered Alpine Wool',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Archival Pieces',
    },
    {
      title: 'KIDS',
      category: 'Kids' as GlacierCategory,
      tagline: 'Active Junior Alpine Armour',
      spec: 'DWR Coated Thermal Barrier',
      image:
        'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Junior Silhouettes',
    },
    {
      title: 'BABY',
      category: 'Baby' as GlacierCategory,
      tagline: 'Pure Organic Merino & Snowsuits',
      spec: 'Pediatric Hypoallergenic TOG 3.8',
      image:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Cradle Essentials',
    },
    {
      title: 'OPTICAL & HARDWARE',
      category: 'Accessories' as GlacierCategory,
      tagline: 'Cylindrical Shields & Beta-Titanium',
      spec: 'Grade-5 Anodized Titanium',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Hardware Units',
    },
  ]

  // Trending optical tailoring selection (first 8 key garments)
  const trendingPieces = GLACIER_PRODUCTS.slice(0, 8)

  return (
    <div className="w-full flex flex-col relative z-10 transition-colors duration-300 pb-24">
      {/* ===================================================================
          1. HERO BANNER: "Aura of Cold Elegance"
          =================================================================== */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-sky-400/20">
        {/* Deep Arctic Background Image with Ambient Glacial Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
            alt="Blu Eyes Glacier Runway Editorial"
            className="w-full h-full object-cover object-top scale-105 filter contrast-110 brightness-[0.65] dark:brightness-[0.45]"
          />
          {/* Arctic radial vignetting & gradient light */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent dark:from-[#030712] dark:via-[#030712]/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/40 to-[#030712]/90" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
          {/* Limited Edition Archival Drop Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-sky-400/30 text-[#7DD3FC] text-[11px] font-space-mono tracking-[0.2em] uppercase mb-6 glacier-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] animate-spin" style={{ animationDuration: '8s' }} />
            <span>COLLECTION 06 • ARCTIC HAUTE COUTURE</span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-extrabold text-[38px] sm:text-[62px] md:text-[76px] lg:text-[90px] leading-[0.95] tracking-[-0.04em] text-[#F0F9FF] max-w-5xl mb-6 uppercase"
          >
            Aura of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#BAE6FD] glacier-glow-text">Cold Elegance</span>
          </motion.h1>

          {/* Sub-Zero Studio Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[15px] sm:text-[18px] text-slate-300 max-w-2xl leading-relaxed text-center mb-10"
          >
            Maison Chattogram’s sub-zero architectural fashion. Engineered with hydro-powered micro-filaments, cryogenic shape-memory textiles, and laser-fused monolithic silhouettes crafted to withstand extreme cold with effortless poise.
          </motion.p>

          {/* Limited Edition Metric Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-12"
          >
            <div className="bg-slate-950/70 backdrop-blur-xl border border-sky-400/25 p-3.5 flex flex-col items-center justify-center transition-all hover:border-sky-400/60 group">
              <span className="font-space-mono text-[16px] sm:text-[18px] font-bold text-[#7DD3FC] group-hover:glacier-glow-text">
                100% HYDRO
              </span>
              <span className="font-space text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">
                Hydro-Powered Looming
              </span>
            </div>

            <div className="bg-slate-950/70 backdrop-blur-xl border border-sky-400/25 p-3.5 flex flex-col items-center justify-center transition-all hover:border-sky-400/60 group">
              <span className="font-space-mono text-[16px] sm:text-[18px] font-bold text-[#38BDF8] group-hover:glacier-glow-text">
                NET-0 EMISSION
              </span>
              <span className="font-space text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">
                Closed-Loop Life Cycle
              </span>
            </div>

            <div className="bg-slate-950/70 backdrop-blur-xl border border-sky-400/25 p-3.5 flex flex-col items-center justify-center transition-all hover:border-sky-400/60 group">
              <span className="font-space-mono text-[16px] sm:text-[18px] font-bold text-[#BAE6FD] group-hover:glacier-glow-text">
                360 PCS ARCHIVAL
              </span>
              <span className="font-space text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">
                Worldwide Numbered Drop
              </span>
            </div>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => onNavigateCategory('Women')}
              className="w-full sm:w-auto px-8 py-4 bg-[#38BDF8] text-[#030712] font-space font-extrabold text-[13px] tracking-[0.18em] uppercase hover:bg-[#7DD3FC] transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2"
            >
              <span>Explore Archival Drop</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNavigateRunway}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 backdrop-blur-xl border border-sky-400/30 text-[#F0F9FF] font-space font-bold text-[13px] tracking-[0.18em] uppercase hover:border-sky-300 hover:text-[#7DD3FC] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Sub-Zero Lookbook</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          2. CURATED LINEAGES GATEWAYS (Women, Men, Kids, Baby, Optical)
          =================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-sky-400/20 pb-6">
          <div>
            <span className="font-space-mono text-[11px] font-bold tracking-[0.25em] text-[#0284C7] dark:text-[#7DD3FC] uppercase block mb-1">
              ARCHITECTURAL GENEALOGY
            </span>
            <h2 className="font-syne font-extrabold text-[32px] sm:text-[42px] tracking-[-0.03em] text-[#082F49] dark:text-[#F0F9FF] uppercase">
              Curated Lineages
            </h2>
          </div>
          <p className="font-sans text-[14px] text-slate-500 dark:text-slate-400 max-w-md text-left">
            Explore cold-climate tailoring partitioned across demographic lineages, engineered from hydro-loomed fibers.
          </p>
        </div>

        {/* 5-Column Responsive Gateway Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {lineages.map((lineage, idx) => (
            <motion.div
              key={lineage.title}
              whileHover={{ y: -5 }}
              onClick={() => onNavigateCategory(lineage.category)}
              className="group relative cursor-pointer overflow-hidden rounded-none bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-400/20 hover:border-[#38BDF8] transition-all duration-300 flex flex-col h-[380px] sm:h-[420px] shadow-sm hover:shadow-[0_0_25px_rgba(125,211,252,0.22)]"
            >
              {/* Background Image with Cold Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={lineage.image}
                  alt={lineage.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105 brightness-[0.7] dark:brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
              </div>

              {/* Card Header Top */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white/80">
                <span className="font-space-mono text-[10px] tracking-widest text-[#7DD3FC]">
                  0{idx + 1}
                </span>
                <span className="font-space-mono text-[9px] uppercase px-2 py-0.5 bg-black/50 border border-sky-400/30 text-sky-200">
                  {lineage.piecesCount}
                </span>
              </div>

              {/* Card Bottom Meta */}
              <div className="relative z-10 mt-auto p-5 flex flex-col">
                <span className="font-space-mono text-[10px] tracking-[0.18em] text-[#38BDF8] uppercase mb-1 font-semibold">
                  {lineage.spec}
                </span>
                <h3 className="font-syne font-extrabold text-[22px] sm:text-[24px] text-white uppercase tracking-tight mb-1 group-hover:text-[#7DD3FC] transition-colors">
                  {lineage.title}
                </h3>
                <p className="font-sans text-[12px] text-slate-300 line-clamp-2 mb-3 text-left">
                  {lineage.tagline}
                </p>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-space font-bold uppercase tracking-wider text-[#7DD3FC] group-hover:translate-x-1 transition-transform">
                  <span>Enter Lineage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          3. TRENDING OPTICAL TAILORING GRID (4-Column Responsive)
          =================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-sky-400/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <ThermometerSnowflake className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
              <span className="font-space-mono text-[11px] font-bold tracking-[0.25em] text-[#0284C7] dark:text-[#7DD3FC] uppercase">
                SCARCITY ALLOCATION
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-[32px] sm:text-[42px] tracking-[-0.03em] text-[#082F49] dark:text-[#F0F9FF] uppercase">
              Trending Optical Tailoring
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-space-mono text-[11px] text-slate-400">
              SHOWING 8 OF 15 ARCHIVAL UNITS
            </span>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPieces.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-sky-200 dark:border-sky-400/20 hover:border-[#38BDF8] transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(125,211,252,0.18)]"
            >
              {/* Product Image Stage */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative w-full aspect-[4/5] overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />

                {/* Scarcity Tag ("Archive 04/50") */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-[#7DD3FC] text-[10px] font-space-mono font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                    {product.stockScarcity}
                  </span>
                </div>

                {/* Badge Tag if any */}
                {product.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#030712] text-[9px] font-space-mono font-extrabold tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Hover overlay with thermal metric spec */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="font-space-mono text-[10px] text-[#7DD3FC] font-bold">
                    SPEC: {product.spec}
                  </span>
                  <span className="font-space-mono text-[9px] text-slate-300">
                    THERMAL: {product.thermalRating}
                  </span>
                </div>
              </div>

              {/* Product Information Body */}
              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-space-mono text-[10px] uppercase font-bold text-[#0284C7] dark:text-[#7DD3FC]">
                      {product.category}
                    </span>
                    <span className="font-space-mono text-[10px] text-slate-400">
                      {product.thermalGsm} GSM
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-syne font-extrabold text-[16px] sm:text-[17px] text-[#082F49] dark:text-[#F0F9FF] leading-snug cursor-pointer group-hover:text-[#0284C7] dark:group-hover:text-[#7DD3FC] transition-colors line-clamp-1 mb-1.5"
                  >
                    {product.title}
                  </h3>

                  <p className="font-sans text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 text-left mb-3">
                    {product.description}
                  </p>
                </div>

                {/* Price & Quick Acquire Action */}
                <div className="pt-3 border-t border-sky-100 dark:border-sky-400/15 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-space-mono font-bold text-[16px] text-[#082F49] dark:text-[#F0F9FF]">
                      {formatPrice(product.priceBDT, product.priceUSD)}
                    </span>
                    <span className="text-[9px] font-space-mono text-slate-400">
                      {currency === 'BDT' ? `$${product.priceUSD} USD` : `৳${product.priceBDT.toLocaleString()} BDT`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className="px-3.5 py-2 bg-[#0284C7] dark:bg-sky-500/20 hover:bg-sky-700 dark:hover:bg-[#38BDF8] text-white dark:text-[#7DD3FC] dark:hover:text-[#030712] border border-sky-400/30 font-space font-bold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Acquire Piece
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigateCategory('All')}
            className="px-8 py-3.5 bg-transparent border-2 border-[#0284C7] dark:border-[#38BDF8] text-[#0284C7] dark:text-[#7DD3FC] font-space font-extrabold text-[12px] uppercase tracking-[0.2em] hover:bg-[#0284C7] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-[#030712] transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            Explore Complete 15-Piece Sub-Zero Archive
          </button>
        </div>
      </section>

      {/* ===================================================================
          4. SUB-ZERO CRYOGENIC TEXTILE ENGINEERING FEATURETTE
          =================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xl border border-sky-400/25 p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-950 border border-sky-400/40 text-[#7DD3FC] text-[10px] font-space-mono uppercase tracking-widest mb-4">
                <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>HYDRO-POWERED TEXTILE RESEARCH</span>
              </div>
              <h2 className="font-syne font-extrabold text-[30px] sm:text-[40px] text-[#F0F9FF] leading-tight uppercase mb-4">
                Cryogenic Precision from the Coast of Bengal
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-slate-300 leading-relaxed text-left mb-6">
                Born out of Maison Chattogram’s climate research laboratory at GEC Circle, Blu Eyes Glacier reinvents haute couture for extreme environments. By combining centuries-old Bengal handloom techniques with ultrasonic bonding and hydro-insulated fill, we construct garments that thrive in sub-zero alpine conditions while retaining fluid sculptural drape.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="border-l-2 border-[#38BDF8] pl-3">
                  <span className="font-space-mono text-[11px] font-bold text-[#7DD3FC] block">
                    HYDRO-POWERED WEAVE
                  </span>
                  <span className="text-[12px] text-slate-400">
                    Loomed exclusively using closed-loop zero-emission hydroelectric turbine power.
                  </span>
                </div>
                <div className="border-l-2 border-[#38BDF8] pl-3">
                  <span className="font-space-mono text-[11px] font-bold text-[#7DD3FC] block">
                    THERMAL MEMORY CREPE
                  </span>
                  <span className="text-[12px] text-slate-400">
                    Smart micro-polymers that adjust weave tension in response to ambient temperatures.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateAbout}
                className="px-6 py-3 bg-[#38BDF8] text-[#030712] font-space font-bold text-[12px] tracking-[0.16em] uppercase hover:bg-[#7DD3FC] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Read Maison Manifesto</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Split Visual Spec Panel */}
            <div className="relative aspect-[4/3] overflow-hidden border border-sky-400/30">
              <img
                src="https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=85"
                alt="Cryogenic textile testing"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 backdrop-blur-md border border-sky-400/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-space-mono text-[#7DD3FC] block">
                    CHATTOGRAM CRYO-LAB NO. 6
                  </span>
                  <span className="text-[12px] font-syne font-bold text-white">
                    Temperature Chamber Testing (-25°C Validated)
                  </span>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. NATIONWIDE 64 DISTRICTS & GLOBAL LOGISTICS DOCK
          =================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-sky-200 dark:border-sky-400/20 flex items-start gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] border border-sky-300 dark:border-sky-400/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-1">
                64 Districts Express
              </h4>
              <p className="font-sans text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                Secure insured courier to all 64 districts in Bangladesh with 24h same-day dispatch from Chattogram HQ.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-sky-200 dark:border-sky-400/20 flex items-start gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] border border-sky-300 dark:border-sky-400/30">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-1">
                Frosted Keepsake Box
              </h4>
              <p className="font-sans text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                All archival drops packaged in collector-grade frosted acrylic keepsake enclosures with thermal seal.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-sky-200 dark:border-sky-400/20 flex items-start gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] border border-sky-300 dark:border-sky-400/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-1">
                bKash & Global Card
              </h4>
              <p className="font-sans text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                Instant digital settlement via bKash Direct, Cash on Delivery nationwide, or worldwide Visa/Mastercard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
