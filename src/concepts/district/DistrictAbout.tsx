import React from 'react'
import { Anchor, MapPin, Zap, Globe } from 'lucide-react'

interface DistrictAboutProps {
  onExploreDrops: () => void
}

export const DistrictAbout: React.FC<DistrictAboutProps> = ({ onExploreDrops }) => {
  return (
    <div className="w-full min-h-screen bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white pb-28 animate-fadeIn transition-colors duration-200">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-white dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_#0047FF]">
            <Anchor className="w-3.5 h-3.5" />
            <span>PORT CITY PROVENANCE // EST. CHATTOGRAM</span>
          </div>

          <h1 className="font-syne font-extrabold text-[34px] sm:text-[48px] lg:text-[56px] text-[#090A0E] dark:text-white uppercase leading-[1.08] tracking-tight mb-6">
            DISTRICT CHATTOGRAM: PORT CITY UNDERGROUND MEETS GLOBAL STREETWEAR
          </h1>

          <p className="font-dm text-[15px] sm:text-[17px] text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed mb-8">
            Born along the steel container terminals and monsoon shipyards of the Bay of Bengal, Blu Eyes District channels the unapologetic industrial energy of Chattogram into heavyweight streetwear.
          </p>

          <button
            type="button"
            onClick={onExploreDrops}
            className="px-8 py-4 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0047FF]"
          >
            EXPLORE CURRENT DROPS
          </button>
        </div>
      </section>

      {/* 2. Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-[#E2E8F0] dark:border-[#2C3142]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] uppercase tracking-widest">
              THE MANIFESTO
            </span>
            <h2 className="font-syne font-extrabold text-[28px] sm:text-[36px] uppercase text-[#090A0E] dark:text-white leading-tight">
              Raw Heavyweight Textiles Engineered for Speed
            </h2>
            <p className="font-dm text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              While high-fashion looks backwards, District looks at the raw machinery of our port city. Chattogram is Bangladesh’s commercial beating heart—handling 90% of the nation’s maritime commerce.
            </p>
            <p className="font-dm text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              We engineer our garments using dense 480 GSM French Terry fleeces, 14oz rigid Japanese Kurabo-spec denims, and military Cordura nylons. Every stitch is reinforced with triple-needle bar tacks, built to endure urban pavement, skate parks, and midnight raves.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 font-mono-tech text-[11px]">
              <div className="p-3 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142]">
                <span className="text-[#0047FF] dark:text-[#CCFF00] text-[20px] font-extrabold block">480</span>
                <span className="text-[#64748B] dark:text-[#8E95A5] uppercase">GSM DENSITY</span>
              </div>
              <div className="p-3 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142]">
                <span className="text-[#0047FF] text-[20px] font-extrabold block">64</span>
                <span className="text-[#64748B] dark:text-[#8E95A5] uppercase">DISTRICT DISPATCH</span>
              </div>
              <div className="p-3 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142]">
                <span className="text-[#090A0E] dark:text-white text-[20px] font-extrabold block">3–5D</span>
                <span className="text-[#64748B] dark:text-[#8E95A5] uppercase">GLOBAL DHL</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] overflow-hidden shadow-[4px_4px_0px_0px_#0047FF] dark:shadow-[4px_4px_0px_0px_#CCFF00]">
            <img
              src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80"
              alt="District Culture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono-tech text-[10px] text-white">
              <span>PHOTO: INDUSTRIAL PORT BERTH 04 // CHATTOGRAM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Physical Labs & Supply Chain */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-widest">
            LOGISTICS INFRASTRUCTURE
          </span>
          <h3 className="font-syne font-extrabold text-[28px] sm:text-[34px] uppercase text-[#090A0E] dark:text-white mt-1">
            DOMESTIC & GLOBAL NETWORK
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hub 1: Chattogram */}
          <div className="p-6 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] shadow-[3px_3px_0px_0px_#0047FF] dark:shadow-[3px_3px_0px_0px_#CCFF00] flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 text-[#0047FF] dark:text-[#CCFF00] mb-3">
                <MapPin className="w-5 h-5" />
                <span className="font-mono-tech font-bold text-[12px] uppercase">
                  FLAGSHIP LAB // CHATTOGRAM
                </span>
              </div>
              <h4 className="font-syne font-extrabold text-[18px] text-[#090A0E] dark:text-white uppercase mb-2">
                Agrabad & GEC Circle
              </h4>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed">
                Our main design lab and central fulfillment warehouse. Orders dispatched across Chattogram metro arrive within 24 hours.
              </p>
            </div>
            <span className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] font-bold mt-4">
              SAME-DAY EXPRESS HUB
            </span>
          </div>

          {/* Hub 2: Dhaka */}
          <div className="p-6 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] shadow-[3px_3px_0px_0px_#0047FF] flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 text-[#0047FF] mb-3">
                <Zap className="w-5 h-5" />
                <span className="font-mono-tech font-bold text-[12px] uppercase">
                  LIAISON HUB // DHAKA
                </span>
              </div>
              <h4 className="font-syne font-extrabold text-[18px] text-[#090A0E] dark:text-white uppercase mb-2">
                Road 11, Banani
              </h4>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed">
                Capital connection hub handling rapid 48-hour delivery across all Dhaka subdivisions and regional distribution hubs.
              </p>
            </div>
            <span className="font-mono-tech text-[10px] text-[#0047FF] font-bold mt-4">
              48H EXPRESS TRANSIT
            </span>
          </div>

          {/* Hub 3: Worldwide DHL */}
          <div className="p-6 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] shadow-[3px_3px_0px_0px_#090A0E] dark:shadow-[3px_3px_0px_0px_#FFFFFF] flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 text-[#090A0E] dark:text-white mb-3">
                <Globe className="w-5 h-5" />
                <span className="font-mono-tech font-bold text-[12px] uppercase">
                  WORLDWIDE DHL EXPRESS
                </span>
              </div>
              <h4 className="font-syne font-extrabold text-[18px] text-[#090A0E] dark:text-white uppercase mb-2">
                UK, USA, UAE & Global
              </h4>
              <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] leading-relaxed">
                Direct export shipments depart via Shah Amanat International Airport. Duty-paid, tracked door-to-door delivery in 3–5 business days.
              </p>
            </div>
            <span className="font-mono-tech text-[10px] text-[#090A0E] dark:text-white font-bold mt-4">
              FLAT $25 // FREE OVER $250
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
