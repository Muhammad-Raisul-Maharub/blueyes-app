import React from 'react'
import {
  Droplets,
  ShieldCheck,
  MapPin,
  ThermometerSnowflake,
  Layers,
  ArrowLeft,
} from 'lucide-react'

interface GlacierAboutProps {
  onExploreDrops: () => void
  onBack?: () => void
}

export const GlacierAbout: React.FC<GlacierAboutProps> = ({ onExploreDrops, onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10 pb-32">
      {/* Top Back Navigation */}
      {onBack && (
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[11px] font-space-mono text-slate-700 dark:text-sky-200 hover:text-[#0284C7] dark:hover:text-[#7DD3FC] px-3 py-1.5 rounded-md bg-white/60 dark:bg-white/5 border border-sky-200 dark:border-sky-400/20 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO PREVIOUS SCREEN</span>
          </button>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-950/80 border border-sky-400/30 text-[#7DD3FC] text-[11px] font-space-mono tracking-[0.2em] uppercase mb-4 glacier-glow">
          <ThermometerSnowflake className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>MAISON CHATTOGRAM • RESEARCH MANIFESTO</span>
        </div>

        <h1 className="font-syne font-extrabold text-[36px] sm:text-[54px] md:text-[64px] leading-[1.02] tracking-[-0.03em] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-6">
          Sub-Zero Engineering from the Coast of Bengal
        </h1>

        <p className="font-sans text-[16px] sm:text-[18px] text-slate-600 dark:text-slate-300 leading-relaxed text-center">
          Blu Eyes Glacier emerged from a bold counter-intuitive question: What happens when the world’s foremost textile craftspeople in Chattogram design apparel engineered to master extreme arctic cold?
        </p>
      </div>

      {/* 2. Hero Visual Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <div className="relative aspect-[16/10] overflow-hidden border border-sky-400/30 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85"
            alt="Maison Chattogram Cryo Testing"
            className="w-full h-full object-cover filter contrast-110 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/85 backdrop-blur-md border border-sky-400/20">
            <span className="font-space-mono text-[10px] text-[#7DD3FC] uppercase block">
              CHAMBER 06 • GEC CIRCLE HQ
            </span>
            <span className="font-syne font-bold text-white text-[14px]">
              Sub-Zero -25°C Aerodynamic Wind-Tunnel Testing
            </span>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden border border-sky-400/30 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
            alt="Hydro-Powered Looming Process"
            className="w-full h-full object-cover filter contrast-110 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/85 backdrop-blur-md border border-sky-400/20">
            <span className="font-space-mono text-[10px] text-[#7DD3FC] uppercase block">
              HYDRO-LOOM FACILITY NO. 1
            </span>
            <span className="font-syne font-bold text-white text-[14px]">
              Closed-Loop Hydroelectric Silk-Wool Weaving
            </span>
          </div>
        </div>
      </div>

      {/* 3. The Four Pillars of Glacier Couture */}
      <div className="mb-20">
        <div className="border-b border-sky-400/20 pb-4 mb-8">
          <span className="font-space-mono text-[11px] font-bold tracking-[0.2em] text-[#0284C7] dark:text-[#7DD3FC] uppercase">
            TECHNICAL ARCHITECTURE
          </span>
          <h2 className="font-syne font-extrabold text-[28px] sm:text-[36px] text-[#082F49] dark:text-[#F0F9FF] uppercase mt-1">
            The Four Cryo Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/25 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center mb-4 border border-sky-400/30">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="font-space-mono text-[10px] text-[#0284C7] dark:text-[#7DD3FC] font-bold uppercase block mb-1">
                PILLAR 01
              </span>
              <h3 className="font-syne font-bold text-[18px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-2">
                Hydro-Powered Looming
              </h3>
              <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                Every meter of tech-silk and alpine wool is loomed with 100% renewable hydroelectric power, eliminating carbon footprint while yielding high warp density.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/25 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center mb-4 border border-sky-400/30">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-space-mono text-[10px] text-[#0284C7] dark:text-[#7DD3FC] font-bold uppercase block mb-1">
                PILLAR 02
              </span>
              <h3 className="font-syne font-bold text-[18px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-2">
                Laser-Welded Seams
              </h3>
              <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                Ultrasonic fusion removes conventional sewing punctures. Zero thread bulk ensures zero thermal leakages and water-resistant structural permanence.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/25 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center mb-4 border border-sky-400/30">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <span className="font-space-mono text-[10px] text-[#0284C7] dark:text-[#7DD3FC] font-bold uppercase block mb-1">
                PILLAR 03
              </span>
              <h3 className="font-syne font-bold text-[18px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-2">
                Thermal Memory Crepe
              </h3>
              <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                Smart micro-polymers woven into natural fibers contract in cold air to increase insulation, expanding upon re-entering warm spaces for ventilation.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/25 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center mb-4 border border-sky-400/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-space-mono text-[10px] text-[#0284C7] dark:text-[#7DD3FC] font-bold uppercase block mb-1">
                PILLAR 04
              </span>
              <h3 className="font-syne font-bold text-[18px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-2">
                Net-0 Life Cycle
              </h3>
              <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                From organic pasture sourcing to closed-loop chemical baths and biodegradable swaddling wraps, every item meets strict environmental criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Atelier Flagship & Laboratory Details */}
      <div className="p-8 sm:p-12 bg-slate-950 border border-sky-400/30 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-space-mono text-[#7DD3FC] uppercase tracking-widest mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>FLAGSHIP LAB: GEC CIRCLE, CHATTOGRAM, BANGLADESH</span>
            </div>
            <h3 className="font-syne font-extrabold text-[28px] sm:text-[34px] uppercase mb-3">
              Maison Chattogram Atelier
            </h3>
            <p className="font-sans text-[14px] text-slate-300 leading-relaxed text-left">
              Clients are welcome to schedule private fitting consultations and laboratory walk-throughs by appointment. Experience our environmental chamber simulations and examine raw hydro-silk loom samples first-hand.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreDrops}
            className="px-8 py-4 bg-[#38BDF8] text-[#030712] font-space font-extrabold text-[12px] uppercase tracking-[0.18em] hover:bg-[#7DD3FC] transition-colors cursor-pointer shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            Explore Archival Pieces
          </button>
        </div>
      </div>
    </div>
  )
}
