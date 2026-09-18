import React from 'react'
import { ArrowUpRight, Camera } from 'lucide-react'
import type { GlacierProduct, GlacierCategory } from './types'
import { GLACIER_PRODUCTS } from './glacierData'

interface GlacierLookbookProps {
  onSelectProduct: (product: GlacierProduct) => void
  onNavigateCategory?: (category: GlacierCategory) => void
}

export const GlacierLookbook: React.FC<GlacierLookbookProps> = ({
  onSelectProduct,
  onNavigateCategory,
}) => {
  const editorialLooks = [
    {
      lookId: 'LOOK 01',
      title: 'Sub-Zero Solitude',
      location: 'Chattogram Wind Tunnel Chamber No. 6',
      ambientTemp: '-18°C Cryo Validated',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: GLACIER_PRODUCTS[0], // Sculptural Cape Gown
      accompanyingProduct: GLACIER_PRODUCTS[12], // Polarized Optical Shield
      notes:
        'Floor-sweeping tech-silk cape caught in laminar sub-zero air currents. Mirrored optical shield reflects ambient luminescent cyan chamber lighting.',
    },
    {
      lookId: 'LOOK 02',
      title: 'Monolithic Alpine Transit',
      location: 'Sub-Zero Highland Field Test',
      ambientTemp: '-12°C Alpine Gale',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: GLACIER_PRODUCTS[3], // Tech-Wool Overcoat
      accompanyingProduct: GLACIER_PRODUCTS[13], // Titanium Carabiner Bangle
      notes:
        'Architectural single-breasted overcoat cut with razor-sharp shoulders from hydro-loomed alpine wool. Titanium carabiner bangle locks at the wrist.',
    },
    {
      lookId: 'LOOK 03',
      title: 'Thermodynamic Memory',
      location: 'Cryogenic Studio Studio A',
      ambientTemp: '+4°C to -15°C Transition',
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: GLACIER_PRODUCTS[1], // Bias-Cut Slit Dress
      accompanyingProduct: null,
      notes:
        'Liquid drape on a 45-degree bias. Shape-memory micro alloys automatically stiffen against icy drafts to maintain sculpted form.',
    },
    {
      lookId: 'LOOK 04',
      title: 'Architectural Cocooning',
      location: 'Arctic Ridge Expedition',
      ambientTemp: '-25°C Gale Force 8',
      image:
        'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: GLACIER_PRODUCTS[2], // Cocoon Down Coat
      accompanyingProduct: GLACIER_PRODUCTS[14], // Bonded Sling Bag
      notes:
        '800-fill hydrophobic baffle construction with sonic welded seams eliminating cold bridges. RF-welded sling bag carries frozen essentials securely.',
    },
    {
      lookId: 'LOOK 05',
      title: 'Bengal Moonlight Sheen',
      location: 'Karnafuli Hydroelectric River Basin',
      ambientTemp: '+8°C Riverfront Mist',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: GLACIER_PRODUCTS[4], // Silk-Loom Panjabi
      accompanyingProduct: null,
      notes:
        'Heritage Bengal panjabi re-imagined with micro-metallic sheen thread and magnetic placket closures. Subtle shimmer evokes moonlight on frozen coastal estuaries.',
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 pb-32">
      {/* 1. Lookbook Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-400/20 pb-8 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-space-mono text-[#0284C7] dark:text-[#7DD3FC] uppercase tracking-[0.2em] mb-2">
            <Camera className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>EDITORIAL RUNWAY ARCHIVE</span>
          </div>
          <h1 className="font-syne font-extrabold text-[36px] sm:text-[50px] text-[#082F49] dark:text-[#F0F9FF] tracking-tight uppercase leading-none">
            Sub-Zero Lookbook
          </h1>
        </div>
        <p className="font-sans text-[14px] text-slate-500 dark:text-slate-400 max-w-md text-left">
          Visual documentation of Collection 06 captured under extreme thermal lighting across Maison Chattogram’s laboratory chambers and alpine field tests.
        </p>
      </div>

      {/* 2. Editorial Looks Stack */}
      <div className="space-y-20">
        {editorialLooks.map((look, index) => (
          <div
            key={look.lookId}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Frame */}
            <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative aspect-[4/5] sm:aspect-[16/11] bg-slate-950 overflow-hidden border border-sky-400/30 group shadow-xl">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />

                {/* Badges on Look */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-[#7DD3FC] text-[10px] font-space-mono font-bold uppercase">
                    {look.lookId}
                  </span>
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-sky-200 text-[10px] font-space-mono uppercase">
                    {look.ambientTemp}
                  </span>
                </div>
              </div>
            </div>

            {/* Look Metadata & Products */}
            <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="p-6 sm:p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200 dark:border-sky-400/20">
                <span className="text-[10px] font-space-mono text-[#0284C7] dark:text-[#7DD3FC] tracking-widest uppercase block mb-1">
                  LOCATION: {look.location}
                </span>

                <h2 className="font-syne font-extrabold text-[26px] sm:text-[32px] text-[#082F49] dark:text-[#F0F9FF] uppercase mb-4">
                  {look.title}
                </h2>

                <p className="font-sans text-[13px] sm:text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed text-left mb-6">
                  {look.notes}
                </p>

                {/* Garment Anchor Cards */}
                <div className="space-y-3 pt-4 border-t border-sky-200 dark:border-sky-400/20">
                  <span className="font-space-mono text-[10px] font-bold text-slate-400 uppercase block">
                    FEATURED RUNWAY PIECES:
                  </span>

                  {/* Primary Product */}
                  <div
                    onClick={() => onSelectProduct(look.featuredProduct)}
                    className="p-3 bg-sky-50 dark:bg-slate-950 border border-sky-300 dark:border-sky-400/30 hover:border-sky-400 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={look.featuredProduct.images[0]}
                        alt={look.featuredProduct.title}
                        className="w-12 h-14 object-cover border border-sky-400/30 shrink-0"
                      />
                      <div>
                        <span className="font-syne font-bold text-[13px] text-[#082F49] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#7DD3FC] transition-colors block line-clamp-1">
                          {look.featuredProduct.title}
                        </span>
                        <span className="font-space-mono text-[10px] text-slate-500 dark:text-slate-400 block">
                          {look.featuredProduct.spec}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Accompanying Product if available */}
                  {look.accompanyingProduct && (
                    <div
                      onClick={() => onSelectProduct(look.accompanyingProduct)}
                      className="p-3 bg-sky-50 dark:bg-slate-950 border border-sky-300 dark:border-sky-400/30 hover:border-sky-400 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={look.accompanyingProduct.images[0]}
                          alt={look.accompanyingProduct.title}
                          className="w-12 h-14 object-cover border border-sky-400/30 shrink-0"
                        />
                        <div>
                          <span className="font-syne font-bold text-[13px] text-[#082F49] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#7DD3FC] transition-colors block line-clamp-1">
                            {look.accompanyingProduct.title}
                          </span>
                          <span className="font-space-mono text-[10px] text-slate-500 dark:text-slate-400 block">
                            {look.accompanyingProduct.spec}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {onNavigateCategory && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => onNavigateCategory('Women')}
            className="px-8 py-3.5 bg-[#38BDF8] text-[#030712] font-space font-extrabold text-[12px] uppercase tracking-[0.2em] hover:bg-[#7DD3FC] transition-colors cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            Explore Complete Runway Catalog
          </button>
        </div>
      )}
    </div>
  )
}
