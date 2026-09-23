import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Zap,
  Sparkles,
  ThermometerSnowflake,
  ChevronRight,
  Truck,
  Box,
  Radio,
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
  onNavigateAbout: _onNavigateAbout,
  onQuickAdd,
  currency,
}) => {
  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  // Gateway categories for the Curated Lineages
  const lineages = [
    {
      title: 'WOMEN',
      category: 'Women' as GlacierCategory,
      tagline: 'Sculptural Capes & Bias-Cut Crepe',
      spec: '100% Hydro-Filament Silk',
      image:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Archival Pieces',
      thermal: '-15°C Validated',
    },
    {
      title: 'MEN',
      category: 'Men' as GlacierCategory,
      tagline: 'Ultrasonic Tailoring & Silk Loom',
      spec: 'Hydro-Powered Alpine Wool',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Archival Pieces',
      thermal: '-20°C Validated',
    },
    {
      title: 'KIDS',
      category: 'Kids' as GlacierCategory,
      tagline: 'Active Junior Alpine Armour',
      spec: 'DWR Coated Thermal Barrier',
      image:
        'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Junior Silhouettes',
      thermal: '-10°C Validated',
    },
    {
      title: 'BABY',
      category: 'Baby' as GlacierCategory,
      tagline: 'Pure Organic Merino & Snowsuits',
      spec: 'Pediatric TOG 3.8 Barrier',
      image:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Cradle Essentials',
      thermal: 'Hypoallergenic',
    },
    {
      title: 'HARDWARE',
      category: 'Accessories' as GlacierCategory,
      tagline: 'Cylindrical Shields & Beta-Titanium',
      spec: 'Grade-5 Anodized Titanium',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      piecesCount: '3 Hardware Units',
      thermal: 'Cryo-Forged',
    },
  ]

  // Trending optical tailoring selection (10 key garments for 5-col display)
  const trendingPieces = GLACIER_PRODUCTS.slice(0, 10)

  return (
    <div className="w-full flex flex-col relative z-10 transition-colors duration-300 pb-28 text-[#082F49] dark:text-[#F0F9FF]">
      {/* =========================================================================
          1. FUTURISTIC MONOLITHIC HUD HERO CARD
          Holographic cyan borders, glassmorphic metric pills, frosted blur & particle canvas
          ========================================================================= */}
      <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-sky-400/25 py-12 sm:py-16">
        {/* Deep Arctic Background Image with Ambient Glacial Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
            alt="Blu Eyes Glacier Monolithic Hero"
            className="w-full h-full object-cover object-top scale-105 filter contrast-125 brightness-[0.55] dark:brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/40 to-[#030712]/95" />
        </div>

        {/* Monolithic Glassmorphic HUD Hero Card */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center">
          <div className="w-full max-w-4xl p-8 sm:p-12 lg:p-14 rounded-none bg-[rgba(15,23,42,0.65)] backdrop-blur-2xl border-2 border-sky-400/30 hover:border-[#7DD3FC] transition-all duration-500 shadow-[0_0_45px_rgba(56,189,248,0.2)] glacier-glow">
            {/* HUD Status Header Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/40 text-[#7DD3FC] text-[10.5px] font-space-mono tracking-[0.22em] uppercase mb-6 shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
              <span>CRYOGENIC LAB NO. 6 // CHATTOGRAM PORT // HUD ONLINE</span>
            </motion.div>

            {/* Monumental Holographic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-syne font-extrabold text-[36px] sm:text-[58px] lg:text-[72px] leading-[0.98] tracking-[-0.04em] text-white uppercase mb-5"
            >
              Aura of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#BAE6FD] glacier-glow-text">Cold Elegance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-[14px] sm:text-[16px] text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Sub-zero architectural fashion loomed from hydro-powered micro-filaments, shape-memory textiles, and laser-fused monolithic silhouettes crafted for extreme poise.
            </motion.p>

            {/* Glassmorphic Metric Pills */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8 font-space-mono"
            >
              <div className="bg-slate-950/80 backdrop-blur-xl border border-sky-400/30 p-3.5 flex flex-col items-center hover:border-sky-300 transition-colors">
                <span className="text-[17px] sm:text-[19px] font-bold text-[#7DD3FC] glacier-glow-text">
                  100% HYDRO
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Hydro-Filament Loom
                </span>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-xl border border-sky-400/30 p-3.5 flex flex-col items-center hover:border-sky-300 transition-colors">
                <span className="text-[17px] sm:text-[19px] font-bold text-[#38BDF8] glacier-glow-text">
                  NET-0 EMISSION
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Closed-Loop Lifecycle
                </span>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-xl border border-sky-400/30 p-3.5 flex flex-col items-center hover:border-sky-300 transition-colors">
                <span className="text-[17px] sm:text-[19px] font-bold text-[#BAE6FD] glacier-glow-text">
                  360 PCS DROP
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Worldwide Numbered
                </span>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => onNavigateCategory('Women')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#38BDF8] text-[#030712] font-space font-extrabold text-[12px] tracking-[0.2em] uppercase hover:bg-[#7DD3FC] transition-all cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2"
              >
                <span>Explore Archival Drop</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateRunway}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-950/80 backdrop-blur-xl border border-sky-400/40 text-[#F0F9FF] font-space font-bold text-[12px] tracking-[0.2em] uppercase hover:border-sky-300 hover:text-[#7DD3FC] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sub-Zero Lookbook</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SCI-FI "LINEAGES" CARDS WITH GLOWING BORDERS ON HOVER
          Monolithic glassmorphic cards (rgba(15, 23, 42, 0.6) with backdrop-blur-xl)
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-sky-400/25 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[#0284C7] dark:text-[#7DD3FC] mb-1">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-space-mono text-[11px] font-bold tracking-[0.25em] uppercase">
                SCIENTIFIC CLASSIFICATION
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-[28px] sm:text-[38px] tracking-tight uppercase text-white">
              Curated Lineages
            </h2>
          </div>
          <p className="font-sans text-[13px] sm:text-[14px] text-slate-400 max-w-md text-left">
            Cold-climate architectural garments partitioned across demographic lineages, engineered from hydro-loomed fibers.
          </p>
        </div>

        {/* 5-Column Responsive Gateway Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {lineages.map((lineage, idx) => (
            <motion.div
              key={lineage.title}
              whileHover={{ y: -6 }}
              onClick={() => onNavigateCategory(lineage.category)}
              className="group relative cursor-pointer overflow-hidden bg-[rgba(15,23,42,0.65)] backdrop-blur-xl border border-sky-400/25 hover:border-[#7DD3FC] transition-all duration-300 flex flex-col h-[380px] sm:h-[420px] shadow-sm hover:shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:glacier-glow"
            >
              {/* Background Image with Cold Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={lineage.image}
                  alt={lineage.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110 brightness-[0.6] group-hover:brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
              </div>

              {/* Card Header Top */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white/80">
                <span className="font-space-mono text-[11px] tracking-widest text-[#7DD3FC] font-bold">
                  0{idx + 1} // HUD
                </span>
                <span className="font-space-mono text-[9px] uppercase px-2 py-0.5 bg-black/60 border border-sky-400/30 text-sky-200">
                  {lineage.thermal}
                </span>
              </div>

              {/* Card Bottom Meta */}
              <div className="relative z-10 mt-auto p-5 flex flex-col">
                <span className="font-space-mono text-[10px] tracking-[0.2em] text-[#38BDF8] uppercase mb-1 font-semibold">
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

      {/* =========================================================================
          3. EXPANSIVE 4-TO-5 COLUMN MONOLITHIC PRODUCT MATRIX
          Monolithic glassmorphic cards (rgba(15, 23, 42, 0.6) with backdrop-blur-xl) & cyan glow
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-sky-400/25 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <ThermometerSnowflake className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-space-mono text-[11px] font-bold tracking-[0.25em] text-[#7DD3FC] uppercase">
                SCARCITY ALLOCATION MATRIX
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-[28px] sm:text-[38px] tracking-tight text-white uppercase">
              Trending Optical Tailoring
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-space-mono text-[11px] text-slate-400">
              SHOWING 10 OF 15 ARCHIVAL UNITS
            </span>
          </div>
        </div>

        {/* 5-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {trendingPieces.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col bg-[rgba(15,23,42,0.65)] backdrop-blur-xl border border-sky-400/25 hover:border-[#7DD3FC] transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(125,211,252,0.25)] hover:glacier-glow"
            >
              {/* Product Image Stage with 4:5 Aspect Ratio */}
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

                {/* Scarcity Tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-[#7DD3FC] text-[9.5px] font-space-mono font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                    {product.stockScarcity}
                  </span>
                </div>

                {/* Badge Tag */}
                {product.badge && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 bg-[#38BDF8] text-[#030712] text-[8.5px] font-space-mono font-extrabold tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Hover overlay with thermal metric spec */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="font-space-mono text-[9.5px] text-[#7DD3FC] font-bold">
                    SPEC: {product.spec}
                  </span>
                  <span className="font-space-mono text-[8.5px] text-slate-300">
                    THERMAL: {product.thermalRating}
                  </span>
                </div>
              </div>

              {/* Product Information Body */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 font-space-mono text-[9.5px]">
                    <span className="uppercase font-bold text-[#7DD3FC]">
                      {product.category}
                    </span>
                    <span className="text-slate-400">
                      {product.thermalGsm} GSM
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-syne font-extrabold text-[15px] sm:text-[16px] text-white leading-snug cursor-pointer group-hover:text-[#7DD3FC] transition-colors line-clamp-1 mb-1"
                  >
                    {product.title}
                  </h3>

                  <p className="font-sans text-[11px] text-slate-400 line-clamp-2 text-left mb-3">
                    {product.description}
                  </p>
                </div>

                {/* Price & Quick Acquire Action */}
                <div className="pt-2.5 border-t border-sky-400/20 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-space-mono font-bold text-[15px] text-white">
                      {formatPrice(product.priceBDT, product.priceUSD)}
                    </span>
                    <span className="text-[9px] font-space-mono text-slate-400">
                      {currency === 'BDT' ? `$${product.priceUSD} USD` : `৳${product.priceBDT.toLocaleString()} BDT`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className="px-3 py-1.5 bg-sky-500/20 hover:bg-[#38BDF8] text-[#7DD3FC] hover:text-[#030712] border border-sky-400/40 font-space font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs min-h-[36px]"
                  >
                    Acquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigateCategory('All')}
            className="px-8 py-3.5 bg-transparent border-2 border-[#38BDF8] text-[#7DD3FC] font-space font-extrabold text-[12px] uppercase tracking-[0.2em] hover:bg-[#38BDF8] hover:text-[#030712] transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.25)]"
          >
            Explore Complete 15-Piece Sub-Zero Archive
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. SUB-ZERO CRYOGENIC RESEARCH MANIFESTO DOCK
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[rgba(15,23,42,0.65)] backdrop-blur-xl border border-sky-400/25 flex items-start gap-4 text-left">
            <div className="p-3 bg-sky-950 text-[#38BDF8] border border-sky-400/30 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-white uppercase mb-1">
                64 Districts Express
              </h4>
              <p className="font-sans text-[12px] text-slate-400 leading-relaxed">
                Insured courier transit to all 64 districts in Bangladesh with 24h same-day dispatch from Chattogram Cryo-HQ.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[rgba(15,23,42,0.65)] backdrop-blur-xl border border-sky-400/25 flex items-start gap-4 text-left">
            <div className="p-3 bg-sky-950 text-[#38BDF8] border border-sky-400/30 flex-shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-white uppercase mb-1">
                Frosted Keepsake Box
              </h4>
              <p className="font-sans text-[12px] text-slate-400 leading-relaxed">
                All archival drops packaged in collector-grade frosted acrylic keepsake enclosures with hermetic thermal seal.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[rgba(15,23,42,0.65)] backdrop-blur-xl border border-sky-400/25 flex items-start gap-4 text-left">
            <div className="p-3 bg-sky-950 text-[#38BDF8] border border-sky-400/30 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[14px] text-white uppercase mb-1">
                bKash & Global Settlement
              </h4>
              <p className="font-sans text-[12px] text-slate-400 leading-relaxed">
                Instant digital settlement via bKash Direct, Cash on Delivery nationwide, or worldwide Visa/Mastercard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
