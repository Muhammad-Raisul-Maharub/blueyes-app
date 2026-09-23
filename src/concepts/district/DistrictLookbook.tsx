import React from 'react'
import type { DistrictProduct, DistrictCategory } from './types'
import { DISTRICT_PRODUCTS } from './districtData'
import { Flame, Eye, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react'

interface DistrictLookbookProps {
  onSelectProduct: (product: DistrictProduct) => void
  onNavigateCategory: (category: DistrictCategory) => void
  onBack?: () => void
}

interface LookItem {
  id: string
  title: string
  subtitle: string
  location: string
  modelSpecs: string
  heroImage: string
  featuredProducts: DistrictProduct[]
  tags: string[]
}

export const DistrictLookbook: React.FC<DistrictLookbookProps> = ({
  onSelectProduct,
  onNavigateCategory,
  onBack,
}) => {
  // Curate looks from DISTRICT_PRODUCTS
  const looks: LookItem[] = [
    {
      id: 'look-01',
      title: 'LOOK 01 // PORT TERMINAL RECON',
      subtitle: 'Heavyweight insulation against the monsoon gale winds off the Bay of Bengal.',
      location: 'CPA Container Yard 04, Port of Chattogram',
      modelSpecs: "Model: 6'1\" (185cm) / Wearing Size L / 480 GSM Fleece",
      heroImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
      featuredProducts: [
        DISTRICT_PRODUCTS[3], // Exo-Skeleton Hoodie 480 GSM
        DISTRICT_PRODUCTS[4], // Acid-Wash Cargo
        DISTRICT_PRODUCTS[12], // Cordura Crossbody Bag
      ],
      tags: ['480 GSM', 'Acid Wash', 'Cordura 1000D'],
    },
    {
      id: 'look-02',
      title: 'LOOK 02 // CYBER ASYMMETRIC',
      subtitle: 'High-visibility technical fleece cut with brutalist angular geometry.',
      location: 'Agrabad Commercial District Overpass, Chattogram',
      modelSpecs: "Model: 5'8\" (173cm) / Wearing Size S / Modular Tech Fleece",
      heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      featuredProducts: [
        DISTRICT_PRODUCTS[0], // Cropped Tech-Fleece
        DISTRICT_PRODUCTS[1], // Wide-Leg Utility Denim
        DISTRICT_PRODUCTS[14], // Chunky Carabiner Chain
      ],
      tags: ['Tech Fleece', '13.5oz Denim', 'Cobalt Hardware'],
    },
    {
      id: 'look-03',
      title: 'LOOK 03 // JUNIOR MINI-ME PROTOCOL',
      subtitle: 'Streetwear scaled for next-generation youth skaters and street culture pioneers.',
      location: 'GEC Circle Skate Spot, Chattogram',
      modelSpecs: 'Model: Age 9 / Wearing Size 8-10Y / Boxy 340 GSM French Terry',
      heroImage: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=80',
      featuredProducts: [
        DISTRICT_PRODUCTS[6], // Junior Mini-Me Boxy Set
        DISTRICT_PRODUCTS[7], // Skater Distressed Denim
        DISTRICT_PRODUCTS[13], // Reversible Bucket Hat
      ],
      tags: ['Junior Boxy', 'Distressed Denim', 'Volt Accent'],
    },
    {
      id: 'look-04',
      title: 'LOOK 04 // INDUSTRIAL MONOCHROME',
      subtitle: 'High-density 280 GSM combed cotton layered with utilitarian cordura accessories.',
      location: 'Karnafuly Shipyard Drydock, Chattogram',
      modelSpecs: "Model: 6'0\" (183cm) / Wearing Size XL / Drop Shoulder Fit",
      heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      featuredProducts: [
        DISTRICT_PRODUCTS[5], // Cyber Matrix Oversized Tee
        DISTRICT_PRODUCTS[2], // Modular Asymmetric Street Tank
        DISTRICT_PRODUCTS[12], // Cordura Tactical Crossbody
      ],
      tags: ['280 GSM', 'Screenprint Archive', 'Waterproof Cordura'],
    },
  ]

  return (
    <div className="w-full min-h-screen bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white pb-28 animate-fadeIn transition-colors duration-200">
      {/* Top Back Navigation Bar */}
      {onBack && (
        <div className="w-full bg-white dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider text-[#64748B] dark:text-[#8E95A5] hover:text-[#0047FF] dark:hover:text-[#CCFF00] px-3 py-1.5 rounded bg-[#F4F4F6] dark:bg-[#1E2230] border border-[#E2E8F0] dark:border-[#2C3142] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO PREVIOUS SCREEN</span>
            </button>
            <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5] uppercase tracking-widest hidden sm:inline-block">
              CAMPAIGN ARCHIVE // RUNWAY
            </span>
          </div>
        </div>
      )}

      {/* 1. Header Banner */}
      <section className="w-full bg-white dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[10px] font-extrabold uppercase tracking-widest mb-4 inline-flex shadow-[2px_2px_0px_0px_#0047FF]">
              <Flame className="w-3.5 h-3.5 fill-[#090A0E]" />
              <span>EDITORIAL CAMPAIGN 02 // ARCHIVE SERIES</span>
            </div>
            <h1 className="font-syne font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] uppercase tracking-tight leading-none text-[#090A0E] dark:text-white">
              DISTRICT <span className="text-[#0047FF]">RUNWAY</span>
            </h1>
            <p className="font-dm text-[14px] sm:text-[16px] text-[#64748B] dark:text-[#94A3B8] max-w-xl mt-3 leading-relaxed">
              Industrial textiles captured across the drydocks, cargo yards, and neon flyovers of Chattogram. Click any tagged item to view technical specs and add to bag.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateCategory('Men')}
              className="px-4 py-2.5 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] text-[#090A0E] dark:text-white font-mono-tech text-[11px] font-bold uppercase transition-all cursor-pointer"
            >
              MEN ARCHIVE
            </button>
            <button
              type="button"
              onClick={() => onNavigateCategory('Women')}
              className="px-4 py-2.5 bg-[#0047FF] hover:bg-[#2A66FF] text-white font-mono-tech text-[11px] font-bold uppercase transition-all cursor-pointer shadow-[2px_2px_0px_0px_#CCFF00]"
            >
              WOMEN ARCHIVE
            </button>
          </div>
        </div>
      </section>

      {/* 2. Lookbook Editorial Feeds */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {looks.map((look, index) => (
          <article
            key={look.id}
            className="w-full bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] overflow-hidden shadow-[4px_4px_0px_0px_#0047FF]"
          >
            {/* Grid Layout: Visual on Left, Tagged Garments on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Hero Image */}
              <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] lg:h-[620px] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden group">
                <img
                  src={look.heroImage}
                  alt={look.title}
                  className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[10px] font-extrabold uppercase tracking-widest shadow-[2px_2px_0px_0px_#000]">
                    SHOT 0{index + 1}
                  </span>
                  {look.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono-tech text-[10px] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Overlay Location Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 dark:bg-[#090A0E]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-[#2C3142]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-widest block font-bold">
                        LOCATION PROVENANCE
                      </span>
                      <p className="font-space text-[12px] sm:text-[13px] text-[#090A0E] dark:text-white font-bold uppercase">
                        {look.location}
                      </p>
                    </div>
                    <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#94A3B8] hidden sm:block">
                      {look.modelSpecs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Merchandising Sidebar */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-[#13151D]">
                <div>
                  <span className="font-mono-tech text-[11px] text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-[0.2em] font-bold block mb-1">
                    EDITORIAL CURATION
                  </span>
                  <h2 className="font-syne font-extrabold text-[24px] sm:text-[28px] uppercase text-[#090A0E] dark:text-white tracking-tight leading-tight mb-3">
                    {look.title}
                  </h2>
                  <p className="font-dm text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                    {look.subtitle}
                  </p>

                  <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-6 mb-6">
                    <h3 className="font-mono-tech text-[10px] uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8] font-bold mb-4 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0047FF] dark:text-[#CCFF00]" />
                      FEATURED GARMENTS IN THIS LOOK ({look.featuredProducts.length})
                    </h3>

                    {/* Stack of Featured Products */}
                    <div className="space-y-3">
                      {look.featuredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => onSelectProduct(prod)}
                          className="flex items-center gap-3 p-2.5 bg-[#ECEEF2] dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all cursor-pointer group/card"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-14 h-16 object-cover bg-white dark:bg-[#1B1E2B] flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-mono-tech text-[9px] text-[#0047FF] uppercase font-bold">
                                {prod.category}
                              </span>
                              <span className="font-mono-tech text-[9px] text-[#0047FF] dark:text-[#CCFF00] uppercase">
                                {prod.gsm} GSM
                              </span>
                            </div>
                            <h4 className="font-space font-bold text-[13px] text-[#090A0E] dark:text-white truncate group-hover/card:text-[#0047FF] dark:group-hover/card:text-[#CCFF00] transition-colors uppercase">
                              {prod.title}
                            </h4>
                            <p className="font-mono-tech text-[12px] font-bold text-[#090A0E] dark:text-white">
                              ৳{prod.priceBDT.toLocaleString()}
                              <span className="text-[#64748B] dark:text-[#94A3B8] text-[10px] ml-1.5 font-normal">
                                (${prod.priceUSD})
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`View ${prod.title}`}
                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#1B1E2B] text-[#090A0E] dark:text-white group-hover/card:bg-[#CCFF00] group-hover/card:text-[#090A0E] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lead Piece Action */}
                <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#2C3142]">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(look.featuredProducts[0])}
                    className="w-full py-3.5 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0047FF]"
                  >
                    <span>INSPECT LEAD PIECE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
